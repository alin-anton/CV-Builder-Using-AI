package com.example.cvbuilder.service.implementation;

import com.example.cvbuilder.model.CvModel;
import com.example.cvbuilder.repository.CvRepository;
import com.example.cvbuilder.service.CvService;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

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
    public CvModel getById(String id) {
        return cvRepository.findById(id).orElseThrow(() -> new RuntimeException("Nu exista CV-ul cu id-ul" + id));
    }

    @Override
    public List<CvModel> getByEmail(String email) {
        return cvRepository.findByPersonalDetailsEmail(email);
    }

    @Override
    public CvModel addCv(CvModel cv) {
        return cvRepository.save(cv);
    }

    @Override
    public CvModel updateCv(CvModel cvNou, String id) {
        cvNou.setId(id);
        return cvRepository.save(cvNou);
    }

    @Override
    public void deleteCv(String id) {
        cvRepository.deleteById(id);
    }

    @Override
    public String generatePdf(CvModel cv) {

        String prompt = String.format(
                "Scrie un rezumat profesional scurt (max 3 propoziții) pentru un CV. Funcția vizată este: %s. Numele candidatului: %s %s.",
                cv.getJobName(), cv.getPersonalDetails().getFirstName(), cv.getPersonalDetails().getLastName()
        );

        String aiSummary = chatClient.prompt().user(prompt).call().content();

        // 2. Maparea datelor în Thymeleaf
        Context context = new Context();
        context.setVariable("cv", cv);
        context.setVariable("aiSummary", aiSummary);
        String htmlContent = templateEngine.process("cv-template", context);

        // 3. Conversia HTML-ului în PDF
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(htmlContent, "http://localhost:8080/");
            builder.toStream(os);
            builder.run();

            // 4. Returnarea PDF-ului ca Base64 pentru a fi citit direct de React
            String base64Pdf = Base64.getEncoder().encodeToString(os.toByteArray());
            return "data:application/pdf;base64," + base64Pdf;
        } catch (Exception e) {
            throw new RuntimeException("Eroare la generarea PDF-ului", e);
        }
    }
}