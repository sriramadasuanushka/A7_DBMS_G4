package com.wellness.auth.controller;

import com.wellness.auth.dto.RegisterUserResponse;
import com.wellness.auth.service.AuthService;
import com.wellness.auth.service.OtpService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(
            AuthService authService,
            OtpService otpService) {

        this.authService = authService;
        this.otpService = otpService;
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> request) {

        return authService.register(
                request.get("username"),
                request.get("password"),
                request.get("role"),
                request.get("email")
        );
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> request) {

        return authService.login(
                request.get("username"),
                request.get("password")
        );
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody Map<String, String> request) {

        return authService.changePassword(
                request.get("username"),
                request.get("newPassword")
        );
    }

    // ADMIN only: create a MEMBER login account
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/create-member")
    public RegisterUserResponse createMember(
            @RequestBody Map<String, String> request) {

        return authService.registerMember(
                request.get("username"),
                request.get("password"),
                request.get("email")
        );
    }

    // ADMIN only: delete user
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/delete-user/{userId}")
    public String deleteUser(@PathVariable Integer userId) {

        authService.deleteUser(userId);

        return "User account deleted successfully";
    }

    @GetMapping("/user-id/{username}")
    public Integer getUserId(@PathVariable String username) {

        return authService.getUserIdByUsername(username);
    }

    // =========================
    // OTP GENERATION
    // =========================

    @PostMapping("/generate-otp")
    public String generateOtp(@RequestBody Map<String, String> request) {

        Integer userId = Integer.valueOf(request.get("userId"));

        otpService.generateOtp(userId);

        return "OTP generated successfully";
    }

    // =========================
    // OTP VERIFICATION
    // =========================

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> request) {

        Integer userId = Integer.valueOf(request.get("userId"));
        String otp = request.get("otp");

        boolean verified = otpService.verifyOtp(userId, otp);

        if (verified) {
            return "OTP verified successfully";
        }

        return "Invalid or expired OTP";
    }
}