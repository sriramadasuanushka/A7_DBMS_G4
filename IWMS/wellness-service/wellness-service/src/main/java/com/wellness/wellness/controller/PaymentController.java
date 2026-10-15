package com.wellness.wellness.controller;

import com.wellness.wellness.entity.Payment;
import com.wellness.wellness.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Integer id) {
        return service.getPaymentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        return service.addPayment(payment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Payment updatePayment(@RequestBody Payment payment) {
        return service.updatePayment(payment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Integer id) {
        service.deletePayment(id);
        return "Payment deleted successfully";
    }
}