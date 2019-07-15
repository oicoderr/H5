package mollyh5.api.common;

/**
 * @Auther: Administrator
 * @Date: 2018/9/30 15:05
 * @Description:
 */
public class FileUtils {
    private static final String CdnUrlPrefix = "http://cdn.happysyrup.com/";

    public static String getFullPath(String fileKey) {
        return CdnUrlPrefix + fileKey;
    }
}
