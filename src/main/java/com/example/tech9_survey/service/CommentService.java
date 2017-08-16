package com.example.tech9_survey.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.repository.CommentRepository;

@Transactional
@Service
public class CommentService {
	
	 private CommentRepository commentRepository;

	 public CommentService(CommentRepository commentRepository) {
	        this.commentRepository = commentRepository;
	    }
	 
	 public Comment save(Comment comment) {
	        return commentRepository.save(comment);
	    }

	 public void delete(Long id) {
	        commentRepository.delete(id);
	    }
	 
	 public Comment findOne(Long id) {
	        return commentRepository.findOne(id);
	    }

	public List<Comment> findAll() {
		return commentRepository.findAll();
	}
}
