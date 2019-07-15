package mollyh5.core.wx;

import com.google.common.base.MoreObjects;

public class Result {
    private Integer errcode;
    private String errmsg;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("errcode", errcode)
                .add("errmsg", errmsg)
                .toString();
    }

    public Integer getErrcode() {
        return errcode;
    }

    public void setErrcode(Integer errcode) {
        this.errcode = errcode;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }
}
