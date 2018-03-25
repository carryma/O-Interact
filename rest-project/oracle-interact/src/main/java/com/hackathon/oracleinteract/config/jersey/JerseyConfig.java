package com.hackathon.oracleinteract.config.jersey;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spring.scope.RequestContextFilter;
import org.springframework.stereotype.Component;

@Component
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        //构造函数，在这里注册需要使用的内容，（过滤器，拦截器，API等）
        register(RequestContextFilter.class);
        packages("com.hackathon.oracleinteract.controller");
    }
}
