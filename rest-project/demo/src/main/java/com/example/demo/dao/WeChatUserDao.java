package com.example.demo.dao;

import com.example.demo.entity.WeChatUser;


/**
 * WeChat User Dao
 *
 * @author Ma Kang
 * @create 2018-04-02 0:09
 **/
public interface WeChatUserDao {
    int insertWeChatUser(WeChatUser weChatUser);
    String findWeChatUserId (String weChatOpenId);
    WeChatUser findWechatUserByOpenId(String weChatOpenId);
}
