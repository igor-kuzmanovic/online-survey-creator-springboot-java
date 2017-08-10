package com.example.tech9_survey.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Size;

@Entity
public class Question extends BaseEntity {
	
	@Column(nullable = false, name = "survey_id")
	private int surveyId;
	
	@Column(nullable = false, name = "position_in_survey")
	private int positionInSurvey;
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String content;

	public int getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(int surveyId) {
		this.surveyId = surveyId;
	}

	public int getPositionInSurvey() {
		return positionInSurvey;
	}

	public void setPositionInSurvey(int positionInSurvey) {
		this.positionInSurvey = positionInSurvey;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
