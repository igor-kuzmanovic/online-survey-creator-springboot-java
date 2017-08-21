package com.example.tech9_survey.service;

import java.security.NoSuchAlgorithmException;
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
    
    public Survey findOne(Long surveyId) {
    	return surveyRepository.findOne(surveyId);
    }
    
    public Survey findByHashedId(String hashedId) {
    	return surveyRepository.findByHashedId(hashedId);
    }
    
    public Survey save(Survey survey) throws NoSuchAlgorithmException {
    	if(survey.getId() == null) {
    		survey.generateHash();
    	}
    	
    	return surveyRepository.save(survey);
    }
  
    public void delete(Long surveyId) {
    	surveyRepository.delete(surveyId);
    }

	public Survey findSurveyByCommentsId(Long id) {
		 return surveyRepository.findSurveyByCommentsId(id);
	}

}
