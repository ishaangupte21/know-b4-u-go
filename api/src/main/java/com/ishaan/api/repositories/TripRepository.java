package com.ishaan.api.repositories;

import com.ishaan.api.entities.TripEntity;
import org.springframework.data.repository.CrudRepository;

public interface TripRepository extends CrudRepository<TripEntity, Integer> {
}
