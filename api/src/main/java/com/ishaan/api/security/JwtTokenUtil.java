package com.ishaan.api.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;

import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    private static final String JWT_ISSUER = "app_contest";

    @Value("${jwt.secret}")
    private String secret;

    public String getEmailFromToken(String token) {
        DecodedJWT decodedToken = decodeToken(token);
        return decodedToken.getSubject();
    }

    public Date getExpirationFromToken(String token) {
        DecodedJWT decodedJWT = decodeToken(token);
        return decodedJWT.getExpiresAt();
    }

    public boolean isTokenExpired(String token) {
        Date expiration = getExpirationFromToken(token);
        return expiration.before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getEmailFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    DecodedJWT decodeToken(String token) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(getAlgorithm()).withIssuer(JWT_ISSUER)
                .build();
        return verifier.verify(token);
    }

    Algorithm getAlgorithm() {
        return Algorithm.HMAC512(secret);
    }

    public String generateToken(UserDetails userDetails) {
        return JWT.create().withIssuer(JWT_ISSUER).withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + (JWT_TOKEN_VALIDITY * 1000)))
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .sign(getAlgorithm());
    }
}
