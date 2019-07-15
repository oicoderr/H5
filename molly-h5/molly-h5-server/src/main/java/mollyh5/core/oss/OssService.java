package mollyh5.core.oss;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.google.common.base.Strings;
import mollyh5.api.common.UuidHelper;
import mollyh5.config.ProfileConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.util.Base64;

@Service
public class OssService {
    private static final String ACCESS_KEY_ID = "LTAIyMnw7vp7mkt0";
    private static final String ACCESS_KEY_SECRET = "uvtpM0tYbnCPD4Pn9rcplnkUX1H3vh";

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private OSS oss;

    @Autowired
    private ProfileConfig profileConfig;

    @PostConstruct
    public void init() {
        oss = new OSSClientBuilder().build(profileConfig.getOssEndpoint(), ACCESS_KEY_ID, ACCESS_KEY_SECRET);
    }

    public FileDto saveToOss(String base64String, String fileType) {
        if (Strings.isNullOrEmpty(base64String) || Strings.isNullOrEmpty(fileType)) {
            logger.info("base64String is null");
            return null;
        }

        byte[] bytes = Base64.getDecoder().decode(base64String);

        if (bytes == null || bytes.length <= 0) {
            logger.info("bytes is null");
            return null;
        }

        String key = String.format("h5/molly-h5/%s.%s", UuidHelper.gen(), fileType.toLowerCase());

        ByteArrayInputStream bais = new ByteArrayInputStream(bytes);

        oss.putObject(profileConfig.getOssBucket(), key, bais);

        logger.info("File saved: {}", key);

        FileDto dto = new FileDto();
        dto.setUrl(profileConfig.getCdnUrlPrefix() + key);

        return dto;
    }
}
