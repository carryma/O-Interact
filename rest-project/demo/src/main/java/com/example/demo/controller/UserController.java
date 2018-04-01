package com.example.demo.controller;

import com.example.demo.entityMapping.PostUser;
import com.example.demo.entity.User;
//import com.example.demo.entityMapping.UpdateUser;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 用户列表
     *
     * @return userList
     */
    @RequestMapping("/list")
    public List<User> listUser() {
        List<User> userList = null;
        try {
            userList = userService.findUserList();
        } catch (Exception e) {
            System.out.println("异常信息:  " + e.getMessage());
        }
        return userList;
    }

    /**
     * 根据id查询User实体
     *
     * @param id user id
     * @return user
     */
    @RequestMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        User user;
        try {
            user = userService.findUserById(id);
        } catch (Exception e) {
            user = new User("admin", "admin@sina.com");
            System.out.println("异常信息： " + e.getMessage());
        }
        return user;
    }

    /**
     * 保存user实体
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public int insertUser(@RequestBody PostUser postUser) {

        int res = 1;
        User user = new User(postUser.getName(), postUser.getLabel());
        // user.setName(name);
        //user.setLabel(label);
        try {
            res = userService.add(user);
        } catch (Exception e) {
            System.out.println("异常信息： " + e.getMessage());
        }
        return res;
    }

    /**
     * 根据id删除user实体
     *
     * @param id user id
     * @return res
     */
    @RequestMapping("/delete/{id}")
    public int deleteUserById(@PathVariable int id) {
        int res = 1;
        try {
            res = userService.delete(id);
        } catch (Exception e) {
            System.out.println("异常信息： " + e.getMessage());
        }
        return res;
    }

    /**
     * 根据id更新user实体
     *
     * @param id user id
     * @param RequestBody user name lebel
     * @return res
     */
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public int updateUserWithId(@PathVariable int id,@RequestBody PostUser updateUser) {
        User user = new User(updateUser.getName(), updateUser.getLabel());
        user.setId(id);
        int res = 1;
        try {
            res = userService.update(user);
        } catch (
                Exception e)

        {
            System.out.println("异常信息： " + e.getMessage());
        }
        return res;
    }
}

