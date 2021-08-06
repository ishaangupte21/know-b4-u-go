package com.ishaan.api.controllers;

import com.ishaan.api.entities.UserEntity;
import com.ishaan.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/trips")
@CrossOrigin
public class TripController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> handleGetTrips(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Optional<UserEntity> userEntityOptional = userRepository.findByEmail(email);
        if (userEntityOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("msg", "No user with email"));
        }
        return ResponseEntity.ok(Collections.singletonMap("trips", userEntityOptional.get().getTrips()));
    }
}
