package com.example.cvbuilder.controller;

import com.example.cvbuilder.dto.UserDtoResponse;
import com.example.cvbuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDtoResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDtoResponse> getByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.getByEmail(email));
    }

    @PostMapping
    public ResponseEntity<UserDtoResponse> createUser(@RequestParam String username,@RequestParam String email,
                                                      @RequestParam String password,@RequestParam String role){

        UserDtoResponse userDtoResponse = userService.createUser(username,email,password,role);
        return new ResponseEntity<>(userDtoResponse,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDtoResponse> getCurrentUser(Principal principal) {

        return ResponseEntity.ok(userService.getByUsername(principal.getName()));
    }
}
