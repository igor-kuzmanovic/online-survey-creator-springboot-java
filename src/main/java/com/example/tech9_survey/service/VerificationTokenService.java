package com.example.tech9_survey.service;

import com.example.tech9_survey.domain.VerificationToken;
import com.example.tech9_survey.repository.VerificationTokenRepository;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class VerificationTokenService {

    VerificationTokenRepository verificationTokenRepository;

    public VerificationTokenService(VerificationTokenRepository verificationTokenRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
    }

    public void save(VerificationToken verificationToken) {
        verificationTokenRepository.save(verificationToken);
    }

    public VerificationToken findByToken(String token) {
        return verificationTokenRepository.findByToken(token);
    }

    public void delete(Long id) {
        verificationTokenRepository.delete(id);
    }

    public List<VerificationToken> findAll() {
        return verificationTokenRepository.findAll();
    }
}
