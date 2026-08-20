package com.example.cvbuilder.repository;


import com.example.cvbuilder.model.CvModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvRepository extends MongoRepository<CvModel, String> {

    List<CvModel> findByPersonalDetailsEmail(String email);

}
