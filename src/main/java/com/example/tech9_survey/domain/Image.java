package com.example.tech9_survey.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Image extends BaseEntity {

    private String url;

    @OneToMany
    @JoinColumn(name = "image_id")
    private List<User> users;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
