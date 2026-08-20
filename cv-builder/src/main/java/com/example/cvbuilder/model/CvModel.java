package com.example.cvbuilder.model;


import com.example.cvbuilder.model.embedded.ExperienceObject;
import com.example.cvbuilder.model.embedded.OptionalObject;
import com.example.cvbuilder.model.embedded.ProjectObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.cvbuilder.model.embedded.components.PersonalDetailsObject;
import com.example.cvbuilder.model.embedded.education.EducationObject;
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
    private EducationObject education;

    //Experience
    private List<ExperienceObject> experience;

    //Optional sections
    private List<OptionalObject> optionalInformation;
}
