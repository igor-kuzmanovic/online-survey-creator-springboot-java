package com.example.tech9_survey.service;

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
	
	public Answer save(Answer answer) {
		return answerRepository.save(answer);
	}
	
}
