package com.hackathon.oracleinteract;

import com.hackathon.oracleinteract.entity.User;
import com.hackathon.oracleinteract.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
public class OracleInteractApplicationTests {
    @Autowired
    private UserService userService;
    User user = new User("小猪佩奇3", "玩泥巴");

    @Test
    public void addUser() {
        userService.add(user);
    }

    @Test
    public void updateUser() {
        userService.update(11, user);
        System.out.println("更新用户信息成功");
    }

    @Test
    public void deleteUser() {
        userService.delete(13);
        System.out.println("删除用户成功");
    }

    @Test
    public void findUserById() {
        System.out.println(userService.findUserById(11).toString());
    }

    @Test
    public void findUserList() {
        List<User> userList;
        userList = userService.findUserList();
        for (User user:userList){
            System.out.println(user.toString());
        }
    }


}
