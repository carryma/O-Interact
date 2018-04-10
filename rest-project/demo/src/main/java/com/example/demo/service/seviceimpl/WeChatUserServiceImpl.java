package com.example.demo.service.seviceimpl;

import com.example.demo.dao.WeChatUserDao;
import com.example.demo.entity.WeChatUser;
import com.example.demo.service.WeChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * WeChat User Service Implement 业务逻辑层
 *
 * @author Ma Kang
 * @create 2018-04-02 0:49
 **/

@Service
public class WeChatUserServiceImpl implements WeChatUserService {

    @Autowired
    WeChatUserDao weChatUserDao;

    @Override
    public int insertWeChatUser(WeChatUser weChatUser) {
        return weChatUserDao.insertWeChatUser(weChatUser);
    }

    @Override
    public String findWeChatUserId(String weChatOpenId) {
        return weChatUserDao.findWeChatUserId(weChatOpenId);
    }
}
