package com.example.cvbuilder.service;

import com.example.cvbuilder.model.CvModel;

import java.util.List;

public interface CvService {

    CvModel getById(String id);

    List<CvModel> getByEmail(String email);

    CvModel addCv(CvModel cv);

    CvModel updateCv(CvModel cvNou, String id);

    void deleteCv(String id);
}
