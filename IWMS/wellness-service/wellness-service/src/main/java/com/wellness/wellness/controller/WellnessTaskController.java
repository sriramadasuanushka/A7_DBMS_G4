package com.wellness.wellness.controller;

import com.wellness.wellness.entity.WellnessTask;
import com.wellness.wellness.kafka.NotificationProducer;
import com.wellness.wellness.service.WellnessTaskService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class WellnessTaskController {

    private final WellnessTaskService service;
    private final NotificationProducer notificationProducer;

    public WellnessTaskController(
            WellnessTaskService service,
            NotificationProducer notificationProducer) {
        this.service = service;
        this.notificationProducer = notificationProducer;
    }

    @GetMapping("/member/{memberId}")
    public List<WellnessTask> getTasksByMemberId(
            @PathVariable Integer memberId) {
        return service.getTasksByMemberId(memberId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public WellnessTask createTask(
            @RequestBody WellnessTask task) {
        return service.saveTask(task);
    }

    @PutMapping("/{taskId}/complete")
    public WellnessTask completeTask(
            @PathVariable Integer taskId) {

        WellnessTask task = service.getTaskById(taskId);

        if (task == null) {
            throw new RuntimeException("Task not found");
        }

        task.setCompleted(true);

        WellnessTask savedTask = service.saveTask(task);

        notificationProducer.sendNotification(
                "Daily wellness task completed: "
                        + task.getTaskName()
        );

        return savedTask;
    }
}