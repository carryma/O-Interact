package com.example.demo.dao.daoimpl;

import com.example.demo.dao.CustomerDao;
import com.example.demo.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDaoImpl implements CustomerDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
  public  int save(Customer customer){
        String sql = "INSERT INTO customer(username, password) VALUES (?,?)";
        return jdbcTemplate.update(sql, customer.getUsername(), customer.getPassword());
  }
//    @Override
//  public List<Customer> check(){
//
//      String sql = "SELECT * FROM customer";
//      List<Customer> list= jdbcTemplate.query(sql,new Object[]{}, new BeanPropertyRowMapper(Customer.class));
//        System.out.println("======="+list+"============");
//        if (list != null && list.size() > 0) {
//            return list;
//        } else {
//            return null;
//        }
//  }

    @Override
    public List<Customer> check(){
      //  String sql ="select * from customer";
        List<Customer> users = jdbcTemplate.query("select * from customer",new Object[]{},
                new BeanPropertyRowMapper(Customer.class));

        return (users !=null && users.size()>0)?  users : null;
    }
}
