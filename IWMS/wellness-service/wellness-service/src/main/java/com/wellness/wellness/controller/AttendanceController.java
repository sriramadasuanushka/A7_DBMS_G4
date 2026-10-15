package com.wellness.wellness.controller;

import com.wellness.wellness.entity.Attendance;
import com.wellness.wellness.service.AttendanceService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return service.getAllAttendance();
    }

    @GetMapping("/{id}")
    public Attendance getAttendanceById(@PathVariable Integer id) {
        return service.getAttendanceById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return service.addAttendance(attendance);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Attendance updateAttendance(@RequestBody Attendance attendance) {
        return service.updateAttendance(attendance);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteAttendance(@PathVariable Integer id) {
        service.deleteAttendance(id);
        return "Attendance deleted successfully";
    }
}