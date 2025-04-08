package com.atharva.backend.controller;


import com.atharva.backend.cache.AppCache;
import com.atharva.backend.entity.User;
import com.atharva.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")

public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private AppCache appCache;

    @GetMapping("all-users")
    public ResponseEntity<?> getAllUsers(){
        List<User> all = userService.getAll();
        if(!all.isEmpty() && all !=null){
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-admin")
    public void createAdmin(@RequestBody User user){
        userService.saveAdmin(user);
    }
    @PutMapping("/add-user-to-admin")
    public ResponseEntity<?> updateUserToAdmin(@RequestBody User user) {
        String userName = user.getUserName();
        userService.saveExistingUserToAdmin(userName);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @GetMapping("clear-app-cache")
    public void clearAppCache(){
        appCache.init();
    }
}
