package com.example.favoritesapi.repositories;

import com.example.favoritesapi.models.Favorite;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

	List<Favorite> findAll();

}