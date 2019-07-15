package mollyh5.core.wx;

import com.google.common.base.MoreObjects;

public class Token extends Result {
    private String accessToken;
    private Long expiresIn;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("accessToken", accessToken)
                .add("expiresIn", expiresIn)
                .add("super", super.toString())
                .toString();
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
}
