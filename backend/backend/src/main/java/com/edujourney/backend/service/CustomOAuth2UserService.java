package com.edujourney.backend.service;

import com.edujourney.backend.model.User;
import com.edujourney.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Extract user details from the OAuth2User object
        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            throw new OAuth2AuthenticationException("No email from Google");
        }
        String name = oAuth2User.getAttribute("name");

        // Check if the user exists in the database
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            // If not, create and save a new user
            user = new User();
            user.setEmail(email);
            user.setUsername(name); // You can adjust this if needed
            // For OAuth2, you might not have a password, so handle accordingly
            userRepository.save(user);
        }
        
        // Return the OAuth2User (or wrap it as needed)
        return oAuth2User;
    }
}
