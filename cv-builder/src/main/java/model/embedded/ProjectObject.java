package model.embedded;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectObject {

    private String title;
    private List<String> descriptions;

    private List<String> skillsUsed;


    private LocalDate startDate;
    private LocalDate finishDate;
}
