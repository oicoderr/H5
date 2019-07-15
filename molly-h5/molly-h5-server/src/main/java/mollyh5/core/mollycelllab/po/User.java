package mollyh5.core.mollycelllab.po;

import java.time.LocalDateTime;

public class User {
    private String openId;
    private Integer status; // 未提交 0，已提交 1
    private Integer djId;
    private Integer submitCount;
    private LocalDateTime updatedAt;

    public Integer getSubmitCount() {
        return submitCount;
    }

    public void setSubmitCount(Integer submitCount) {
        this.submitCount = submitCount;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }


    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getDjId() {
        return djId;
    }

    public void setDjId(Integer djId) {
        this.djId = djId;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
