package com.example.tech9_survey.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class UserStatus extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private UserStatusType type;

    public UserStatusType getType() {
        return type;
    }

    public void setType(UserStatusType type) {
        this.type = type;
    }

    public enum UserStatusType {
        STATUS_ACTIVE, STATUS_INACTIVE
    }
}
