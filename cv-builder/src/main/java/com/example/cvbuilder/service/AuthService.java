package com.example.cvbuilder.service;

import com.example.cvbuilder.dto.AuthResponse;
import com.example.cvbuilder.dto.LoginRequest;
import com.example.cvbuilder.dto.RegisterRequest;
import com.example.cvbuilder.entity.UserEntity;
import com.example.cvbuilder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Numele de utilizator este obligatoriu!");
        }
        if (userRepository.findByUsername(request.getUsername().trim()).isPresent()) {
            throw new RuntimeException("Numele de utilizator este deja folosit!");
        }
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()
                && userRepository.findByEmail(request.getEmail().trim()).isPresent()) {
            throw new RuntimeException("Adresa de email este deja folosită!");
        }

        // Creăm entitatea de user
        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername().trim());
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            user.setEmail(request.getEmail().trim());
        }
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Criptăm parola!
        user.setRole(UserEntity.Role.USER);

        // Salvăm în MySQL
        userRepository.save(user);

        // Generăm token-ul JWT
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        // Autentificăm utilizatorul (Spring Security verifică automat parola criptată)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // Dacă trece de autentificare, scoatem user-ul din BD
        UserEntity user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit!"));

        // Generăm noul token
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
}