package com.wellness.wellness.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "wellness_tasks")
public class WellnessTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Integer taskId;

    @Column(name = "member_id", nullable = false)
    private Integer memberId;

    @Column(name = "task_name", nullable = false)
    private String taskName;

    @Column(name = "completed", nullable = false)
    private Boolean completed = false;

    @Column(name = "task_date", nullable = false)
    private LocalDate taskDate;

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDate getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(LocalDate taskDate) {
        this.taskDate = taskDate;
    }
}