package com.example.tech9_survey.service;

import java.util.List;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.tech9_survey.domain.Answer;
import com.example.tech9_survey.repository.AnswerRepository;

@Transactional
@Service
public class AnswerService {

	private AnswerRepository answerRepository;
	
	@Autowired
	public AnswerService(AnswerRepository answerRepository) {
		this.answerRepository = answerRepository;
	}
	
	public List<Answer> findAll() {
    	return answerRepository.findAll();
    }
    
    public Answer findOne(Long answerId) {
    	return answerRepository.findOne(answerId);
    }
    
    public Answer save(Answer answer) {
    	return answerRepository.save(answer);
    }
    
    public void delete(Long answerId) {
    	answerRepository.delete(answerId);
    }
}
