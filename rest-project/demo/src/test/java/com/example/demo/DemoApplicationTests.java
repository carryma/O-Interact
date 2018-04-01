package com.example.demo;

import com.example.demo.entity.LoggerTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	@Test
	public void contextLoads() {
	}

	@Test
    public void loggerTest1(){
        LoggerTest loggerTest = new LoggerTest();
        loggerTest.loggerInfo("Hello, This is my first slf4j Logger");
    }
}
