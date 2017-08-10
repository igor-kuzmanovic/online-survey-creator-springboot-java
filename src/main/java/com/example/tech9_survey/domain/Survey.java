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
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String name;
	
	@Column(name = "hashed_id")
	private String hashedId;
	
	@Past
	@Column(nullable = false, name = "creation_date")
	private Date creationDate;
	
	@Column(nullable = false, name = "publication_date")
	private Date publicationDate;
	
	@Column(nullable = false, name = "expiration_date")
	private Date expirationDate;
	
	@Column(name = "modified_date")
	private Date modifiedDate;
	
	@Size(max = 240)
	@Column(name = "welcome_message")
	private String welcomeMessage;
	
	@Size(max = 240)
	@Column(name = "exit_message")
	private String exitMessage;
	
	private String description;
	
	@Column(nullable = false, name = "is_active")
	private Boolean isActive;
	
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

	public void setName(String title) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(Date publicationDate) {
		this.publicationDate = publicationDate;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public String getWelcomeMessage() {
		return welcomeMessage;
	}

	public void setWelcomeMessage(String welcomeMessage) {
		this.welcomeMessage = welcomeMessage;
	}

	public String getExitMessage() {
		return exitMessage;
	}

	public void setExitMessage(String exitMessage) {
		this.exitMessage = exitMessage;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	
	

}
