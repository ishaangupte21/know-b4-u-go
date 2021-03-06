package com.ishaan.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "trips")
public class TripEntity {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter
    @Setter
    private String travelOrigin, travelDestination;

    @Getter
    @Setter
    @Column(columnDefinition = "BIGINT")
    private long travelDate;

    @Getter
    @Setter
    @Enumerated(EnumType.ORDINAL)
    private TravelMethod travelMethod;

//    Add travel origin and destination

    @Getter
    @Setter
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parentTrip")
    private List<TravellerEntity> travellers;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserEntity user;

    @Getter
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "trip")
    private AirInfoEntity airInfo;

    @Builder
    public TripEntity(String travelOrigin, String travelDestination, long travelDate, TravelMethod travelMethod, UserEntity user) {
        this.travelOrigin = travelOrigin;
        this.travelDestination = travelDestination;
        this.travelDate = travelDate;
        this.travelMethod = travelMethod;
        this.user = user;
    }

    public TripEntity() {
//        empty constructor
    }

    public enum TravelMethod {
        AIR,
        ROAD
    }
}
