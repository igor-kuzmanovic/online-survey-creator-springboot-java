package com.example.tech9_survey.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
public class SurveyResult extends BaseEntity {
	
	@Column(name = "survey_id")
	private Long surveyId;
	
	@Column(name = "submited_by", nullable = false)
	private String submitedBy;
	
	@Column(name = "creation_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Cascade(CascadeType.ALL)
	@OneToMany
	@JoinColumn(name = "survey_result_id")
	private List<Result> results;

	public String getSubmitedBy() {
		return submitedBy;
	}

	public void setSubmitedBy(String submitedBy) {
		this.submitedBy = submitedBy;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public List<Result> getResults() {
		return results;
	}

	public void setResults(List<Result> results) {
		this.results = results;
	}

	public Long getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Long surveyId) {
		this.surveyId = surveyId;
	}

}
