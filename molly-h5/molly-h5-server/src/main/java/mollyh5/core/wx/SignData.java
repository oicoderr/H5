package mollyh5.core.wx;

import com.google.common.base.MoreObjects;

/**
 * @Auther: Administrator
 * @Date: 2018/9/28 15:22
 * @Description:
 */
public class SignData {
    private String signature;
    private String noncestr;
    private String timestamp;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("signature", signature)
                .add("noncestr", noncestr)
                .add("timestamp", timestamp)
                .toString();
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getNoncestr() {
        return noncestr;
    }

    public void setNoncestr(String noncestr) {
        this.noncestr = noncestr;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}