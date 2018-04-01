package com.hackathon.oracleinteract.service.seviceimpl;

import com.hackathon.oracleinteract.dao.UserDao;
import com.hackathon.oracleinteract.entity.User;
import com.hackathon.oracleinteract.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Override
    public int add(User user) {
        return userDao.add(user);
    }

    @Override
    public int update(int id,User user) {
        return userDao.update(id ,user);
    }

    @Override
    public void delete(int id) {
        userDao.delete(id);
    }

    @Override
    public User findUserById(int id) {
        return userDao.findUserById(id);
    }

    @Override
    public List<User> findUserList() {
        return userDao.findUserList();
    }

}
