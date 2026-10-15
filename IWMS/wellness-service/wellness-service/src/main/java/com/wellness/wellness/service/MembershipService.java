package com.wellness.wellness.service;

import com.wellness.wellness.entity.Membership;
import com.wellness.wellness.repository.MembershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.List;
@Service
public class MembershipService {

    private final MembershipRepository repository;

    public MembershipService(MembershipRepository repository) {
        this.repository = repository;
    }

    public List<Membership> getAllMemberships() {
        return repository.findAll();
    }

    public Membership getMembershipById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Membership addMembership(Membership membership) {
        return repository.save(membership);
    }

    public Membership updateMembership(Membership membership) {
        return repository.save(membership);
    }

    public void deleteMembership(Integer id) {
        repository.deleteById(id);
    }
    public List<Membership> getMembershipsByMemberId(Integer memberId) {
        return repository.findByMemberId(memberId);
    }
}