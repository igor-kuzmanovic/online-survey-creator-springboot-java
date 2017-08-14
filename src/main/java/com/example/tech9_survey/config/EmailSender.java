package com.example.tech9_survey.config;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailSender {

    public void sendEmail(String sendTo, String activationLink) {
        final String username = "tech9survey@gmail.com";
        final String password = "tech9surveymail";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("tech9survey@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(sendTo));
            message.setSubject("Email verification");
            message.setText("Click on this link to activate your account: " + activationLink + "\n \n" + "This is an automatically generated email, please do not reply!");

            Transport.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}
