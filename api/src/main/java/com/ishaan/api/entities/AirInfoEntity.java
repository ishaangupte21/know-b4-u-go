package com.ishaan.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "air_info")
public class AirInfoEntity {
    @Id @Getter @GeneratedValue(strategy = GenerationType.IDENTITY) private int id;

    @Getter
    @Setter
    private String depTime, arrTime, flCode, depCode, arrCode;

    @Getter
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "trip_id", nullable = false)
    private TripEntity trip;

    public AirInfoEntity() {

    }

    @Builder

    public AirInfoEntity(String depTime, String arrTime, String flCode, String depCode, String arrCode, TripEntity trip) {
        this.depTime = depTime;
        this.arrTime = arrTime;
        this.flCode = flCode;
        this.depCode = depCode;
        this.arrCode = arrCode;
        this.trip = trip;
    }
}
