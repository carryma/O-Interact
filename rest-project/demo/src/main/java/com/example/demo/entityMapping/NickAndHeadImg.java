package com.example.demo.entityMapping;

/**
 * 获取昵称和头像待前端的聊天页面调用
 *
 * @author Ma Kang
 * @create 2018-04-10 12:25
 **/
public class NickAndHeadImg {
    private String nickName;
    private  String headImg;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    @Override
    public String toString() {
        return "NickAndHeadImg{" +
                "nickName='" + nickName + '\'' +
                ", headImg='" + headImg + '\'' +
                '}';
    }
}
