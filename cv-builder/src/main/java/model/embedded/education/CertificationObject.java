package model.embedded.education;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CertificationObject {

    private String certificationName;
    private String description;
    private List<String> skillsAcquired;
}
