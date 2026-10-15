package com.wellness.wellness.service;

import com.wellness.wellness.entity.Attendance;
import com.wellness.wellness.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository repository;

    public AttendanceService(AttendanceRepository repository) {
        this.repository = repository;
    }

    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }

    public Attendance getAttendanceById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Attendance addAttendance(Attendance attendance) {
        return repository.save(attendance);
    }

    public Attendance updateAttendance(Attendance attendance) {
        return repository.save(attendance);
    }

    public void deleteAttendance(Integer id) {
        repository.deleteById(id);
    }
}