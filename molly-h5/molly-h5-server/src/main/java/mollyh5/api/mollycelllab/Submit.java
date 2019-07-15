package mollyh5.api.mollycelllab;

import com.google.common.base.MoreObjects;
import com.google.common.collect.Lists;
import mollyh5.api.common.ApiResult;
import mollyh5.api.common.MessageException;
import mollyh5.core.mollycelllab.service.MollyCellLabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.constraints.*;
import java.util.List;

@RestController
public class Submit {

    @Autowired
    private MollyCellLabService mollyCellLabService;

    @PostMapping("/molly-cell-lab/submit")
    public ApiResult process(@Validated @RequestBody Submit.Request request) {
        //提交数据校验
        List<Integer> typeIds = request.getTypeIds();
        List<Integer> list = Lists.newArrayListWithExpectedSize(4);
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);

        for (Integer typeId : typeIds) {
            if (!list.contains(typeId)) {
                return ApiResult.error(ApiResult.CODE_ERROR_WITH_MESSAGE, "typeIds 必须在[0-4]之间");
            }
        }

        try {
            return ApiResult.okWithData("recommendTypeId", mollyCellLabService.submitAnswerInfo(typeIds, request.getOpenId()));
        } catch (MessageException e) {
            return ApiResult.error(ApiResult.CODE_ERROR_WITH_MESSAGE, e.getMessage());
        }

    }

    private static class Request {

        @NotEmpty
        @Size(min = 5, max = 5)
        private List<Integer> typeIds;
        @NotBlank
        private String openId;

        @Override
        public String toString() {
            return MoreObjects.toStringHelper(this)
                    .add("typeIds", typeIds)
                    .add("openId", openId)
                    .toString();
        }

        public List<Integer> getTypeIds() {
            return typeIds;
        }

        public void setTypeIds(List<Integer> typeIds) {
            this.typeIds = typeIds;
        }

        public String getOpenId() {
            return openId;
        }

        public void setOpenId(String openId) {
            this.openId = openId;
        }
    }

}
