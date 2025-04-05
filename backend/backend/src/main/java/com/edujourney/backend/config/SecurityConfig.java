package com.edujourney.backend.config;

import com.edujourney.backend.service.CustomUserDetailsService;
// import com.edujourney.backend.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // For traditional username/password authentication
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    
    // // For OAuth2 login (e.g., Google)
    // @Autowired
    // private CustomOAuth2UserService customOAuth2UserService;
    
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    // Configure our authentication provider to load user details from our database
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    // Build the AuthenticationManager using our custom authentication provider
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                   .authenticationProvider(authenticationProvider())
                   .build();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        // Attach our custom AuthenticationManager so that our REST login endpoint is used
        http.authenticationManager(authManager);
        
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Permit access to signup, login, and logout endpoints
                .requestMatchers("/api/auth/signup", "/api/auth/login", "/logout").permitAll()
                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            // Disable default form login so that your custom REST login endpoint is used
            .formLogin(form -> form.disable())
            // Enable HTTP Basic authentication
            .httpBasic(Customizer.withDefaults())
            // Always create a session for every request (so that the client gets a session cookie)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
            )
            // Configure logout explicitly: use /logout as the URL and permit all
            .logout(logout -> logout
                .logoutUrl("/logout")
                .permitAll()
            );
            
        return http.build();
    }
}
