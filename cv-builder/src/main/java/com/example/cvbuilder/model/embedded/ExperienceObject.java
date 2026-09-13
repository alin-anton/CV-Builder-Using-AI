package com.example.cvbuilder.model.embedded;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExperienceObject {

    private String experienceTitle;
    private String location;
    private List<String> descriptions;

    @JsonProperty("skillsAquired")
    private List<String> skillsAquired;

    // Asigură compatibilitatea atât pentru skillsAquired cât și pentru skillsAcquired
    public List<String> getSkillsAcquired() {
        return skillsAquired;
    }

    public void setSkillsAcquired(List<String> skillsAcquired) {
        this.skillsAquired = skillsAcquired;
    }

    private String startDate;
    private String finishDate;

}
