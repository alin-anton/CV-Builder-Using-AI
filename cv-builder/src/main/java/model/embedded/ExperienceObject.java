package model.embedded;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExperienceObject {

    private String experienceTitle;
    private String location;
    private List<String> descriptions;
    private List<String> skillsAcquired;
    private LocalDate startDate;
    private LocalDate finishDate;

}
