package com.example.tech9_survey.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Result extends BaseEntity {
	
	@ManyToOne
	@JoinColumn(name = "question_id")
	private Question questionId;
	
	@ManyToOne
	@JoinColumn(name = "answer_id")
	private Answer answerId;

	public Question getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Question questionId) {
		this.questionId = questionId;
	}

	public Answer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Answer answerId) {
		this.answerId = answerId;
	}

}
