package com.example.tech9_survey.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

@Entity
public class Question extends BaseEntity {
	
	@Column(nullable = false, name = "position_in_survey")
	private Long positionInSurvey;
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String content;

	@ManyToOne
	@JoinColumn(name = "survey_id", nullable=false)
	private Survey surveyId;

	public Long getPositionInSurvey() {
		return positionInSurvey;
	}

	public void setPositionInSurvey(Long positionInSurvey) {
		this.positionInSurvey = positionInSurvey;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Survey getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Survey surveyId) {
		this.surveyId = surveyId;
	}

}
