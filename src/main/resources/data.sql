INSERT INTO `tech9survey`.`user_role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `tech9survey`.`user_role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `notify_by_email`, `registration_date`, `is_enabled`, `status_id`)
  VALUES ('admin','admin','tech9survey@gmail.com', TRUE ,'2026-02-02', TRUE, 1);
INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `notify_by_email`, `registration_date`, `is_enabled`, `status_id`)
  VALUES ('user','user','user@tech9survey.com', TRUE, '2026-02-02', TRUE, 1);
INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `notify_by_email`, `registration_date`, `is_enabled`, `status_id`)
  VALUES ('milos','milos','milos@tech9survey.com', TRUE, '2026-02-02', TRUE, 1);

INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 1);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 2);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (2, 2);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (3, 2);
