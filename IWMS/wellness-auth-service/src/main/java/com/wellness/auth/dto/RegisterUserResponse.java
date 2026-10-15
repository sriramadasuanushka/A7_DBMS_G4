package com.wellness.auth.dto;

public class RegisterUserResponse {

    private Integer userId;
    private String username;
    private String role;
    private String email;

    public RegisterUserResponse(
            Integer userId,
            String username,
            String role,
            String email) {

        this.userId = userId;
        this.username = username;
        this.role = role;
        this.email = email;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }
}