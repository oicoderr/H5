package mollyh5.core.icon.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.BufferedSink;
import okio.BufferedSource;
import okio.Okio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class IconService {
    private static final String ICON_PATH = "/kt/dat/molly-h5/icon";
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Async
    public void downloadUserIcon(String openid, String headimgurl) {
        String target = String.format("%s/%s.jpg", ICON_PATH, openid);

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(headimgurl).build();
        try {
            Response response = client.newCall(request).execute();
            if (!response.isSuccessful()) {
                logger.warn("download icon failed: openId={}, icon={}", openid, headimgurl);

                return;
            }

            ResponseBody body = response.body();
            if (body == null) {
                logger.warn("download icon failed, body is null: openId={}, icon={}", openid, headimgurl);

                return;
            }
            BufferedSource source = body.source();
            File file = new File(target);
            BufferedSink sink = Okio.buffer(Okio.sink(file));
            sink.writeAll(source);
            sink.flush();
        } catch (IOException e) {
            logger.warn("IOException. ", e);
        }
    }

    public String getUserIcon(String openid) {
        return String.format("/icon/%s.jpg", openid);
    }
}
