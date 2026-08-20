package com.example.cvbuilder.service;

import com.example.cvbuilder.model.CvModel;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.Document;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] convertHtmlToPdf(String htmlContent) {
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();

            // Setăm modul fast pentru randare
            builder.useFastMode();
            // Inserăm HTML-ul generat de OpenAI
            builder.withHtmlContent(htmlContent, null);
            // Definim output-ul
            builder.toStream(os);
            // Rulăm conversia
            builder.run();

            return os.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Eroare la conversia HTML in PDF", e);
        }
    }


}
