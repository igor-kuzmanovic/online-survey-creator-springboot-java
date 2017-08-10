INSERT INTO `tech9survey`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `tech9survey`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_ACTIVE');
INSERT INTO `tech9survey`.`user_status`(`type`) VALUES ('STATUS_INACTIVE');

INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`,`status_id`) VALUES ('admin','admin','admin@tech9survey.com', 1);
INSERT INTO `tech9survey`.`user`(`username`,`password`,`email`,`status_id`) VALUES ('user','user','user@tech9survey.com', 1);

INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 1);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (1, 2);
INSERT INTO `tech9survey`.`user_roles`(`user_id`,`role_id`) VALUES (2, 2);