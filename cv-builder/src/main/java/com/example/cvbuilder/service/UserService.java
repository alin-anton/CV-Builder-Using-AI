package com.example.cvbuilder.service;

import com.example.cvbuilder.dto.UserDtoResponse;
import com.example.cvbuilder.entity.UserEntity;

public interface UserService {

    UserDtoResponse getById(Long id);

    UserDtoResponse getByEmail(String email);

}
