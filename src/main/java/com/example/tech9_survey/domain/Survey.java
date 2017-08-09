package com.example.tech9_survey.domain;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Future;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

@Entity
public class Survey extends BaseEntity {
	
	@Size(min=1, max=240)
	@Column(nullable = false)
	private String name;
	
	@Column(name = "user_id")
	private Long userId;
	
	@Column(name = "hashed_id")
	private String hashedId;
	
	@Past
	@Column(nullable = false, name = "creation_date")
	private Date creationDate;
	
	@Future
	@Column(name = "publication_date")
	private Date publicationDate;
	
	@Future
	@Column(name = "expiration_date")
	private Date expirationDate;
	
	@Size(max = 240)
	@Column(name = "welcome_message")
	private String welcomeMessage;
	
	@Size(max = 240)
	@Column(name = "exit_message")
	private String exitMessage;
	
	@Size(max = 240)
	private String description;
	
	@Column(name = "is_active")
	private Boolean isActive;
	
	public void generateHash() throws NoSuchAlgorithmException {
		String userIdString = this.getUserId().toString();
		String dateString = getCreationDate().toString();
		String nameString = getName();
		String hashString = userIdString + nameString + dateString;
		byte[] hashBytes = hashString.getBytes();
		MessageDigest m = MessageDigest.getInstance("MD5");
		byte[] hashedId = m.digest(hashBytes);
		String hashedIdString = new BigInteger(1, hashedId).toString(16);  
		this.setHashedId(hashedIdString);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

}
