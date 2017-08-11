package com.example.tech9_survey.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Size;

@Entity
public class Answer extends BaseEntity {

	@Column(nullable = false, name = "position_in_question")
	private Long positionInQuestion;
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String content;

	public Long getPositionInQuestion() {
		return positionInQuestion;
	}

	public void setPositionInQuestion(Long positionInQuestion) {
		this.positionInQuestion = positionInQuestion;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
