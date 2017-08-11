package com.example.tech9_survey.service;

import java.util.List;
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
   
    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }
    
    public Survey save(Survey survey) {
    	return surveyRepository.save(survey);
    }

}
