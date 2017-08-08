package com.example.tech9_survey.domain;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

@Entity
public class Survey extends BaseEntity {
	
	@Size(min=2, max=240)
	@Column(nullable = false)
	private String name;
	
	@Column(name = "hashed_id")
	private String hashedId;
	
	@Past
	@Column(nullable = false, name = "creation_date")
	private Date creationDate;
	
	public void generateHashedId() throws NoSuchAlgorithmException {
		String idString = this.getId().toString();
		byte[] idBytes = idString.getBytes();
		MessageDigest m = MessageDigest.getInstance("MD5");
		byte[] hashedId = m.digest(idBytes);
		String hashedIdString = new BigInteger(1, hashedId).toString(16);  
		this.setHashedId(hashedIdString);
	}

	public String getHashedId() {
		return hashedId;
	}

	public void setHashedId(String hashedId) {
		this.hashedId = hashedId;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
