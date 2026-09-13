package com.example.cvbuilder.model.embedded;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OptionalObject {

    private String category;
    private String title;
    private String description;
    private String startDate;
    private String finishDate;
}
