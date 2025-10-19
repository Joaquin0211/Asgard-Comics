package com.uade.tpo.AsgardComics.controllers.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configuración para servir imágenes estáticas
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/images/", "classpath:/static/images/");
        
        // Configuración para archivos de logs (opcional)
        registry.addResourceHandler("/logs/**")
                .addResourceLocations("file:logs/");
    }
}