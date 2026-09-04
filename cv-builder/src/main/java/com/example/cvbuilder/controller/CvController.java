package com.example.cvbuilder.controller;


import com.example.cvbuilder.model.CvModel;
import com.example.cvbuilder.service.CvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CvController {
    private final CvService cvService;

    @GetMapping("/{id}")
    public ResponseEntity<CvModel> getCvById(@PathVariable String id){
        return ResponseEntity.ok(cvService.getById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<CvModel>> getCvByEmail(@PathVariable String email){
        return ResponseEntity.ok(cvService.getByEmail(email));
    }

    @PostMapping()
    public ResponseEntity<CvModel> addCv(@RequestBody CvModel cvModel){
        CvModel savedCv = cvService.addCv(cvModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCv);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CvModel> updateCv(@RequestBody CvModel newCv, @PathVariable String id){
        CvModel updatedCv = cvService.updateCv(newCv, id);
        return ResponseEntity.ok(updatedCv);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCv(@PathVariable String id){
        cvService.deleteCv(id);
        return ResponseEntity.noContent().build();
    }
}
