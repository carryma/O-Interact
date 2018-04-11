package com.example.demo.entityMapping;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 把查询信息映射到NickAndHeadImg对象
 *
 * @author Ma Kang
 * @create 2018-04-10 12:29
 **/
public class WeChatRawMapper implements RowMapper {
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        NickAndHeadImg customer = new NickAndHeadImg();
        customer.setNickName(rs.getString("nickname"));
        customer.setHeadImg(rs.getString("head_img"));
        return customer;
    }
}
