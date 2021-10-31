package com.ishaan.api.controllers;

import com.ishaan.api.config.RestService;
import com.ishaan.api.countries.TripCountry;
import com.ishaan.api.entities.TravellerEntity;
import com.ishaan.api.entities.TripEntity;
import com.ishaan.api.entities.UserEntity;
import com.ishaan.api.repositories.TravellerRepository;
import com.ishaan.api.repositories.TripRepository;
import com.ishaan.api.repositories.UserRepository;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.JAXBException;
import java.util.*;
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
    private TravellerRepository travellerRepository;
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
    public ResponseEntity<?> handleCreateTrip(@RequestBody CreateBodyWrapper wrapper, HttpServletRequest request) {
//        TripEntity tripEntity = TripEntity.builder().travelDate(body.getDate()).
//                travelDestination(body.getDestination().getLabel())
//                .travelOrigin("United States of America")
//                .travelMethod(body.getTravelMethod().value.equals("AIR") ? TripEntity.TravelMethod.AIR : TripEntity.TravelMethod.ROAD)
//                .build();
//        List<TravellerEntity> travellerEntities = body.getTravellers().stream().map(traveller -> {
//            String travellerName = traveller.getFirstName() +
//                    " " +
//                    traveller.getLastName();
//            return TravellerEntity.builder().age(traveller.getAge()).isVaccinated(traveller.isVaccinated())
//                    .name(travellerName).parentTrip(tripEntity).build();
//        }).collect(Collectors.toList());
//        tripRepository.save(tripEntity);
//        travellerRepository.saveAll(travellerEntities);
        Optional<UserEntity> foundUser = userRepository.findByEmail((String) request.getAttribute("email"));
        if(foundUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User node does not exist");
        }

        CreateTripBody body = wrapper.getBody();
        List<Boolean> vaxList = wrapper.getVaxList();
        TripEntity newTrip = TripEntity.builder().travelDate(body.getDate()).travelDestination(body.getDestination().getLabel())
                .travelOrigin("United States of America")
                .travelMethod(body.getTravelMethod().value.equals("AIR") ? TripEntity.TravelMethod.AIR : TripEntity.TravelMethod.ROAD)
                .user(foundUser.get())
                .build();
        List<TravellerEntity> travellerEntities = new ArrayList<>();
        for(int i = 0; i < body.getTravellers().size(); i++) {
            CreateTripBody.CreateTripTraveller traveller = body.getTravellers().get(i);
            String nameBuilder = traveller.getFirstName() +
                    " " +
                    traveller.getLastName();
            TravellerEntity travellerEntity = TravellerEntity.builder().age(traveller.getAge())
                    .isVaccinated(vaxList.get(i)).name(nameBuilder).parentTrip(newTrip).build();
            travellerEntities.add(travellerEntity);
        }
        tripRepository.save(newTrip);
        travellerRepository.saveAll(travellerEntities);
        return ResponseEntity.ok(Collections.singletonMap("createdTrip", newTrip));
    }

    @GetMapping("/countries")
    public ResponseEntity<?> handleGetDestinationCountries() throws JAXBException {
        List<TripCountry> countries = restService.getCountryData();
        return ResponseEntity.ok(Collections.singletonMap("countries", countries.stream().map(country -> {
            String[] tokens = country.getTitle().split(" ");
            StringBuilder nameBuilder = new StringBuilder();
            int i = 0;
            while (!tokens[i].equals("-")) {
                nameBuilder.append(" ");
                nameBuilder.append(tokens[i++]);
            }
            return nameBuilder.toString();
        }).collect(Collectors.toList())));
    }


    @Data
    private static class CreateBodyWrapper {
        private CreateTripBody body;
        private List<Boolean> vaxList;

        public CreateBodyWrapper() {

        }
    }

    @Data
    private static class CreateTripBody {
        private String origin;
        private CreateTripDestination destination;
        private long date;
        private CreateTripTravelMethod travelMethod;
        private List<CreateTripTraveller> travellers;

        public CreateTripBody() {
        }

        @Data
        private static class CreateTripDestination {
            private String value, label;

            public CreateTripDestination() {
            }
        }

        @Data
        private static class CreateTripTravelMethod {
            private String value, label;

            public CreateTripTravelMethod() {
            }
        }

        @Data
        private static class CreateTripTraveller {
            private String firstName, lastName;
            private int age;
            private boolean isVaccinated;

            public CreateTripTraveller() {
            }
        }
    }

}
