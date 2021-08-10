package com.ishaan.api.config;

import com.ishaan.api.countries.CountryResponse;
import com.ishaan.api.countries.TripCountry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.util.List;

@Service
@CacheConfig(cacheNames = {"TripData"})
public class RestService {
    private final RestTemplate restTemplate;

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
}
