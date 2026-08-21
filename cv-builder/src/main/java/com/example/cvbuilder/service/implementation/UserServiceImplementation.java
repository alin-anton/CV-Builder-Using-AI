package com.example.cvbuilder.service.implementation;

import com.example.cvbuilder.dto.UserDtoResponse;
import com.example.cvbuilder.entity.UserEntity;
import com.example.cvbuilder.mapper.UserMapper;
import com.example.cvbuilder.repository.UserRepository;
import com.example.cvbuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDtoResponse getById(Long id){
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nu exista user-ul cu id-ul: " + id));
        return userMapper.toDto(user);
    }

    @Override
    public UserDtoResponse getByEmail(String email){
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nu exista user-ul cu email-ul: " + email));
        return userMapper.toDto(user);
    }
}
