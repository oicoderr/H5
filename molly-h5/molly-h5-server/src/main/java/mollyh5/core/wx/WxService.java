package mollyh5.core.wx;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.google.common.base.Joiner;
import mollyh5.api.common.HashUtils;
import mollyh5.config.ProfileConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import mollyh5.api.common.TimeHelper;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.jackson.JacksonConverterFactory;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.TreeMap;

@Service
public class WxService {
    private static final String GRANT_TYPE = "authorization_code";
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private WxInterface wxInterface;

    private String accessToken;
    private LocalDateTime tokenExpire;

    private String jsapiTicket;
    private LocalDateTime ticketExpire;

    @Autowired
    private ProfileConfig profileConfig;

    @PostConstruct
    public void init() {
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.weixin.qq.com/")
                .addConverterFactory(JacksonConverterFactory.create(objectMapper))
                .build();

        this.wxInterface = retrofit.create(WxInterface.class);
    }

    //获取签名数据
    public SignData getSignData(String url) {
        SignData data = new SignData();
        data.setNoncestr(RandomStringUtils.randomAlphabetic(16));
        data.setTimestamp(String.valueOf(TimeHelper.getTimeStamp()));
        data.setSignature(sign(data.getNoncestr(), data.getTimestamp(), url));
        return data;
    }

    //sign
    private String sign(String noncestr, String timestamp, String url) {
        TreeMap<String, String> map = Maps.newTreeMap();
        map.put("noncestr", noncestr);
        map.put("jsapi_ticket", ticket());
        logger.info("jsapi_ticket is ticket={}", ticket());
        map.put("timestamp", timestamp);
        map.put("url", url);
        String str = Joiner.on("&").join(map.entrySet());
        logger.warn("str={}", str);
        return HashUtils.getSha1(str);
    }

    private synchronized String ticket() {
        if (!Strings.isNullOrEmpty(jsapiTicket) && LocalDateTime.now().isBefore(ticketExpire)) {
            return jsapiTicket;
        }

        Call<Ticket> call = wxInterface.ticket(token(), "jsapi");

        Ticket ticket = result(call, "ticket");

        if (ticket == null) {
            logger.warn("token=null");

            return null;
        }

        if (ticket.getErrcode() != null && ticket.getErrcode() != 0) {
            logger.warn("errcode={}, errmsg={}", ticket.getErrcode(), ticket.getErrmsg());

            return null;
        }

        logger.info("jsapi_ticket is ok,ticket={}", ticket);

        jsapiTicket = ticket.getTicket();
        ticketExpire = LocalDateTime.now().plusSeconds(ticket.getExpires_in());

        return jsapiTicket;
    }

    //全局的access-token
    private synchronized String token() {
        if (!Strings.isNullOrEmpty(accessToken) && LocalDateTime.now().isBefore(tokenExpire)) {
            return accessToken;
        }

        Call<Token> call = wxInterface.token("client_credential",
                profileConfig.getAppId(),
                profileConfig.getAppSecret());

        Token token = result(call, "token");

        if (token == null) {
            logger.warn("token=null");

            return null;
        }

        if (token.getErrcode() != null && token.getErrcode() != 0) {
            logger.warn("errcode={}, errmsg={}", token.getErrcode(), token.getErrmsg());

            return null;
        }

        logger.info("token is ok,token={}", token);

        accessToken = token.getAccessToken();
        tokenExpire = LocalDateTime.now().plusSeconds(token.getExpiresIn());

        return accessToken;
    }

    //页面授权的信息，包含页面授权的access-token，openId
    public synchronized AuthorizeInfo login(String code) {

        Call<AuthorizeInfo> call = wxInterface.login(
                profileConfig.getAppId(),
                profileConfig.getAppSecret(),
                code,
                GRANT_TYPE
        );

        AuthorizeInfo authorizeInfo = result(call, "authorizeInfo");

        if (authorizeInfo == null) {
            logger.warn("authorizeInfo={}", authorizeInfo);

            return null;
        }

        if (authorizeInfo.getErrcode() != null && authorizeInfo.getErrcode() != 0) {
            logger.warn("errcode={}, errmsg={}", authorizeInfo.getErrcode(), authorizeInfo.getErrmsg());

            return null;
        }

        logger.info("authorizeInfo is ok,authorizeInfo={}", authorizeInfo);

        return authorizeInfo;
    }

    public synchronized UserInfo getUserInfo(String accessToken, String openId) {

        Call<UserInfo> call = wxInterface.getUserInfo(
                accessToken,
                openId,
                "zh_CN"
        );

        UserInfo userInfo = result(call, "getUserInfo");

        if (userInfo == null) {
            logger.warn("userInfo=null");

            return null;
        }

        if (userInfo.getErrcode() != null && userInfo.getErrcode() != 0) {
            logger.warn("errcode={}, errmsg={}", userInfo.getErrcode(), userInfo.getErrmsg());

            return null;
        }

        logger.info("userInfo is ok,userInfo={}", userInfo);

        return userInfo;
    }

    //结果检查
    private <T> T result(Call<T> call, String func) {
        try {
            final Response<T> response = call.execute();
            if (response.isSuccessful()) {
                logger.warn("{}, code={}, message={}", func, response.code(), response.message());
                return response.body();
            } else {
                logger.warn("{}, code={}, message={}", func, response.code(), response.message());

                return null;
            }
        } catch (IOException e) {
            logger.warn("{}, IOException, message={}", func, e.getMessage());

            return null;
        }
    }

}

