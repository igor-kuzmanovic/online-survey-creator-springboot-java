package com.example.tech9_survey.service;

import java.util.List;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.repository.CommentRepository;

@Service
public class CommentService {

	private CommentRepository commentRepository;

	@Autowired
	public CommentService(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	public List<Comment> findAll() {
		return commentRepository.findAll();
	}

	public Comment findOne(Long id) {
		return commentRepository.findOne(id);
	}

	@Transactional
	public Comment save(Comment comment) {
		return commentRepository.save(comment);
	}

	@Transactional
	public void delete(Long id) {
		commentRepository.delete(id);
	}

	@Transactional
	public void deleteByUser(String user) {
		commentRepository.deleteByPoster(user);
	}
}
