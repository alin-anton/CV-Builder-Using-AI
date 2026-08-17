package service.implementation;

import lombok.RequiredArgsConstructor;
import model.CvModel;
import org.springframework.stereotype.Service;
import repository.CvRepository;
import service.CvService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CvServiceImpl implements CvService {

    private final CvRepository cvRepository;

    @Override
    public CvModel getById(String id){
        return cvRepository.findById(id).get();
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
        CvModel cvVechi = cvRepository.findById(id).get();
        cvVechi = cvNou;
        return cvRepository.save(cvVechi);
    }
}
