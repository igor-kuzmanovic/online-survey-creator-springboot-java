package com.example.tech9_survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tech9_survey.domain.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

	Survey findByHashedId(String hashedId);
	
}
