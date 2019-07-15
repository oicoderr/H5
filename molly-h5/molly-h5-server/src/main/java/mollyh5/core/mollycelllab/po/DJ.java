package mollyh5.core.mollycelllab.po;

/**
 * @Auther: Administrator
 * @Date: 2018/9/29 18:05
 * @Description:
 */
public class DJ {
    private Integer djId;
    private Integer djType;
    private String recommendDj;
    private String coverImage;
    //新增字段
    private String titleImage;
    private String txtImage;
    private String bgImage;
    private String bigBgImage;

    public String getTitleImage() {
        return titleImage;
    }

    public void setTitleImage(String titleImage) {
        this.titleImage = titleImage;
    }

    public String getTxtImage() {
        return txtImage;
    }

    public void setTxtImage(String txtImage) {
        this.txtImage = txtImage;
    }

    public String getBgImage() {
        return bgImage;
    }

    public void setBgImage(String bgImage) {
        this.bgImage = bgImage;
    }

    public String getBigBgImage() {
        return bigBgImage;
    }

    public void setBigBgImage(String bigBgImage) {
        this.bigBgImage = bigBgImage;
    }

    public Integer getDjId() {
        return djId;
    }

    public void setDjId(Integer djId) {
        this.djId = djId;
    }

    public Integer getDjType() {
        return djType;
    }

    public void setDjType(Integer djType) {
        this.djType = djType;
    }

    public String getRecommendDj() {
        return recommendDj;
    }

    public void setRecommendDj(String recommendDj) {
        this.recommendDj = recommendDj;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }
}