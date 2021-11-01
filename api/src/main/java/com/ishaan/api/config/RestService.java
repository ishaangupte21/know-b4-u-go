package com.ishaan.api.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParser;
import com.ishaan.api.countries.CountryResponse;
import com.ishaan.api.countries.CovidCountry;
import com.ishaan.api.countries.CovidResponse;
import com.ishaan.api.countries.TripCountry;
import com.ishaan.api.flight.FlightResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.io.StringReader;
import java.util.Collections;
import java.util.List;

@Service
@CacheConfig(cacheNames = {"TripData"})
public class RestService {
    private final RestTemplate restTemplate;

    @Value("${flight.key}")
    private String flightKey;

    public RestService(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    @Cacheable(key = "#root.methodName")
    public List<TripCountry> getCountryData() throws JAXBException {
        String xmlData = restTemplate.getForObject("https://travel.state.gov/_res/rss/TAsTWs.xml", String.class);
        JAXBContext jaxbContext = JAXBContext.newInstance(CountryResponse.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        StringReader reader = new StringReader(xmlData);
        CountryResponse countryResponse = (CountryResponse) unmarshaller.unmarshal(reader);
        return countryResponse.getChannel().getCountries();
    }
    @Cacheable(key="#root.methodName")
    public List<CovidCountry> getCountryCovidData() throws JsonProcessingException {
        String jsonData = restTemplate.getForObject("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1=1&outFields=Country_Region,Confirmed,Deaths,Incident_Rate,Mortality_Rate&outSR=4326&f=json", String.class);
        System.out.println(jsonData);
        CovidResponse covidResponse = new ObjectMapper().readValue(jsonData, CovidResponse.class);
        System.out.println(covidResponse);
        return covidResponse.getFeatures();
    }

    public FlightResponse getFlightResponse(String flightNumber) throws IOException {
        String[] numTokens = flightNumber.split(" ");
        String jsonData = restTemplate.getForObject(String.format("http://api.aviationstack.com/v1/flights?access_key=%s&flight_number=%s&airline_iata=%s", flightKey, numTokens[1], numTokens[0]), String.class);
        return new ObjectMapper().readValue(jsonData, FlightResponse.class);

    }
}
