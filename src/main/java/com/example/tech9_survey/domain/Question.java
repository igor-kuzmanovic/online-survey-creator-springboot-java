package com.example.tech9_survey.domain;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Question extends BaseEntity {
	
	@Column(name = "position_in_survey", nullable = false)
	private Long positionInSurvey;
	
	@Size(max=240)
	private String content;

	@Cascade(CascadeType.ALL)
	@OneToMany
	@JoinColumn(name = "question_id", nullable = false)
	private List<Answer> answers;

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

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

}
