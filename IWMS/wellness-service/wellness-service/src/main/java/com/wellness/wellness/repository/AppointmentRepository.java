package com.wellness.wellness.repository;

import com.wellness.wellness.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByTrainerId(Integer trainerId);
}