package mollyh5.core.wx;

import com.google.common.base.MoreObjects;

/**
 * @Auther: Administrator
 * @Date: 2018/9/28 16:28
 * @Description:
 */
public class Ticket extends Result {
    private String ticket;
    private Long expires_in;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("ticket", ticket)
                .add("expires_in", expires_in)
                .toString();
    }

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public Long getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(Long expires_in) {
        this.expires_in = expires_in;
    }
}