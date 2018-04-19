package com.example.demo.dao;

import com.example.demo.entity.Customer;
import java.util.List;

public interface CustomerDao {
    int save(Customer customer);
    List<Customer> check();
}
