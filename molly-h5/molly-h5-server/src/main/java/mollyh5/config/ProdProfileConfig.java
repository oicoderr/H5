package mollyh5.config;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("prod")
public class ProdProfileConfig implements ProfileConfig {

    @Override
    public int getEnv() {
        return ProfileConfig.ENV_PROD;
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
        return "syrup";
    }

    @Override
    public String getOssEndpoint() {
        return "oss-cn-beijing-internal.aliyuncs.com";
    }

    @Override
    public String getCdnUrlPrefix() {
        return "https://cdn.happysyrup.com/";
    }
}
