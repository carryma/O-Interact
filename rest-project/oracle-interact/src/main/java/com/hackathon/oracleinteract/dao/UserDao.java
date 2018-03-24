package com.hackathon.oracleinteract.dao;

import com.hackathon.oracleinteract.entity.User;

import java.util.List;

public interface UserDao {
    int add(User user);
    int update(int id,User user);
    int delete(int id);
    User findUserById(int id);
    //把根据id查出的User放在List中
    List<User> findUserList();
}
