package com.ishaan.api.security;

import com.ishaan.api.entities.UserEntity;
import com.ishaan.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        the Email Address will be the "username"
        Optional<UserEntity> userEntityOptional = userRepository.findByEmail(username);
        if (userEntityOptional.isEmpty()) {
            throw new UsernameNotFoundException("No user with this email");
        }
        UserEntity userEntity = userEntityOptional.get();
        return new User(userEntity.getEmail(), "", Collections.emptyList());
    }
}
