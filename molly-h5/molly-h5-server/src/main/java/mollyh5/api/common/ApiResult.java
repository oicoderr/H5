package mollyh5.api.common;

import com.google.common.base.MoreObjects;
import com.google.common.collect.Maps;

import java.util.Map;

public class ApiResult {
    public static final String CODE_ERROR_WITH_MESSAGE = "ERROR_WITH_MESSAGE";
    public static final ApiResult OK = new ApiResult();

    private String code = "OK";
    private String message;
    private Object data;

    private ApiResult() {
    }

    private ApiResult(String code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static ApiResult okWithMessage(String message) {
        ApiResult result = new ApiResult();
        result.setMessage(message);

        return result;
    }

    public static ApiResult okWithData(Object data) {
        ApiResult result = new ApiResult();
        result.setData(data);

        return result;
    }

    public static ApiResult okWithData(String key, Object value) {
        Map<String, Object> data = Maps.newHashMapWithExpectedSize(1);
        data.put(key, value);

        return okWithData(data);
    }

    public static ApiResult okWithMessageAndData(String message, Object data) {
        ApiResult result = new ApiResult();
        result.setMessage(message);
        result.setData(data);

        return result;
    }

    public static ApiResult error(String code, String message) {
        return new ApiResult(code, message, null);
    }

    public static ApiResult error(String code, String message, Object data) {
        return new ApiResult(code, message, data);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("code", code)
                .add("message", message)
                .add("data", data)
                .toString();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
