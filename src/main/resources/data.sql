INSERT INTO `tech9survey`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `tech9survey`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `is_enabled`, `status_id`) VALUES ('admin','admin','admin@tech9survey.com', TRUE, 1);
INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`, `is_enabled`, `status_id`) VALUES ('user','user','user@tech9survey.com', FALSE, 1);

INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 1);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 2);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (2, 2);

INSERT INTO tech9survey.survey
(id, creation_date, description, exit_message, expiration_date, hashed_id, is_active, `name`, publication_date, user_id, welcome_message)
VALUES(0, '2026-02-02', 'aasdasd', 'asdasdasd', '2026-02-02', '564123156', 0, 'anketa', '2026-02-02', 0, 'hi');
INSERT INTO tech9survey.survey
(id, creation_date, description, exit_message, expiration_date, hashed_id, is_active, `name`, publication_date, user_id, welcome_message)
VALUES(0, '2026-02-02', 'aasdasd', 'asdasdasd', '2026-02-02', '564123156', 0, 'anketa', '2026-02-02', 0, 'hi');
INSERT INTO tech9survey.survey
(id, creation_date, description, exit_message, expiration_date, hashed_id, is_active, `name`, publication_date, user_id, welcome_message)
VALUES(0, '2026-02-02', 'aasdasd', 'asdasdasd', '2026-02-02', '564123156', 0, 'anketa', '2026-02-02', 0, 'hi');