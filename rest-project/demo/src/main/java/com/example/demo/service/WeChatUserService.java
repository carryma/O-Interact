package com.example.demo.service;

import com.example.demo.entity.WeChatUser;

import java.util.List;

/**
 * WeChat User Service Interface
 *
 * @author Ma Kang
 * @create 2018-04-02 0:47
 **/

public interface WeChatUserService {
    int insertWeChatUser(WeChatUser weChatUser);
    String findWeChatUserId(String weChatOpenId);
    WeChatUser findWechatUserByOpenId(String weChatOpenId);
    List<WeChatUser> findAllInfo();
}
