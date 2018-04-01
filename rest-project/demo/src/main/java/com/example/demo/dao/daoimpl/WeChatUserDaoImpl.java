package com.example.demo.dao.daoimpl;

import com.example.demo.dao.WeChatUserDao;
import com.example.demo.entity.WeChatUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * WeChat User Dao implement
 *
 * @author Ma Kang
 * @create 2018-04-02 0:11
 **/
@Repository
public class WeChatUserDaoImpl implements WeChatUserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int insertWeChatUser(WeChatUser weChatUser) {
        String sql = "INSERT INTO wechat_user(open_id, nickname, head_img, sex, country, province, city, create_time) VALUES (?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql, weChatUser.getOpenId(), weChatUser.getNickname(), weChatUser.getHeadImg(), weChatUser.getSex(), weChatUser.getCountry(), weChatUser.getProvince(), weChatUser.getCity(), weChatUser.getCreateTime());
    }

}
