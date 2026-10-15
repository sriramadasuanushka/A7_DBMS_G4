package com.wellness.wellness.service;

import com.wellness.wellness.entity.Payment;
import com.wellness.wellness.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    public Payment getPaymentById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Payment addPayment(Payment payment) {
        return repository.save(payment);
    }

    public Payment updatePayment(Payment payment) {
        return repository.save(payment);
    }

    public void deletePayment(Integer id) {
        repository.deleteById(id);
    }
}