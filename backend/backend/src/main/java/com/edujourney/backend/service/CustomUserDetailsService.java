package com.edujourney.backend.service;

import com.edujourney.backend.model.User;
import com.edujourney.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // First, try to find the user by username; if not found, try email.
        Optional<User> userOpt = userRepository.findByUsername(usernameOrEmail);
        if (!userOpt.isPresent()) {
            userOpt = userRepository.findByEmail(usernameOrEmail);
        }
        if (!userOpt.isPresent()) {
            throw new UsernameNotFoundException("User not found: " + usernameOrEmail);
        }
        User user = userOpt.get();

        // Create a UserDetails object from your User model.
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),  // You can also use user.getEmail() if desired.
                user.getPassword(),  // Must be hashed if using BCrypt.
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
