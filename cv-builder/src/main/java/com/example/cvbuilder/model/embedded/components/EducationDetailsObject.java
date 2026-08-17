package com.example.cvbuilder.model.embedded.components;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.cvbuilder.model.embedded.education.CertificationObject;
import com.example.cvbuilder.model.embedded.education.EducationObject;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EducationDetailsObject {

    private List<EducationObject> educationalInstitutions;
    private List<CertificationObject> certifications;
}
