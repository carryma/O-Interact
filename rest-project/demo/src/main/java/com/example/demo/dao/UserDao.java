package com.example.demo.dao;

import com.example.demo.entity.User;

import java.util.List;

public interface UserDao {
    int add(User user);
    int update( User user);
    int delete(int id);
    User findUserById(int id);
    //把根据id查出的User放在List中
    List<User> findUserList();
}
