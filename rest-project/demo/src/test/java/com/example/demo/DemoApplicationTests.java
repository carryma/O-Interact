package com.example.demo;

import com.example.demo.entity.LoggerTest;
import com.example.demo.service.WeChatUserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {
    @Autowired
    WeChatUserService weChatUserService;


    @Test
    public void contextLoads() {
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
}

