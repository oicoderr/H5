package mollyh5.core.wx;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface WxInterface {


    @GET("cgi-bin/token")
    Call<Token> token(@Query("grant_type") String grantType,
                      @Query("appid") String appId,
                      @Query("secret") String appSecret);

    @GET("cgi-bin/ticket/getticket")
    Call<Ticket> ticket(@Query("access_token") String accessToken,
                        @Query("type") String type);

    @GET("/sns/oauth2/access_token")
    Call<AuthorizeInfo> login(@Query("appid") String appId,
                              @Query("secret") String appSecret,
                              @Query("code") String code,
                              @Query("grant_type") String grantType);

    @GET("/sns/userinfo")
    Call<UserInfo> getUserInfo(@Query("access_token") String accessToken,
                               @Query("openid") String openId,
                               @Query("lang") String lang);

}
