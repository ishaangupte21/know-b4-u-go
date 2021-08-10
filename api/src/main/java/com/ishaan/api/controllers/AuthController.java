package com.ishaan.api.controllers;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.ishaan.api.entities.UserEntity;
import com.ishaan.api.repositories.UserRepository;
import com.ishaan.api.security.JwtTokenUtil;
import com.ishaan.api.security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/google")
    public ResponseEntity<?> handleGoogleAuth(@RequestBody Map<String, String> body) throws GeneralSecurityException, IOException {
        String googleToken = body.get("googleToken");
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Arrays.asList("29525540959-40mpq3jpih585otallptkc01u8s936cd.apps.googleusercontent.com",
                        "29525540959-9qv3lo9to97nouo5afoij90u6t81pdje.apps.googleusercontent.com")).build();
        GoogleIdToken idToken = verifier.verify(googleToken);
        if (idToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("msg", "Could not verify Id Token"));
        }
        GoogleIdToken.Payload payload = idToken.getPayload();
        Optional<UserEntity> userEntityEmail = userRepository.findByEmail(payload.getEmail());
        UserDetails tokenDetails;
        if (userEntityEmail.isEmpty()) {
//            create user since it doenst exist
            UserEntity createdUser = UserEntity.builder().email(payload.getEmail())
                    .firstName((String) payload.get("given_name")).lastName((String) payload.get("family_name"))
                    .build();
            userRepository.save(createdUser);
            tokenDetails = new User(createdUser.getEmail(), "", Collections.emptyList());
        } else {
            tokenDetails = jwtUserDetailsService.loadUserByUsername(payload.getEmail());
        }

        String token = jwtTokenUtil.generateToken(tokenDetails);
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @GetMapping("/user")
    public ResponseEntity<?> handleGetUser(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Optional<UserEntity> userEntityOptional = userRepository.findByEmail(email);
        if(userEntityOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("msg", "No user with email"));

        UserEntity userEntity = userEntityOptional.get();
        return ResponseEntity.ok(Collections.singletonMap("user", Map.of("email", userEntity.getEmail(), "firstName", userEntity.getFirstName(), "lastName", userEntity.getLastName())));
    }
}
