package com.example.tech9_survey.repository;

import com.example.tech9_survey.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Image findByUrl(String url);
}
