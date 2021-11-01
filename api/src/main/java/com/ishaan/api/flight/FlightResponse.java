package com.ishaan.api.flight;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FlightResponse implements Serializable {
    @JsonProperty("data")
    private List<FlightData> data;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FlightData {
        @JsonProperty("departure")
        private FlightDeparture departure;

        @JsonProperty("arrival")
        private FlightDeparture arrival;

        @JsonProperty("flight")
        private FlightInfo flight;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FlightDeparture {
        @JsonProperty("iata")
        private String iata;

        @JsonProperty("scheduled")
        private String scheduled;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public  static class FlightInfo {
        @JsonProperty("iata")
        private String iata;
    }
}
