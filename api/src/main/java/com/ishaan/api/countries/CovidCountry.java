package com.ishaan.api.countries;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CovidCountry implements Serializable {
   private CovidAttribute attributes;
}
