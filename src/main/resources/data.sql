INSERT INTO `tech9survey`.`user_role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `tech9survey`.`user_role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `tech9survey`.`survey_privacy`(`type`) VALUES ('VISIBILITY_ALL');
INSERT INTO `tech9survey`.`survey_privacy`(`type`) VALUES ('VISIBILITY_REGISTERED');

INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `registration_date`, `image_url`, `is_enabled`, `status_id`)
  VALUES ('admin','admin','admin@tech9survey.com', '2026-02-02', 'https://ih1.redbubble.net/image.88970289.0659/ap,550x550,12x16,1,transparent,t.u1.png', TRUE, 1);
INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `registration_date`, `is_enabled`, `status_id`) VALUES ('user','user','user@tech9survey.com', '2026-02-02', FALSE, 1);

INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 1);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 2);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (2, 2);

INSERT INTO tech9survey.survey
(id, creation_date, description, exit_message, expiration_date, hashed_id, is_active, `name`, publication_date, user_id)
VALUES(0, '2026-02-02', 'aasdasd', 'asdasdasd', '2026-02-02', '5641323156', 0, 'anketa', '2026-02-02', 0);
INSERT INTO tech9survey.survey
(id, creation_date, description, exit_message, expiration_date, hashed_id, is_active, `name`, publication_date, user_id)
VALUES(0, '2026-02-02', 'aasdasd', 'asdasdasd', '2026-02-02', '5641243156', 0, 'anketa', '2026-02-02', 0);
INSERT INTO tech9survey.survey
(id, creation_date, description, exit_message, expiration_date, hashed_id, is_active, `name`, publication_date, user_id)
VALUES(0, '2026-02-02', 'aasdasd', 'asdasdasd', '2026-02-02', '5641223156', 0, 'anketa', '2026-02-02', 0);