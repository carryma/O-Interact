package com.example.demo.entity;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

/**
 * User Info from wechat
 *
 * @author Ma Kang
 * @create 2018-04-01 20:24
 **/
public class WeChatUser  {
    //用户的唯一标识
    private String openId;
    // 昵称
    private String nickname;
    // 用户头像地址
    private String headImg;
    // 用户的性别（1是男性，2是女性，0是未知）
    private String sex;
    // 用户所在国家
    private String country;
    // 用户所在省份
    private String province;
    // 用户所在城市
    private String city;
    // 用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
    //private Date createTime;

    public WeChatUser() {
        /*createTime = new Date();*/
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

/*    public Date getCreateTime() {
        return createTime;
    }*/


    @Override
    public String toString() {
        return "WeChatUser{" +
                "openId='" + openId + '\'' +
                ", nickname='" + nickname + '\'' +
                ", headImg='" + headImg + '\'' +
                ", sex='" + sex + '\'' +
                ", country='" + country + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
