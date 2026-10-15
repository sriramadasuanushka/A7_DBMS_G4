package com.wellness.auth.service;

import com.wellness.auth.dto.RegisterUserResponse;
import com.wellness.auth.entity.User;
import com.wellness.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String username, String password) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException("Invalid username or password");
        }

        return jwtService.generateToken(
                user.getUsername(),
                user.getRole());
    }

    // Existing registration used by the Sign Up page
    public String register(
            String username,
            String password,
            String role,
            String email) {

        if (userRepository
                .findByUsername(username)
                .isPresent()) {

            return "Username already exists";
        }

        User user = new User();

        user.setUsername(username);

        user.setPassword(
                passwordEncoder.encode(password)
        );

        user.setRole(role);

        user.setEmail(email);

        userRepository.save(user);

        return "User registered successfully";
    }

    // Admin creates a new Member login account
    public RegisterUserResponse registerMember(
            String username,
            String password,
            String email) {

        if (userRepository
                .findByUsername(username)
                .isPresent()) {

            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setUsername(username);

        user.setPassword(
                passwordEncoder.encode(password)
        );

        user.setRole("MEMBER");

        user.setEmail(email);

        User savedUser = userRepository.save(user);

        return new RegisterUserResponse(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getRole(),
                savedUser.getEmail()
        );
    }
    public Integer getUserIdByUsername(String username) {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getUserId();
    }
    // Change password
    public String changePassword(
            String username,
            String newPassword) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

        return "Password changed successfully";
    }
    // Delete user account
    public void deleteUser(Integer userId) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(userId);
    }
}