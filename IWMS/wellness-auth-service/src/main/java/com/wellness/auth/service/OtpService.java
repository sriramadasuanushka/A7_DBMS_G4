package com.wellness.auth.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
public class OtpService {

    private final StringRedisTemplate redisTemplate;

    public OtpService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String generateOtp(Integer userId) {

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        String key = "otp:user:" + userId;

        redisTemplate.opsForValue().set(
                key,
                otp,
                Duration.ofMinutes(5)
        );

        System.out.println("Generated OTP for user " + userId + ": " + otp);

        return otp;
    }

    public boolean verifyOtp(Integer userId, String otp) {

        String key = "otp:user:" + userId;

        String storedOtp = redisTemplate.opsForValue().get(key);

        if (storedOtp != null && storedOtp.equals(otp)) {
            redisTemplate.delete(key);
            return true;
        }

        return false;
    }
}