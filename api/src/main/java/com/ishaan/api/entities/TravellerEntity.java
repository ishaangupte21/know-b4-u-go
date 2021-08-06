package com.ishaan.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "travellers")
public class TravellerEntity {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private int age;

    @Getter
    @Setter
    private boolean isVaccinated;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trip_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private TripEntity parentTrip;

    @Builder
    public TravellerEntity(String name, int age, boolean isVaccinated, TripEntity parentTrip) {
        this.name = name;
        this.age = age;
        this.isVaccinated = isVaccinated;
        this.parentTrip = parentTrip;
    }

    public TravellerEntity() {
//        empty constructor
    }
}
