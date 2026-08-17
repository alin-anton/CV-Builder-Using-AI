package model.embedded.components;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.embedded.personal.LanguageObject;
import model.embedded.personal.LinkObject;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PersonalDetailsObject {

    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String city;
    private List<LanguageObject> languages;
    private List<LinkObject> links;
}
