package com.example.favoritesapi.controllers;

import com.example.favoritesapi.models.Favorite;
import com.example.favoritesapi.repositories.FavoriteRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class FavoritesController {

	@Autowired
	private FavoriteRepository favoriteRepository;

	@GetMapping("/")
	public List<Favorite> findAllFavorites() {
		return favoriteRepository.findAll();
	}

	@GetMapping("/{favoriteId}")
	public Favorite findFavoriteById(@PathVariable Long favoriteId) throws NotFoundException {

		Favorite foundFavorite = favoriteRepository.findOne(favoriteId);

		if (foundFavorite == null) {
			throw new NotFoundException("Favorite with ID of " + favoriteId + " was not found!");
		}

		return foundFavorite;
	}

	@PostMapping("/")
	public Favorite createNewFavorite(@RequestBody Favorite newFavorite) {
		return favoriteRepository.save(newFavorite);
	}

	@DeleteMapping("/{favoriteId}")
	public HttpStatus deleteFavoriteById(@PathVariable Long favoriteId) throws EmptyResultDataAccessException {

		favoriteRepository.delete(favoriteId);
		return HttpStatus.OK;
	}

	@PatchMapping("/{favoriteId}")
	public Favorite updateFavoriteById(@PathVariable Long favoriteId, @RequestBody Favorite favoriteRequest) throws NotFoundException {
		Favorite favoriteFromDb = favoriteRepository.findOne(favoriteId);

		if (favoriteFromDb == null) {
			throw new NotFoundException("Favorite with ID of " + favoriteId + " was not found!");
		}

		favoriteFromDb.setLabel(favoriteRequest.getLabel());
		favoriteFromDb.setImage_url(favoriteRequest.getImage_url());
		favoriteFromDb.setApi_uri(favoriteRequest.getApi_uri());
		favoriteFromDb.setUser_id(favoriteRequest.getUser_id());

		return favoriteRepository.save(favoriteFromDb);
	}

	// EXCEPTION HANDLERS

	@ExceptionHandler
	void handleUserNotFound(
		NotFoundException exception,
		HttpServletResponse response) throws IOException {

		response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
	}

	@ExceptionHandler
	void handleDeleteNotFoundException(
		EmptyResultDataAccessException exception,
		HttpServletResponse response) throws IOException {

		response.sendError(HttpStatus.NOT_FOUND.value());
	}
}
