package com.wellness.wellness.service;

import com.wellness.wellness.entity.Appointment;
import com.wellness.wellness.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.List;
@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(AppointmentRepository repository) {
        this.repository = repository;
    }

    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    public Appointment getAppointmentById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Appointment addAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public Appointment updateAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public void deleteAppointment(Integer id) {
        repository.deleteById(id);
    }
    public List<Appointment> getAppointmentsByTrainerId(Integer trainerId) {
        return repository.findByTrainerId(trainerId);
    }
}