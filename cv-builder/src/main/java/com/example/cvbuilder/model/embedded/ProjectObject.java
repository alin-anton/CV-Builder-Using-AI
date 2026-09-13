package com.example.cvbuilder.model.embedded;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectObject {
    private String title;
    private List<String> descriptions;
    private List<String> skillsUsed;

    // Schimbat din LocalDate în String
    private String startDate;
    private String finishDate;
}