package com.example.tech9_survey.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Result extends BaseEntity {
	
	@Cascade(CascadeType.ALL)
	@ManyToOne
	@JoinColumn(name = "question_id", nullable = false)
	private Question questionId;
	
	@Cascade(CascadeType.ALL)
	@ManyToOne
	@JoinColumn(name = "answer_id", nullable = false)
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
