package mollyh5.api;

import com.google.common.base.MoreObjects;
import mollyh5.api.common.ApiResult;
import mollyh5.core.oss.OssService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

/*
echo '{"base64String":"/9j/4AAQSkZJRgABAQABLAEsAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAAEsAAAAAQAAASwAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAygAwAEAAAAAQAAAAgAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAAgADAMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/3QAEAAL/2gAMAwEAAhEDEQA/AMw3cFwWsb5Xt5ZEMzNOwALMSoKgnqQMDjA6Z4NcVKm6NotlvA/7HKVLWSeyWtvXb+kebav4Zkkvn2H7Kq/KI2tXl49QR29q67W0PPjVUVaa1/ryP//Z","fileType":"jpg"}' | http -v POST :5305/save-base64-image
 */
@RestController
public class SaveBase64Image {

    @Autowired
    private OssService ossService;

    @PostMapping("/save-base64-image")
    public ApiResult process(@Validated @RequestBody Request request) {
        return ApiResult.okWithData(ossService.saveToOss(request.getBase64String(), request.getFileType()));
    }

    private static class Request {

        @NotBlank
        private String base64String;

        @NotBlank
        private String fileType;

        @Override
        public String toString() {
            return MoreObjects.toStringHelper(this)
                    .add("base64String", base64String.substring(0,100))
                    .add("fileType", fileType)
                    .toString();
        }

        public String getBase64String() {
            return base64String;
        }

        public void setBase64String(String base64String) {
            this.base64String = base64String;
        }

        public String getFileType() {
            return fileType;
        }

        public void setFileType(String fileType) {
            this.fileType = fileType;
        }
    }
}
