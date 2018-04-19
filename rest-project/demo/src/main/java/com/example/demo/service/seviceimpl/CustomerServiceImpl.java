package com.example.demo.service.seviceimpl;

import com.example.demo.dao.CustomerDao;
import com.example.demo.dao.WeChatUserDao;
import com.example.demo.entity.Customer;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerDao customerDao;

    @Override
   public int save(Customer customer){
      return   customerDao.save(customer);
    }

    @Override
   public  int checkData(Customer customer){
        String name = customer.getUsername();
        String pass =customer.getPassword();
        System.out.println("=========================");
        List<Customer> list= customerDao.check();
        System.out.println("++++++++++++++++++++++++++");
        for(Customer i: list){
            System.out.println(i.getUsername());
           if(i.getUsername().equals(name) && i.getPassword().equals(pass)){
                return 1;
           }
        }
        return 0;
    }

}
