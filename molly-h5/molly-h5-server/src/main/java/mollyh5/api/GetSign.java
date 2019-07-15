package mollyh5.api;

import com.google.common.base.MoreObjects;
import mollyh5.api.common.ApiResult;
import mollyh5.core.common.dto.SignDto;
import mollyh5.core.wx.SignData;
import mollyh5.core.wx.WxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

/**
 * @Auther: Administrator
 * @Date: 2018/9/28 19:15
 * @Description: 获取签名
 */

@RestController
@CrossOrigin
public class GetSign {

    @Autowired
    private WxService wxService;

    @PostMapping("/get-sign")
    public ApiResult process(@Validated @RequestBody Request request) {
        SignData data = wxService.getSignData(request.getUrl());

        SignDto signDto = new SignDto();
        signDto.setNonce(data.getNoncestr());
        signDto.setTimestamp(data.getTimestamp());
        signDto.setSign(data.getSignature());
        return ApiResult.okWithData(data);
    }

    private static class Request {
        @NotBlank
        private String url;

        @Override
        public String toString() {
            return MoreObjects.toStringHelper(this)
                    .add("url", url)
                    .toString();
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
