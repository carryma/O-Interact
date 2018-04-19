package com.example.demo;

import com.example.demo.dao.CustomerDao;
import com.example.demo.dao.daoimpl.CustomerDaoImpl;
import com.example.demo.entity.Customer;
import com.example.demo.entity.LoggerTest;
import com.example.demo.entity.WeChatUser;
import com.example.demo.service.CustomerService;
import com.example.demo.service.WeChatUserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {
    @Autowired
    WeChatUserService weChatUserService;

    @Autowired
    CustomerService customerService;

    @Test
    public void queryWeChatUserByOpenId() {
        System.out.println( weChatUserService.findWechatUserByOpenId("oJdcO1fOnBFdl2FkSn61NNlKUPJs"));
    }

    @Test
    public void loggerTest1() {
        LoggerTest loggerTest = new LoggerTest();
        loggerTest.loggerInfo("Hello, This is my first slf4j Logger");
    }

    @Test
    public void queryOpenId() {
        String id = weChatUserService.findWeChatUserId("oJdcO1fOnBFdl2FkSn61NNlKUPJs");
        System.out.println(id);
    }

    @Test
    public void find(){
        List<WeChatUser> list = weChatUserService.findAllInfo();
        System.out.println(list.get(0));
        System.out.println(list);


    }

    @Test
    public void testData(){
        Customer customerc=new Customer();

       customerc.setUsername("yayma");
      customerc.setPassword("yayma");
        int a = customerService.checkData(customerc);
        System.out.println(a);
//        aaa.check();
//        int a = customerService.checkData(customerc);
//        System.out.println(a);

    }

}

