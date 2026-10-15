package com.wellness.wellness.repository;

import com.wellness.wellness.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership, Integer> {

    List<Membership> findByMemberId(Integer memberId);
}