package com.atharva.backend.service;

import com.atharva.backend.entity.User;
import com.atharva.backend.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepo userRepo;


    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//    public void saveNewUser(User user) {
//            user.setPassword(passwordEncoder.encode(user.getPassword()));
//            user.setRoles(Arrays.asList("USER"));
//            userRepo.save(user);
//
//    }
    public boolean saveNewUser(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(Arrays.asList("USER"));
            userRepo.save(user);
            return true;
        }
        catch (Exception e) {
//            log.error("Galti krdi guru----------------- {}",user.getUserName(),e);
            log.error("Galti krdi guru----------------- ");
            log.debug("Galti krdi guru----------------- ");
            return false;
        }

    }
    public void saveAdmin(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER", "ADMIN"));
        userRepo.save(user);
    }
    public void saveExistingUserToAdmin(String username) {
        User user = findByUserName(username);
        user.getRoles().add("ADMIN");
        userRepo.save(user);
    }

    public void saveUser(User user) {
        userRepo.save(user);
    }
    public List<User> getAll() {
        return userRepo.findAll();
    }
    public Optional<User> getById(ObjectId id) {
        return userRepo.findById(id);
    }
    public void deleteById(ObjectId id) {
        userRepo.deleteById(id);

    }
    public User findByUserName(String username) {
        return userRepo.findByUserName(username);
    }
}
