package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.example.demo.util.UserInfoUtil.getCode;

@SpringBootApplication
public class DemoApplication {
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurererAdapter() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("*")
//                        .allowedMethods("PUT", "DELETE", "GET", "POST")
//                        .allowedHeaders("*")
//                        .exposedHeaders("access-control-allow-headers",
//                                "access-control-allow-methods",
//                                "access-control-allow-origin",
//                                "access-control-max-age",
//                                "X-Frame-Options")
//                        .allowCredentials(false).maxAge(3600);
//            }
//        };
//
//    }

    public static void main(String[] args) {
        String REDIRECT_URI = "http://yayma.tunnel.echomod.cn/url";
        //String SCOPE = "snsapi_base"; // snsapi_userinfo // snsapi_base
        String SCOPE = "snsapi_userinfo";
        //appId
        String appId = "wxabe14a0c6c57dec9";
        //"wxe634435c58769578";

        String getCodeUrl = getCode(appId, REDIRECT_URI, SCOPE);
        System.out.println("getCodeUrl:" + getCodeUrl);
        SpringApplication.run(DemoApplication.class, args);
    }

}

