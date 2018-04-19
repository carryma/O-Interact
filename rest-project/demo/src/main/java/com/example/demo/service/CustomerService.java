package com.example.demo.service;

import com.example.demo.entity.Customer;

public interface CustomerService {
   int save(Customer customer);
   int checkData(Customer customer);
}
