package com.hackathon.oracleinteract.service;

import com.hackathon.oracleinteract.entity.User;

import java.util.List;

public interface UserService {
    int add(User user);
    int update(int id,User user);
    void delete(int id);
    User findUserById(int id);
    //把根据id查出的User放在List中
    List<User> findUserList();
}
