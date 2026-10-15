package com.wellness.member.service;

import com.wellness.member.entity.Member;
import com.wellness.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public List<Member> getAllMembers() {
        return repository.findAll();
    }

    public Member getMemberById(Integer id) {
        return repository.findById(id).orElse(null);
    }
    public Member getMemberByUserId(Integer userId) {
        return repository.findByUserId(userId).orElse(null);
    }
    public Member addMember(Member member) {
        return repository.save(member);
    }

    public Member updateMember(Member member) {
        return repository.save(member);
    }

    public void deleteMember(Integer id) {
        repository.deleteById(id);
    }

}