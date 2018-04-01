package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static com.example.demo.util.UserInfoUtil.getCode;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		String REDIRECT_URI = "http://www.kanma.ngrok.xiaomiqiu.cn/url";
		//String SCOPE = "snsapi_base"; // snsapi_userinfo // snsapi_base
		String SCOPE = "snsapi_userinfo";
		//appId
		String appId = "wxe634435c58769578";

		String getCodeUrl = getCode(appId, REDIRECT_URI, SCOPE);
		System.out.println("getCodeUrl:"+getCodeUrl);
		SpringApplication.run(DemoApplication.class, args);
	}
}
