package com.example.cvbuilder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoResponse {


    private Long id;

    private String username;

    private String email;

    private String role;
}
