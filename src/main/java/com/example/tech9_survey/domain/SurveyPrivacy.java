package com.example.tech9_survey.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class SurveyPrivacy extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private SurveyPrivacyType type;

    public SurveyPrivacyType getType() {
        return type;
    }

    public void setType(SurveyPrivacyType type) {
        this.type = type;
    }

    public enum SurveyPrivacyType {
        VISIBILITY_ALL, VISIBILITY_REGISTERED
    }
	
}
