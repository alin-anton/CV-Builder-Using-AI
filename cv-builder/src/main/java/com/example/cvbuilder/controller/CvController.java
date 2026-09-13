package com.example.cvbuilder.controller;


import com.example.cvbuilder.model.CvModel;
import com.example.cvbuilder.service.CvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CvController {
    private final CvService cvService;

    @GetMapping("/user/my-cvs")
    public ResponseEntity<List<CvModel>> getMyCvs(Principal principal) {
        return ResponseEntity.ok(cvService.getAllByUserId(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CvModel> getCvById(@PathVariable String id, Principal principal) {
        return ResponseEntity.ok(cvService.getById(id, principal.getName()));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<CvModel>> getCvByEmail(@PathVariable String email) {
        return ResponseEntity.ok(cvService.getByEmail(email));
    }

    @PostMapping()
    public ResponseEntity<CvModel> addCv(@RequestBody CvModel cvModel, Principal principal) {
        CvModel savedCv = cvService.addCv(cvModel, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCv);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CvModel> updateCv(@RequestBody CvModel newCv, @PathVariable String id, Principal principal) {
        CvModel updatedCv = cvService.updateCv(newCv, id, principal.getName());
        return ResponseEntity.ok(updatedCv);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCv(@PathVariable String id, Principal principal) {
        cvService.deleteCv(id, principal.getName());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/ai-enhance")
    public ResponseEntity<CvModel> enhanceCvWithAi(@RequestBody CvModel cvModel) {
        CvModel enhancedCv = cvService.enhanceCvWithAi(cvModel);
        return ResponseEntity.ok(enhancedCv);
    }

    @PostMapping("/generate-pdf")
    public ResponseEntity<String> generatePdfPreview(@RequestBody CvModel cvModel) {
        String base64PdfUrl = cvService.generatePdf(cvModel);
        return ResponseEntity.ok(base64PdfUrl);
    }
}
