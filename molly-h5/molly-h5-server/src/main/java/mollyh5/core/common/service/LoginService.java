package mollyh5.core.common.service;

import mollyh5.api.common.MessageException;
import mollyh5.core.icon.service.IconService;
import mollyh5.core.mollycelllab.dao.UserDao;
import mollyh5.core.mollycelllab.po.User;
import mollyh5.core.wx.AuthorizeInfo;
import mollyh5.core.wx.UserInfo;
import mollyh5.core.wx.WxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Auther: Administrator
 * @Date: 2018/9/28 20:17
 * @Description:
 */
@Service
public class LoginService {

    @Autowired
    private WxService wxService;

    @Autowired
    private UserDao statusDao;

    @Autowired
    private IconService iconService;

    public UserInfo getUserInfo(String code) throws MessageException {
        AuthorizeInfo authorizeInfo = login(code);
        UserInfo userInfo = wxService.getUserInfo(authorizeInfo.getAccess_token(), authorizeInfo.getOpenid());
        if (userInfo == null) {
            throw new MessageException("用户信息获取失败!");
        }

        iconService.downloadUserIcon(userInfo.getOpenid(), userInfo.getHeadimgurl());
        userInfo.setUserIcon(iconService.getUserIcon(userInfo.getOpenid()));
        return userInfo;
    }

    private AuthorizeInfo login(String code) throws MessageException {
        AuthorizeInfo authorizeInfo = wxService.login(code);

        if (authorizeInfo == null) {
            throw new MessageException("authorizeInfo is null");
        }

        if (statusDao.exists(authorizeInfo.getOpenid())) {
            return authorizeInfo;
        } else {
            User status = new User();
            status.setOpenId(authorizeInfo.getOpenid());
            status.setStatus(0);
            statusDao.insert(status);
        }

        return authorizeInfo;
    }

}