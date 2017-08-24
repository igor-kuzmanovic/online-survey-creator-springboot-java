package com.example.tech9_survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tech9_survey.domain.SurveyResult;

@Repository
public interface ResultRepository extends JpaRepository<SurveyResult, Long> {
	
	List<SurveyResult> findBySurveyId(Long surveyId);

}
