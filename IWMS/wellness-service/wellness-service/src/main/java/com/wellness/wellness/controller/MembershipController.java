package com.wellness.wellness.controller;

import com.wellness.wellness.entity.Membership;
import com.wellness.wellness.service.MembershipService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
@RequestMapping("/api/memberships")
public class MembershipController {

    private final MembershipService service;

    public MembershipController(MembershipService service) {
        this.service = service;
    }

    @GetMapping
    public List<Membership> getAllMemberships() {
        return service.getAllMemberships();
    }

    @GetMapping("/{id}")
    public Membership getMembershipById(@PathVariable Integer id) {
        return service.getMembershipById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Membership addMembership(@RequestBody Membership membership) {
        return service.addMembership(membership);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Membership updateMembership(@RequestBody Membership membership) {
        return service.updateMembership(membership);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteMembership(@PathVariable Integer id) {
        service.deleteMembership(id);
        return "Membership deleted successfully";
    }
    @GetMapping("/member/{memberId}")
    public List<Membership> getMembershipsByMemberId(
            @PathVariable Integer memberId) {
        return service.getMembershipsByMemberId(memberId);
    }
}