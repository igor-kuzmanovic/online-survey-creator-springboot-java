package com.example.tech9_survey.service;

import java.security.NoSuchAlgorithmException;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.repository.SurveyRepository;

@Transactional
@Service
public class SurveyService {
	
    private SurveyRepository surveyRepository;

    @Autowired
    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }
    
    public Survey save(Survey newSurvey) {
    	Survey generatedSurvey = surveyRepository.save(newSurvey);
    	try {
    		generatedSurvey.generateHashedId();
    	} catch (NoSuchAlgorithmException e) {
    		e.printStackTrace();
    	}
    	return surveyRepository.save(generatedSurvey);
    }

}
