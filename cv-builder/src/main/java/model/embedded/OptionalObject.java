package model.embedded;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OptionalObject {

    private String category;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate finishDate;
}
