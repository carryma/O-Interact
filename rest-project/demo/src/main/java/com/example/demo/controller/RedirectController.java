package com.example.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.WeChatUser;
import com.example.demo.service.WeChatUserService;
import com.example.demo.util.HttpsUtil;
import com.example.demo.util.UserInfoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

/**
 * 用户扫描二维码 同意授权后 要跳转到的URL
 *
 * @author Ma Kang
 * @create 2018-04-01 16:21
 **/
@RestController
@RequestMapping ("/url")
public class RedirectController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    private static final String WX_APPID = "wxe634435c58769578";
    private static final String WX_APPSECRET = "9cbe7b9611a722b87980ca9d8022627f";
    private static ArrayList<String> list = new ArrayList<>();
    private String frontUrl;

    @Autowired
    WeChatUserService weChatUserService;


    /**
     * 微信网页授权流程:
     * 1. 用户同意授权,获取 code
     * 2. 通过 code 换取网页授权 access_token
     * 3. 使用获取到的 access_token 和 openid 拉取用户信息
     *
     * @param code  用户同意授权后,获取到的code
     * @param state 重定向状态参数
     * @return String
     */

    @ModelAttribute
    public void wecahtLogin(@RequestParam(name = "code", required = false) String code,
                            @RequestParam(name = "state") String state, HttpServletRequest req, HttpServletResponse resp) throws Exception {

        // 1. 用户同意授权,获取code
        logger.info("收到微信重定向跳转.");
        logger.info("用户同意授权,获取code:{} , state:{}", code, state);

        // 2. 通过code换取网页授权access_token
        if (code != null || !(code.equals(""))) {

            String APPID = WX_APPID;
            String SECRET = WX_APPSECRET;
            String CODE = code;
            String WebAccessToken;
            String openId;
            String openid;
            String nickName;
            String headImage;
            String sex;
            String country;
            String province;
            String city;
 /*          // String REDIRECT_URI = "http://www.kanma.ngrok.xiaomiqiu.cn/url";
            String REDIRECT_URI = "http://www.kanma.tunnel.echomod.cn/url";
            String SCOPE = "snsapi_userinfo";
            // String SCOPE = "snsapi_base";

            String getCodeUrl = UserInfoUtil.getCode(APPID, REDIRECT_URI, SCOPE);
            logger.info("第一步:用户授权, get Code URL:{}", getCodeUrl);
*/
            // 替换字符串，获得请求access token URL
            String tokenUrl = UserInfoUtil.getWebAccess(APPID, SECRET, CODE);
            logger.info("第二步:get Access Token URL:{}", tokenUrl);

            // 通过https方式请求获得web_access_token
            String response = HttpsUtil.httpsRequestToString(tokenUrl, "GET", null);

            JSONObject jsonObject = JSON.parseObject(response);
            logger.info("请求到的Access Token:{}", jsonObject.toJSONString());

//            {
//                "access_token":"ACCESS_TOKEN",
//                "expires_in":7200,
//                "refresh_token":"REFRESH_TOKEN",
//                "openid":"OPENID",
//                "scope":"SCOPE",
//                "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
//            }

            if (null != jsonObject) {
                try {

                    WebAccessToken = jsonObject.getString("access_token");
                    openId = jsonObject.getString("openid");
                    logger.info("获取access_token成功!");
                    logger.info("WebAccessToken:{} , openId:{}", WebAccessToken, openId);

                    // 3. 使用获取到的 Access_token 和 openid 拉取用户信息
                    String userMessageUrl = UserInfoUtil.getUserMessage(WebAccessToken, openId);
                    logger.info("第三步:获取用户信息的URL:{}", userMessageUrl);

                    // 通过https方式请求获得用户信息响应
                    String userMessageResponse = HttpsUtil.httpsRequestToString(userMessageUrl, "GET", null);

                    JSONObject userMessageJsonObject = JSON.parseObject(userMessageResponse);

                    logger.info("用户信息:{}", userMessageJsonObject.toJSONString());
//                    {
//                        "openid":" OPENID",
//                        "nickname": NICKNAME,
//                        "sex":"1",
//                        "province":"PROVINCE"
//                        "city":"CITY",
//                        "country":"COUNTRY",
//                        "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MoCfHe/46",
//                        "privilege":[
//                              "PRIVILEGE1"
//                              "PRIVILEGE2"
//                        ],
//                        "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
//                    }

                    if (userMessageJsonObject != null) {
                        try {
                            // openid, nickName, headImage, sex, country, province, city;
                            //1用户唯一标识
                            openid = userMessageJsonObject.getString("openid");
                            frontUrl = "http://www.kanmaui.tunnel.echomod.cn/index.html?root=chat" + "&id=" + openid;
                            //2用户昵称
                            nickName = userMessageJsonObject.getString("nickname");
                            //3headImage
                            headImage = userMessageJsonObject.getString("headimgurl");
                            //4用户性别
                            sex = userMessageJsonObject.getString("sex");
                            //sex = (sex.equals("1")) ? "男" : "女";
                            //5country
                            country = userMessageJsonObject.getString("country");
                            //6province
                            province = userMessageJsonObject.getString("province");
                            //7city
                            city = userMessageJsonObject.getString("city");


                                WeChatUser weChatUser = new WeChatUser();
                                weChatUser.setOpenId(openid);
                                weChatUser.setNickname(nickName);
                                weChatUser.setHeadImg(headImage);
                                weChatUser.setSex(sex);
                                weChatUser.setCountry(country);
                                weChatUser.setProvince(province);
                                weChatUser.setCity(city);

                                if (!list.contains(openid)) {
                                    weChatUserService.insertWeChatUser(weChatUser);
                                    list.add(openid);
                                    logger.info("插入微信用户信息数据成功");
                                    logger.info("用户昵称:{}", nickName);
                                    logger.info("用户性别:{}", sex);
                                    logger.info("OpenId:{}", openid);
                                }else{
                                    logger.info("微信用户信息已存在");
                                }
                        } catch (JSONException e) {
                            logger.error("获取用户信息失败");
                        }
                    }
                } catch (JSONException e) {
                    logger.error("获取Web Access Token失败");
                }
            }
        }
    /*     frontUrl = "http://www.kanmaui.ngrok.xiaomiqiu.cn/index.html?root=chat"+ "id=" + openId;
        logger.info("访问聊天界面");
        logger.info("跳转的前端地址:{}", frontUrl);
        resp.sendRedirect(frontUrl);
    */
    }

    @GetMapping("/chat")
    public void redirectChat(HttpServletResponse resp) throws Exception{
        logger.info("访问聊天界面");
        resp.sendRedirect("http://yaymatest2.tunnel.echomod.cn/index.html?root=chat");
    }
    @GetMapping("/test")
    public void redirectTest(HttpServletResponse resp) throws Exception{
        logger.info("访问测试界面");
        resp.sendRedirect("http://baidu.com");
    }



}