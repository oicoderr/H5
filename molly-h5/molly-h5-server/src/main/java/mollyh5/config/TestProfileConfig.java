package mollyh5.config;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile({"default", "test"})
public class TestProfileConfig implements ProfileConfig {

    @Override
    public int getEnv() {
        return ProfileConfig.ENV_TEST;
    }

    @Override
    public String getAppId() {
        return "wxdd2337ea274c210e";
    }

    @Override
    public String getAppSecret() {
        return "d878f1c9f168c9c8ab941611692ddf65";
    }

    @Override
    public String getOssBucket() {
        return "syrup-test";
    }

    @Override
    public String getOssEndpoint() {
        return "oss-cn-beijing.aliyuncs.com";
    }

    @Override
    public String getCdnUrlPrefix() {
        return "http://cdn-test.happysyrup.com/";
    }
}
