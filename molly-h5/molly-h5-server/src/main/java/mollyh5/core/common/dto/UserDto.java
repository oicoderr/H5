package mollyh5.core.common.dto;


public class UserDto {

    private Integer status;
    private Integer djId;
    private Integer submitCount;

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

    public Integer getSubmitCount() {
        return submitCount;
    }

    public void setSubmitCount(Integer submitCount) {
        this.submitCount = submitCount;
    }
}
