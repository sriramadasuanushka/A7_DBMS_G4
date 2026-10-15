package com.wellness.wellness.controller;

import com.wellness.wellness.entity.Appointment;
import com.wellness.wellness.service.AppointmentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return service.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Integer id) {
        return service.getAppointmentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return service.addAppointment(appointment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Appointment updateAppointment(@RequestBody Appointment appointment) {
        return service.updateAppointment(appointment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Integer id) {
        service.deleteAppointment(id);
        return "Appointment deleted successfully";
    }
    @GetMapping("/trainer/{trainerId}")
    public List<Appointment> getAppointmentsByTrainerId(
            @PathVariable Integer trainerId) {
        return service.getAppointmentsByTrainerId(trainerId);
    }
}