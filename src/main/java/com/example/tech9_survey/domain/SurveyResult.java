package com.example.tech9_survey.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class SurveyResult extends BaseEntity {
	
	@ManyToOne
	@JoinColumn(name = "survey_id", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Survey survey;
	
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

	public Survey getSurvey() {
		return survey;
	}

	public void setSurvey(Survey survey) {
		this.survey = survey;
	}

}
