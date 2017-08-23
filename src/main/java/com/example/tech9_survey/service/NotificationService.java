package com.example.tech9_survey.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.tech9_survey.domain.Notification;
import com.example.tech9_survey.repository.NotificationRepository;

@Transactional
@Service
public class NotificationService {
	
	private NotificationRepository notificationRepository;
	
	public NotificationService(NotificationRepository notificationRepository ) {
		this.notificationRepository = notificationRepository;
	}
	
	public List<Notification> findAll() {
		return notificationRepository.findAll();
	}
	
	public Notification findOne(Long id) {
		return notificationRepository.findOne(id);
	}
	
	public Notification save(Notification notification) {
		return notificationRepository.save(notification);
	}
	
	public void delete(Long id) {
		notificationRepository.delete(id);
	}

}
