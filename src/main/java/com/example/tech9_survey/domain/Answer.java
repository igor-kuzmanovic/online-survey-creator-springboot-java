package com.example.tech9_survey.domain;

import javax.persistence.Entity;
import javax.validation.constraints.Size;

@Entity
public class Answer extends BaseEntity {
	
	@Size(max=240)
	private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
