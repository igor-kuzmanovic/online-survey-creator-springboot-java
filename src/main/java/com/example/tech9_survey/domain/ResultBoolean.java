package com.example.tech9_survey.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class ResultBoolean extends BaseEntity {
	
	@Column(name = "is_checked")
	private Boolean isChecked;

	public Boolean getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Boolean isChecked) {
		this.isChecked = isChecked;
	}

}
