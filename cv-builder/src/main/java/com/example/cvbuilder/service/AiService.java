package com.example.cvbuilder.service;
import com.example.cvbuilder.model.CvModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

@Service
public class AiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public AiService(ChatClient.Builder chatClientBuilder, ObjectMapper objectMapper){
        this.chatClient = chatClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String generateHtmlCvDesign(CvModel cvModel) {
        // Transformăm datele din DB într-un String JSON pentru a le trimite la AI
        String jsonData = objectMapper.writeValueAsString(cvModel);

        String prompt = "Ești un designer de CV-uri profesionist. Bazează-te pe următoarele date în format JSON: \n"
                + jsonData + "\n\n"
                + "Te rog să generezi un cod HTML complet (incluzând tag-urile <html>, <head>, <body>) pentru acest CV. "
                + "Folosește CSS inline sau în secțiunea <style> pentru un design modern, minimalist și profesional (fonturi sans-serif, spațiere bună, evidențierea titlurilor de secțiuni). "
                + "IMPORTANT: Returnează STRICT codul HTML brut, fără formatting de tip markdown (fără ```html) și fără alte mesaje explicative.";

        return this.chatClient.prompt()
                .user(prompt)
                .call()
                .content();

    }


    public String extractTextFromPdf(MultipartFile file) {
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (IOException e) {
            throw new RuntimeException("Nu am putut citi fișierul PDF.", e);
        }
    }

    public CvModel parseTextToCvModel(String rawText) {
        // Aici îi spunem Spring AI-ului cum arată clasa
        var converter = new BeanOutputConverter<>(CvModel.class);

        // Spring AI generează automat o instrucțiune JSON Schema uriașă în spate
        String formatInstructions = converter.getFormat();

        String prompt = "Ești un asistent de extragere a datelor din CV-uri. " +
                "Mai jos ai un text extras brut dintr-un fișier PDF. " +
                "Analizează-l cu atenție și extrage informațiile, populând structura de date cerută. " +
                "Dacă o anumită informație lipsește din text, lasă câmpul respectiv cu valoarea null sau array gol.\n\n" +
                "Reguli stricte de formatare: {format}\n\n" +
                "Textul CV-ului:\n{text}";

        String response = this.chatClient.prompt()
                .user(u -> u.text(prompt)
                        .param("format", formatInstructions)
                        .param("text", rawText))
                .call()
                .content();

        // Convertim automat răspunsul JSON de la AI direct în obiect Java!
        return converter.convert(response);
    }
}
