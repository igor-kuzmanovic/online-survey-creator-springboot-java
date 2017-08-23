package com.example.tech9_survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tech9_survey.domain.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
