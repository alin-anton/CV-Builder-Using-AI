package com.example.cvbuilder.service;
import com.example.cvbuilder.model.CvModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class AiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public AiService(ChatClient.Builder chatClientBuilder, ObjectMapper objectMapper){
        this.chatClient = chatClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String generateHtmlCvDesign(CvModel cvModel) {
        try {
            // Transformăm datele din BD într-un String JSON pentru a le trimite la AI
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

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Eroare la procesarea datelor CV-ului pentru AI", e);
        }
    }

}
