package com.example.tech9_survey.service;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.tech9_survey.domain.Question;
import com.example.tech9_survey.repository.QuestionRepository;

@Transactional
@Service
public class QuestionService {

	private QuestionRepository questionRepository;
	
	@Autowired
	public QuestionService(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
	}
	
    public Question save(Question question) {
    	return questionRepository.save(question);
    }
	
}
