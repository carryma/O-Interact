package com.example.demo.controller;

import com.example.demo.entity.WeChatUser;
import com.example.demo.service.WeChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 根据openid发送get请求，获取对应数据库中的记录，以json格式发送
 *
 * @author Ma Kang
 * @create 2018-04-10 16:19
 **/
@RestController
@RequestMapping("/userinfo")
public class WeChatUserInfoController {

    @Autowired
    private WeChatUserService weChatUserService;
    @CrossOrigin
    @RequestMapping("/{id}")
    public WeChatUser getUserById(@PathVariable String id) {
        WeChatUser userinfo = new WeChatUser();
        try {
            userinfo = weChatUserService.findWechatUserByOpenId(id);
        } catch (Exception e) {
           // userinfo = new userinfo("admin", "admin@sina.com");
            System.out.println("异常信息： " + e.getMessage());
        }
        return userinfo;
    }
    @CrossOrigin
    @GetMapping("/all")
    public List<WeChatUser> getAll(){
        List<WeChatUser> allinfo = new ArrayList<WeChatUser>();
        try{
            allinfo = weChatUserService.findAllInfo();
        }catch(Exception e){

        }
        return allinfo;
    }
}
