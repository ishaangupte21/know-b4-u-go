package com.ishaan.api.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ishaan.api.config.RestService;
import com.ishaan.api.countries.CovidCountry;
import com.ishaan.api.countries.TripCountry;
import com.ishaan.api.countries.TripCountryCategory;
import com.ishaan.api.entities.AirInfoEntity;
import com.ishaan.api.entities.TravellerEntity;
import com.ishaan.api.entities.TripEntity;
import com.ishaan.api.entities.UserEntity;
import com.ishaan.api.flight.FlightResponse;
import com.ishaan.api.repositories.AirInfoRepository;
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
import java.io.IOException;
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
    private AirInfoRepository airInfoRepository;
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

    @GetMapping("/get/{id}")
    public ResponseEntity<?> handleGetSingleTrip(@PathVariable("id") String id) {
        Optional<TripEntity> optionalTrip = tripRepository.findById(Integer.parseInt(id));
        if (optionalTrip.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip Not Found");
        }

        return ResponseEntity.ok(Collections.singletonMap("trip", optionalTrip.get()));
    }

    @PostMapping("/create")
    public ResponseEntity<?> handleCreateTrip(@RequestBody CreateBodyWrapper wrapper, HttpServletRequest request) {
        Optional<UserEntity> foundUser = userRepository.findByEmail((String) request.getAttribute("email"));
        if (foundUser.isEmpty()) {
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
        for (int i = 0; i < body.getTravellers().size(); i++) {
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
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("createdTrip", newTrip));
    }

    @GetMapping("/covid/{id}")
    public ResponseEntity<?> handleGetSingleCovidData(@PathVariable("id") String id) throws JsonProcessingException {
        Optional<TripEntity> optionalTrip = tripRepository.findById(Integer.parseInt(id));
        if (optionalTrip.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip Not Found");
        }
        TripEntity currentEntity = optionalTrip.get();
        String destination = currentEntity.getTravelDestination();
        List<CovidCountry> covidCountries = restService.getCountryCovidData();
        CovidCountry currentCountry = null;
        for (CovidCountry cc : covidCountries) {
            if (cc.getAttributes().getName().toLowerCase().equals(destination.toLowerCase())) {
                currentCountry = cc;
                break;
            }
        }

        return ResponseEntity.ok(Collections.singletonMap("covidData",
                Map.of("name", currentCountry.getAttributes().getName(),
                        "deaths", currentCountry.getAttributes().getDeaths(),
                        "confirmed", currentCountry.getAttributes().getConfirmedCases(),
                            "mortalityRate", currentCountry.getAttributes().getMortalityRate())));

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

    @GetMapping("/precaution/{id}")
    public ResponseEntity<?> handleGetPrecaution(@PathVariable("id") String id) throws JAXBException {
        Optional<TripEntity> optionalTrip = tripRepository.findById(Integer.parseInt(id));
        if (optionalTrip.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip Not Found");
        }
        TripEntity currentEntity = optionalTrip.get();
        String destination = currentEntity.getTravelDestination();
        List<TripCountry> countries = restService.getCountryData();
        TripCountry currentCountry = null;
        for (TripCountry tc : countries) {
            if (tc.getTitle().startsWith(destination)) {
                currentCountry = tc;
                break;
            }
        }

        TripCountryCategory countryCategory = null;
        for (TripCountryCategory cat : currentCountry.getCategories()) {
            if (cat.getDomain().equals("Threat-Level")) {
                countryCategory = cat;
                break;
            }
        }

        return ResponseEntity.ok(Collections.singletonMap("precaution", countryCategory.getValue()));
    }

    @GetMapping("/covid/all")
    public ResponseEntity<?> getAllCovidData() throws JsonProcessingException {
        return ResponseEntity.ok(Collections.singletonMap("countries", restService.getCountryCovidData()));
    }

    @PostMapping("/aircraft/{id}")
    public ResponseEntity<?> handleAddAircraft(@PathVariable("id") String id, @RequestBody Map<String, Object> body) throws IOException {
        Optional<TripEntity> optionalTrip = tripRepository.findById(Integer.parseInt(id));
        if (optionalTrip.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip Not Found");
        }
        TripEntity currentEntity = optionalTrip.get();
        String flightCode = (String) body.get("flightCode");
        FlightResponse flightResponse = restService.getFlightResponse(flightCode);
        FlightResponse.FlightData data = flightResponse.getData().get(0);

        AirInfoEntity airInfoEntity = AirInfoEntity.builder().arrCode(data.getArrival().getIata())
                .depCode(data.getDeparture().getIata())
                .flCode(data.getFlight().getIata()).trip(currentEntity)
                .depTime(data.getDeparture().getScheduled().split("T")[1])
                .arrTime(data.getDeparture().getScheduled().split("T")[1])
                .build();
        airInfoRepository.save(airInfoEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("airInfo", airInfoEntity));
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
