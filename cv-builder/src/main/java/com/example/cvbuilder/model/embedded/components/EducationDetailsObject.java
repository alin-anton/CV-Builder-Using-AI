package com.example.cvbuilder.model.embedded.components;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.cvbuilder.model.embedded.education.EducationObject;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EducationDetailsObject {

    @JsonProperty("educationalInstutions")
    private List<EducationObject> educationalInstitutions;
}
