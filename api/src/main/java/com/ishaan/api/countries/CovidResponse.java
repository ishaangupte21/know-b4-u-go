package com.ishaan.api.countries;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CovidResponse implements Serializable {
    private List<CovidCountry> features;
}
