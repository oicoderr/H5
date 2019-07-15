package mollyh5.api.mollycelllab.dto;

import com.google.common.base.MoreObjects;

/**
 * @Auther: Administrator
 * @Date: 2018/9/29 18:02
 * @Description:
 */
public class AnswerDto {

    private Integer status;
    private Integer djType;
    private AnswerPublicDto answerPublicDto;
    private String recommendDj;
    private String coverImage;
    private String randomTitleImage;
    private String shareResultUrl;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("status", status)
                .add("djType", djType)
                .add("answerPublicDto", answerPublicDto)
                .add("recommendDj", recommendDj)
                .add("coverImage", coverImage)
                .add("randomTitleImage", randomTitleImage)
                .add("shareResultUrl", shareResultUrl)
                .toString();
    }

    public String getShareResultUrl() {
        return shareResultUrl;
    }

    public void setShareResultUrl(String shareResultUrl) {
        this.shareResultUrl = shareResultUrl;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getDjType() {
        return djType;
    }

    public void setDjType(Integer djType) {
        this.djType = djType;
    }

    public AnswerPublicDto getAnswerPublicDto() {
        return answerPublicDto;
    }

    public void setAnswerPublicDto(AnswerPublicDto answerPublicDto) {
        this.answerPublicDto = answerPublicDto;
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

    public String getRandomTitleImage() {
        return randomTitleImage;
    }

    public void setRandomTitleImage(String randomTitleImage) {
        this.randomTitleImage = randomTitleImage;
    }
}