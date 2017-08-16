package com.example.tech9_survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.domain.User;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findAllByUser(User user);

}
