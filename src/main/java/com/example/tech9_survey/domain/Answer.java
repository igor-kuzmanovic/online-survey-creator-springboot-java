package com.example.tech9_survey.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Size;

@Entity
public class Answer extends BaseEntity {

	@Column(nullable = false, name = "question_id")
	private int questionId;
	
	@Column(nullable = false, name = "position_in_question")
	private int positionInQuestion;
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String content;

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public int getPositionInQuestion() {
		return positionInQuestion;
	}

	public void setPositionInQuestion(int positionInQuestion) {
		this.positionInQuestion = positionInQuestion;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
