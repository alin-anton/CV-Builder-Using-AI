package com.example.cvbuilder.model;


import com.example.cvbuilder.model.embedded.ExperienceObject;
import com.example.cvbuilder.model.embedded.OptionalObject;
import com.example.cvbuilder.model.embedded.ProjectObject;
import com.example.cvbuilder.model.embedded.components.EducationDetailsObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.cvbuilder.model.embedded.components.PersonalDetailsObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "cv")
public class CvModel {

    @Id
    private String id;

    // Proprietarul CV-ului (username-ul utilizatorului autentificat)
    private String userId;

    //Personal details, links and contact
    private PersonalDetailsObject personalDetails;

    //Desired job title
    private String jobName;

    //Projects, skills and summary
    private String summary;
    private List<String> softSkills;
    private List<String> hardSkills;
    private List<ProjectObject> projects;

    //Education
    @JsonProperty("educationDetails")
    private EducationDetailsObject education;

    //Experience
    @JsonProperty("experiences")
    private List<ExperienceObject> experience;

    //Optional sections
    @JsonProperty("optionals")
    private List<OptionalObject> optionalInformation;
}
