package com.example.cvbuilder;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.ai.openai.api-key=test-key",
        "spring.ai.openai.chat.model=gpt-4o-mini"
})
class CvBuilderApplicationTests {

    @Test
    void contextLoads() {
    }

}
