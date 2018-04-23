package com.example.demo.controller;


import com.example.demo.entity.Customer;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @CrossOrigin
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public int saveCustomer(@RequestBody Customer customer) {

        return customerService.save(customer);
    }

    @CrossOrigin
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public int checkDa(@RequestBody Customer customer) {

        return customerService.checkData(customer);
    }


}
