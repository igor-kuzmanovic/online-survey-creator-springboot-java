package com.example.tech9_survey.common;

import com.example.tech9_survey.domain.Role;
import com.example.tech9_survey.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.jtransfo.DomainClass;

import java.util.Set;

@DomainClass(domainClass = User.class)
public class UserDto {

    private Long id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private Set<Role> roles;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
