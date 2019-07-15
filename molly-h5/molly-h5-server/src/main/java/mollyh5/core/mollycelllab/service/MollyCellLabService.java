package mollyh5.core.mollycelllab.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import mollyh5.api.common.MessageException;
import mollyh5.core.common.dto.UserDto;
import mollyh5.core.mollycelllab.dao.UserDao;
import mollyh5.core.mollycelllab.po.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MollyCellLabService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserDao userDao;

    //提答案信息
    public Integer submitAnswerInfo(List<Integer> typeIds, String openId) throws MessageException {

        if (!userDao.exists(openId)) {
            logger.info("openId not found");
            throw new MessageException("此用户不存在！");
        }

        Integer typeId = getTypeId(typeIds);
        UserDto userDto = userDao.getUserDto(openId);
        //记录提交的信息,并统计
        User user = new User();
        user.setDjId(typeId);
        user.setOpenId(openId);
        user.setStatus(1);
        user.setSubmitCount(userDto.getSubmitCount() + 1);
        userDao.update(user);
        return typeId;
    }

    //推荐的用户类型id
    public Integer getTypeId(List<Integer> typeIds) {
        HashMap<Integer, Integer> mapKeyCount = Maps.newHashMap();
        for (Integer typeId1 : typeIds) {
            int count = 0;
            for (Integer typeId2 : typeIds) {
                if (typeId1.equals(typeId2)) {
                    count++;
                }
            }
            mapKeyCount.put(typeId1, count);
            if (count > 2) {
                return typeId1;
            }
        }


        List<Integer> list = Lists.newArrayList();
        Set<Integer> set = mapKeyCount.keySet();
        for (Integer typeId : set) {
            Integer count = mapKeyCount.get(typeId);
            if (count == 2) {
                list.add(typeId);
            }
        }

        if (list.size() == 2) {
            Long round = Math.round(Math.random() * (2 - 1) + 1);
            return list.get(round.intValue() - 1);
        } else {
            return list.get(0);
        }
    }

}
