package com.example.tech9_survey.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Question extends BaseEntity {
	
	@Column(nullable = false, name = "position_in_survey")
	private Long positionInSurvey;
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String content;

	@Cascade(CascadeType.ALL)
	@OneToMany
	@JoinColumn(name = "question_id", nullable = false)
	private Set<Answer> answers;

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

	public Set<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(Set<Answer> answers) {
		this.answers = answers;
	}

}
