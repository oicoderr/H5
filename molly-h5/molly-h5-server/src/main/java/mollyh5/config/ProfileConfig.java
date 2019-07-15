package mollyh5.config;

public interface ProfileConfig {
    int ENV_TEST = 1;
    int ENV_PROD = 2;

    int getEnv();

    String getAppId();
    String getAppSecret();
    String getOssBucket();
    String getOssEndpoint();
    String getCdnUrlPrefix();
}
