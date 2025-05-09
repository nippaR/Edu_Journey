// src/main/java/com/edujourney/backend/config/WebMvcConfig.java
package com.edujourney.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.nio.file.Paths;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Maps /uploads/** URLs to files in the local uploads/ folder
        String absolutePath = Paths.get("uploads").toFile().getAbsolutePath() + "/";
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + absolutePath);
    }
}