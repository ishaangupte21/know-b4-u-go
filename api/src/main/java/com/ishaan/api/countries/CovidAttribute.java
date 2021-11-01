package com.ishaan.api.countries;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CovidAttribute implements Serializable {
    @JsonProperty("Country_Region")
    private String name;

    @JsonProperty("Deaths")
    private int deaths;

    @JsonProperty("Confirmed")
    private int confirmedCases;

    @JsonProperty("Mortality_Rate")
    private double mortalityRate;

}
