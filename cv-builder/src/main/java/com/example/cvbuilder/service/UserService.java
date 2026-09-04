package com.example.cvbuilder.service;

import com.example.cvbuilder.dto.UserDtoResponse;

public interface UserService {

    UserDtoResponse getById(Long id);

    UserDtoResponse getByEmail(String email);

    UserDtoResponse createUser(String username, String email, String password, String role);

    void deleteUser(Long id);

    UserDtoResponse getByUsername(String username);
}
