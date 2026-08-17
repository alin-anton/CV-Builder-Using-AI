package com.example.cvbuilder.service.implementation;

import lombok.RequiredArgsConstructor;
import com.example.cvbuilder.model.CvModel;
import org.springframework.stereotype.Service;
import com.example.cvbuilder.repository.CvRepository;
import com.example.cvbuilder.service.CvService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CvServiceImpl implements CvService {

    private final CvRepository cvRepository;

    @Override
    public CvModel getById(String id){
        return cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nu exista CV-ul cu id-ul" + id));
    }

    @Override
    public List<CvModel> getByEmail(String email){
        return cvRepository.findByPersonalDetailsEmail(email);
    }

    @Override
    public CvModel addCv(CvModel cv){
        return cvRepository.save(cv);
    }

    @Override
    public CvModel updateCv(CvModel cvNou, String id){
        cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV-ul cu id-ul"
                        + id + "nu exista in baza de date!"));
        cvNou.setId(id);
        return cvRepository.save(cvNou);
    }

    @Override
    public void deleteCv(String id){
        cvRepository.deleteById(id);
    }
}
