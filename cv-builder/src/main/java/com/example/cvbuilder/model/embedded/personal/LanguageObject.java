package com.example.cvbuilder.model.embedded.personal;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LanguageObject {

    private String languageName;

    @Min(value = 1, message = "Nivelul minim este 1!")
    @Max(value = 5, message = "Nivelul maxim este 5!")
    private Integer languageLevel;
}
