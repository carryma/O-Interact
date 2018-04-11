package com.example.demo.dao.daoimpl;

import com.example.demo.dao.WeChatUserDao;
import com.example.demo.entity.WeChatUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


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
        String sql = "INSERT INTO wechat_user(open_id, nickname, head_img, sex, country, province, city) VALUES (?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql, weChatUser.getOpenId(), weChatUser.getNickname(), weChatUser.getHeadImg(), weChatUser.getSex(), weChatUser.getCountry(), weChatUser.getProvince(), weChatUser.getCity());
    }

    @Override
    public String findWeChatUserId(String weChatOpenId) {
        String sql = "SELECT open_id FROM wechat_user WHERE open_id = ?";
        List<String> result = jdbcTemplate.queryForList(
                sql, new Object[]{weChatOpenId}, String.class);
        if(result.size()==0){
            return null;
      }else{
            return result.get(0);
        }
        //return null;
    }

    @Override
    public WeChatUser findWechatUserByOpenId(String weChatOpenId) {
        List<WeChatUser> list = jdbcTemplate.query("SELECT * FROM wechat_user WHERE open_id = ?",
                new Object[]{weChatOpenId}, new BeanPropertyRowMapper(WeChatUser.class));
        if (list != null && list.size() > 0) {
            WeChatUser user = list.get(0);
            return user;
        } else {
            return null;
        }
    }

/*    @Override
    public NickAndHeadImg findWeChatUserId(String weChatOpenId) {
        String sql = "SELECT * FROM wechat_user WHERE open_id = ?";
        NickAndHeadImg nickAndHeadImg = (NickAndHeadImg)getJdbcTemplate().queryForObject(sql,
                new Object[]{weChatOpenId},new WeChatRawMapper());
        if (nickAndHeadImg != null) {
            return nickAndHeadImg;
        } else {
            return null;
        }
    }*/


}
