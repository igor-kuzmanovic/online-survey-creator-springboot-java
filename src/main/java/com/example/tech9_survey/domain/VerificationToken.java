package com.example.tech9_survey.domain;

import javax.persistence.*;

@Entity
public class VerificationToken extends BaseEntity {

    private String token;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @MapsId
    private User user;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
