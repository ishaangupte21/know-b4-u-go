package com.ishaan.api.controllers;

import com.ishaan.api.config.RestService;
import com.ishaan.api.countries.TripCountry;
import com.ishaan.api.entities.TripEntity;
import com.ishaan.api.entities.UserEntity;
import com.ishaan.api.repositories.TripRepository;
import com.ishaan.api.repositories.UserRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.JAXBException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/trips")
@CrossOrigin
public class TripController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private RestService restService;

    @GetMapping
    public ResponseEntity<?> handleGetTrips(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Optional<UserEntity> userEntityOptional = userRepository.findByEmail(email);
        if (userEntityOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("msg", "No user with email"));
        return ResponseEntity.ok(Collections.singletonMap("trips", userEntityOptional.get().getTrips()));
    }

    @PostMapping("/create")
    public ResponseEntity<?> handleCreateTrips(@RequestBody CreateRequestBody body, HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        Optional<UserEntity> userEntityOptional = userRepository.findByEmail(email);
        if (userEntityOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("msg", "No user with email"));
        TripEntity newTrip = TripEntity.builder().travelOrigin(body.getOrigin()).travelDestination(body.getDestination())
                .travelDate(body.getDate()).travelMethod(body.getTravelMethod())
                .user(userEntityOptional.get()).build();
        tripRepository.save(newTrip);
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("createdTrip", newTrip));
    }

    @GetMapping("/countries")
    public ResponseEntity<?> handleGetDestinationCountries() throws JAXBException {
        List<TripCountry> countries = restService.getCountryData();
        return ResponseEntity.ok(Collections.singletonMap("countries", countries.stream().map(country -> {
           String[] tokens = country.getTitle().split(" ");
           StringBuilder nameBuilder = new StringBuilder();
           int i = 0;
           while(!tokens[i].equals("-")){
               nameBuilder.append(" ");
               nameBuilder.append(tokens[i++]);
           }
           return nameBuilder.toString();
        }).collect(Collectors.toList())));
    }


    private static class CreateRequestBody {
        @Getter
        @Setter
        private String origin, destination;

        @Getter
        @Setter
        private long date;

        @Getter
        @Setter
        private TripEntity.TravelMethod travelMethod;

        public CreateRequestBody() {
        }

        @Builder
        public CreateRequestBody(String origin, String destination, long date, TripEntity.TravelMethod travelMethod) {
            this.origin = origin;
            this.destination = destination;
            this.date = date;
            this.travelMethod = travelMethod;
        }
    }
}
