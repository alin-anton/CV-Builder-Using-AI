package com.example.cvbuilder.service.implementation;

import com.example.cvbuilder.model.CvModel;
import com.example.cvbuilder.repository.CvRepository;
import com.example.cvbuilder.service.CvService;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.List;

@Service
public class CvServiceImpl implements CvService {

    private final CvRepository cvRepository;
    private final ChatClient chatClient;
    private final TemplateEngine templateEngine;

    // Injectăm ChatClient.Builder pentru a configura apelurile către OpenAI
    public CvServiceImpl(CvRepository cvRepository, ChatClient.Builder chatClientBuilder, TemplateEngine templateEngine) {
        this.cvRepository = cvRepository;
        this.chatClient = chatClientBuilder.build();
        this.templateEngine = templateEngine;
    }

    @Override
    public CvModel getById(String id, String userId) {
        CvModel cv = cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nu există CV-ul cu id-ul: " + id));
        if (cv.getUserId() != null && !cv.getUserId().equals(userId)) {
            throw new RuntimeException("Acces interzis: Nu aveți permisiunea de a vizualiza acest CV!");
        }
        return cv;
    }

    @Override
    public List<CvModel> getAllByUserId(String userId) {
        return cvRepository.findByUserId(userId);
    }

    @Override
    public List<CvModel> getByEmail(String email) {
        return cvRepository.findByPersonalDetailsEmail(email);
    }

    @Override
    public CvModel addCv(CvModel cv, String userId) {
        cv.setUserId(userId);
        return cvRepository.save(cv);
    }

    @Override
    public CvModel updateCv(CvModel cvNou, String id, String userId) {
        CvModel existingCv = cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nu există CV-ul cu id-ul: " + id));
        if (existingCv.getUserId() != null && !existingCv.getUserId().equals(userId)) {
            throw new RuntimeException("Acces interzis: Nu aveți permisiunea de a modifica acest CV!");
        }
        cvNou.setId(id);
        cvNou.setUserId(userId);
        return cvRepository.save(cvNou);
    }

    @Override
    public void deleteCv(String id, String userId) {
        CvModel existingCv = cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nu există CV-ul cu id-ul: " + id));
        if (existingCv.getUserId() != null && !existingCv.getUserId().equals(userId)) {
            throw new RuntimeException("Acces interzis: Nu aveți permisiunea de a șterge acest CV!");
        }
        cvRepository.deleteById(id);
    }

    @Override
    public CvModel enhanceCvWithAi(CvModel rawCv) {
        BeanOutputConverter<CvModel> converter = new BeanOutputConverter<>(CvModel.class);
        String jsonFormatInstruction = converter.getFormat();

        String rawDataJson = "";
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.findAndRegisterModules();
            rawDataJson = mapper.writeValueAsString(rawCv);
        } catch (Exception e) {
            throw new RuntimeException("Eroare la serializarea datelor brute pentru AI", e);
        }

        String role = (rawCv.getJobName() != null && !rawCv.getJobName().trim().isEmpty())
                ? rawCv.getJobName()
                : "Professional";

        String promptText = String.format(
                "You are an expert IT Recruiter and CV Writer. You will receive raw CV data in Romanian or English for the role of %s. " +
                        "Your task is to enhance it and translate EVERYTHING into professional English.\n" +
                        "STRICT RULES:\n" +
                        "- TRANSLATE ALL CONTENT TO ENGLISH.\n" +
                        "- Keep the personal details (name, contact, links) intact.\n" +
                        "- Write a strong 'summary' (max 3 sentences) in English.\n" +
                        "- ELABORATE 'descriptions' in experiences and projects into professional, result-oriented English sentences.\n" +
                        "- Return EXCLUSIVELY a valid JSON matching the exact schema provided. Do not use markdown blocks (```json) or asterisks.\n\n" +
                        "Raw Data (JSON):\n%s\n\n%s",
                role,
                rawDataJson,
                jsonFormatInstruction
        );

        String aiResponse = chatClient.prompt().user(promptText).call().content();

        if (aiResponse != null) {
            int startIndex = aiResponse.indexOf('{');
            int endIndex = aiResponse.lastIndexOf('}');
            if (startIndex >= 0 && endIndex >= 0 && startIndex < endIndex) {
                aiResponse = aiResponse.substring(startIndex, endIndex + 1);
            }
        }

        CvModel enhancedCv;
        try {
            enhancedCv = converter.convert(aiResponse);
        } catch (Exception e) {
            enhancedCv = rawCv;
        }

        if (enhancedCv == null) {
            enhancedCv = rawCv;
        } else {
            // Păstrăm identificatorii și datele personale intacte
            enhancedCv.setId(rawCv.getId());
            enhancedCv.setUserId(rawCv.getUserId());
            if (enhancedCv.getPersonalDetails() == null) {
                enhancedCv.setPersonalDetails(rawCv.getPersonalDetails());
            }
            if (enhancedCv.getJobName() == null || enhancedCv.getJobName().trim().isEmpty()) {
                enhancedCv.setJobName(rawCv.getJobName());
            }
        }

        return enhancedCv;
    }

    @Override
    public String generatePdf(CvModel cvModel) {
        Context context = new Context();
        context.setVariable("cv", cvModel);
        context.setVariable("aiSummary", cvModel.getSummary());

        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            String htmlContent = templateEngine.process("cv-template", context);

            builder.withHtmlContent(htmlContent, "http://localhost:8080/");
            builder.toStream(os);
            builder.run();

            String base64Pdf = Base64.getEncoder().encodeToString(os.toByteArray());
            return "data:application/pdf;base64," + base64Pdf;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Eroare la generarea PDF-ului: " + (e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName()), e);
        }
    }
}