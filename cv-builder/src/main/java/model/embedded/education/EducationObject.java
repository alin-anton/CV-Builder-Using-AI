package model.embedded.education;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EducationObject {

    private String institutionName;
    private String educationLevel;
    private String startYear;
    private String finishYear;
}
