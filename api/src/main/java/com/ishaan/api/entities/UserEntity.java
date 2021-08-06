package com.ishaan.api.entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter
    @Setter
    private String firstName, lastName, email;

    @Getter
    @Setter
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private List<TripEntity> trips;

    public UserEntity() {
//        empty constructor
    }

    @Builder
    public UserEntity(String firstName, String lastName, String email, List<TripEntity> trips) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.trips = trips;
    }
}
