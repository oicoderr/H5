package mollyh5.core.wx;

import com.google.common.base.MoreObjects;

/**
 * @Auther: Administrator
 * @Date: 2018/9/28 19:55
 * @Description:
 */
public class AuthorizeInfo extends Result{

    private String access_token;
    private String expires_in;
    private String refresh_token;
    private String openid;
    private String scope;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("access_token", access_token)
                .add("expires_in", expires_in)
                .add("refresh_token", refresh_token)
                .add("openid", openid)
                .add("scope", scope)
                .toString();
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(String expires_in) {
        this.expires_in = expires_in;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
}