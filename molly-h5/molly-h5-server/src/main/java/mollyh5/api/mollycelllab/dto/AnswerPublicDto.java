package mollyh5.api.mollycelllab.dto;

import com.google.common.base.MoreObjects;

/**
 * @Auther: Administrator
 * @Date: 2018/10/15 18:22
 * @Description:
 */
public class AnswerPublicDto {

    private String titleImage;
    private String txtImage;
    private String bgImage;
    private String bigBgImage;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("titleImage", titleImage)
                .add("txtImage", txtImage)
                .add("bgImage", bgImage)
                .add("bigBgImage", bigBgImage)
                .toString();
    }

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
}