package com.example.tech9_survey.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Result extends BaseEntity {
	
	@Column(name = "question_id")
	private Long questionId;
	
	@Column(name = "answer_id")
	private Long answerId;
	
	private String optional;

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

	public Long getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Long answerId) {
		this.answerId = answerId;
	}

	public String getOptional() {
		return optional;
	}

	public void setOptional(String optional) {
		this.optional = optional;
	}

}
