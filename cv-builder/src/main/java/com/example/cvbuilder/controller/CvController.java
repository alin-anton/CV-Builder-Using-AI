package com.example.cvbuilder.controller;


import com.example.cvbuilder.model.CvModel;
import com.example.cvbuilder.service.AiService;
import com.example.cvbuilder.service.CvService;
import com.example.cvbuilder.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CvController {
    private final CvService cvService;
    private final AiService aiService;
    private final PdfService pdfService;

    @GetMapping("/{id}")
    public ResponseEntity<CvModel> getCvById(@PathVariable String id){
        return ResponseEntity.ok(cvService.getById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<CvModel>> getCvByEmail(@PathVariable String email){
        return ResponseEntity.ok(cvService.getByEmail(email));
    }

    @PostMapping
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
    
    @PostMapping("/generate-ai-pdf")
    public ResponseEntity<byte[]> generateAiPdf(@RequestBody CvModel cvModel) {
        // 1. (Opțional) Salvezi datele venite din frontend în MongoDB
        // cvRepository.save(cvModel);

        // 2. Cere-i AI-ului să genereze design-ul HTML pe baza datelor tale
        String htmlDesign = aiService.generateHtmlCvDesign(cvModel);

        // 3. Transformă HTML-ul de la AI în PDF real
        byte[] pdfBytes = pdfService.convertHtmlToPdf(htmlDesign);

        // 4. Returnează fișierul către utilizator
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "CV_Generat_AI.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }
}
