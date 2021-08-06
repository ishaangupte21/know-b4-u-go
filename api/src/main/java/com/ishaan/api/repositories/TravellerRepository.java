package com.ishaan.api.repositories;

import com.ishaan.api.entities.TravellerEntity;
import org.springframework.data.repository.CrudRepository;

public interface TravellerRepository extends CrudRepository<TravellerEntity, Integer> {
}
