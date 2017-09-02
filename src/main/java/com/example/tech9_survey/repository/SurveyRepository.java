package com.example.tech9_survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tech9_survey.domain.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

	List<Survey> findAllByCreator(String creator);
	
	Survey findByHashedId(String hashedId);

	Survey findSurveyByCommentsId(Long id);

    Survey findSurveyByQuestionsId(Long id);
}
