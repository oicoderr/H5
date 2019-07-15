package mollyh5.api;

import com.google.common.base.MoreObjects;
import com.google.common.base.Strings;
import mollyh5.api.common.ApiResult;
import mollyh5.api.common.MessageException;
import mollyh5.core.common.service.LoginService;
import mollyh5.core.wx.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;
import java.text.Format;

/**
 * @Auther: Administrator
 * @Date: 2018/9/28 19:15
 * @Description: 登录 返回用户信息和openId
 */
@RestController
public class Login {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ApiResult process(@Validated @RequestBody Login.Request request) {

        try {
            UserInfo userInfo = loginService.getUserInfo(request.getCode());
            return ApiResult.okWithData(userInfo);
        } catch (MessageException e) {
            return ApiResult.error(ApiResult.CODE_ERROR_WITH_MESSAGE, e.getMessage());
        }

    }

    private static class Request {
        @NotBlank
        private String code;

        @Override
        public String toString() {
            return MoreObjects.toStringHelper(this)
                    .add("code", code)
                    .toString();
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }
}