package com.hackathon.oracleinteract.dao.daoimpl;

import com.hackathon.oracleinteract.dao.UserDao;
import com.hackathon.oracleinteract.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //private String sql = "insert into interact_user(name, label,date) values(?, ?,?)";
    @Override
    public int add(User user) {
        return jdbcTemplate.update("INSERT INTO interact_user(name,label,date) VALUES(?,?,?)",
                user.getName(), user.getLabel(), user.getDate());
    }

    @Override
    public int delete(int id) {
        return jdbcTemplate.update("DELETE FROM interact_user WHERE id=?", id);
    }

    @Override
    public int update(int id, User user) {
        return jdbcTemplate.update("UPDATE  interact_user SET name=? ,label=? ,date=? WHERE id=?",
                user.getName(), user.getLabel(), user.getDate(),id);
    }

    @Override
    public User findUserById(int id) {
        List<User> list = jdbcTemplate.query("SELECT * FROM interact_user WHERE id = ?",
                new Object[]{id}, new BeanPropertyRowMapper(User.class));
        if (list != null && list.size() > 0) {
            User user = list.get(0);
            return user;
        } else {
            return null;
        }
    }

    @Override
    public List<User> findUserList() {
        List<User> list = jdbcTemplate.query("SELECT * FROM interact_user", new Object[]{},
                new BeanPropertyRowMapper(User.class));
        if (list != null && list.size() > 0) {
            return list;
        } else {
            return null;
        }
    }
}
