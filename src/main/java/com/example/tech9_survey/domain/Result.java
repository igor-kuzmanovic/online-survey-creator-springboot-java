package com.example.tech9_survey.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class Result extends BaseEntity {
	
	@Column(name = "question_id")
	private Long questionId;
	
	@Column(name = "answer_id")
	private Long answerId;
	
	private String optional;
	
	@Cascade(CascadeType.ALL)
	@OneToMany
	@JoinColumn(name = "result_id")
	private List<ResultBoolean> resultList;

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

	public List<ResultBoolean> getResultList() {
		return resultList;
	}

	public void setResultList(List<ResultBoolean> resultList) {
		this.resultList = resultList;
	}

}
