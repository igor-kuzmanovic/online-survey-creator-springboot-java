package com.example.tech9_survey.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tech9_survey.domain.Notification;
import com.example.tech9_survey.repository.NotificationRepository;

@Service
public class NotificationService {
	
	private NotificationRepository notificationRepository;

	@Autowired
	public NotificationService(NotificationRepository notificationRepository ) {
		this.notificationRepository = notificationRepository;
	}
	
	public List<Notification> findAll() {
		return notificationRepository.findAll();
	}
	
	public Notification findOne(Long id) {
		return notificationRepository.findOne(id);
	}

	@Transactional
	public Notification save(Notification notification) {
		return notificationRepository.save(notification);
	}

	@Transactional
	public void delete(Long id) {
		notificationRepository.delete(id);
	}

}
