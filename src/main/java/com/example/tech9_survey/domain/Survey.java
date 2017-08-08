package com.example.tech9_survey.domain;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.springframework.security.crypto.codec.Hex;

@Entity
public class Survey extends BaseEntity {
	
	@Column(nullable = false)
	private String name;
	
	@Column(name = "hashed_id")
	private String hashedId;
	
	@Column(nullable = false)
	private Date creationDate;
	
	public void generateHashedId() throws NoSuchAlgorithmException {
		String idString = this.getId().toString();
		byte[] idBytes = idString.getBytes();
		MessageDigest m = MessageDigest.getInstance("MD5");
		byte[] hashedId = m.digest(idBytes);
		String hashedIdString = new String(Hex.encode(hashedId));
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
