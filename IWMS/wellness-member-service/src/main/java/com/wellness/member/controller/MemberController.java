package com.wellness.member.controller;

import com.wellness.member.entity.Member;
import com.wellness.member.service.MemberService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return service.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Integer id) {
        return service.getMemberById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Member addMember(@RequestBody Member member) {
        return service.addMember(member);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public Member updateMember(@RequestBody Member member) {
        return service.updateMember(member);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable Integer id) {
        service.deleteMember(id);
        return "Member deleted successfully";
    }
}