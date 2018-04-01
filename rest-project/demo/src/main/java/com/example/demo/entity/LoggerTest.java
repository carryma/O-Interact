package com.example.demo.entity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Logger Test using Logger logger = LoggerFactory.getLogger(getClass());
 *
 * @author Ma Kang
 * @create 2018-04-01 13:51
 **/
public class LoggerTest {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    public void loggerInfo(String name) {
        logger.info(name);
    }
}
