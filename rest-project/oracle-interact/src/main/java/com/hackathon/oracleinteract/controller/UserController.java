package com.hackathon.oracleinteract.controller;

import com.hackathon.oracleinteract.entity.User;
import com.hackathon.oracleinteract.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.net.URI;
import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/user")
@Transactional
@Component

public class UserController {
    @Autowired
    UserService userService;

    //get userList using rest API 'localhost:8080/user'
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserList() {
        List<User> userList = userService.findUserList();
        return Response.ok(userList).build();
    }

    //add user using rest API 'localhost:8080/'
    @POST
    @Path("/add")
    //@Consumes(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response addUser(@FormParam("name") String name,@FormParam("label") String label){
        User user = new User(name,label);
        userService.add(user);
        return Response.created(URI.create("/user/" + user.getId())).build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteUser(@PathParam("id") int id){
        userService.delete(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public  Response findUserById(@PathParam("id") int id){
        User user = userService.findUserById(id);
        return Response.ok(user).build();
    }


}

