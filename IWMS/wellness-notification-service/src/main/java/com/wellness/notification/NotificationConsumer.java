package com.wellness.notification;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    private final EmailService emailService;

    public NotificationConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(
            topics = "notifications",
            groupId = "wellness-notification-group"
    )
    public void consumeNotification(String message) {

        System.out.println("Received notification: " + message);

        emailService.sendEmail(
                "bmamatha1236@gmail.com",
                "Wellness Notification",
                message
        );
    }
}