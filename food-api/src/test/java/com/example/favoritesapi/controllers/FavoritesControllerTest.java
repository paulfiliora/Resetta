package com.example.favoritesapi.controllers;

import com.example.favoritesapi.models.Favorite;
import com.example.favoritesapi.repositories.FavoriteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(FavoritesController.class)
public class FavoritesControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private FavoriteRepository mockFavoriteRepository;

	@Autowired
	private ObjectMapper jsonObjectMapper;

	private Favorite newFavorite;
	private Favorite updatedSecondFavorite;

	@Before
	public void setUp() {

		Favorite firstFavorite = new Favorite(
			"favorite1",
			"f1image",
			"f1api",
				"1"
		);

		Favorite secondFavorite = new Favorite(
			"favorite2",
			"f2image",
			"f2api",
				"1"
		);

		List<Favorite> mockFavorites =
			Stream.of(firstFavorite, secondFavorite).collect(Collectors.toList());

		given(mockFavoriteRepository.findAll()).willReturn(mockFavorites);

		given(mockFavoriteRepository.findOne(1L)).willReturn(firstFavorite);
		given(mockFavoriteRepository.findOne(4L)).willReturn(null);

		newFavorite = new Favorite(
			"new_favorite_for_create",
			"new_fav_image",
			"new_fav_api",
				"1"
		);
		given(mockFavoriteRepository.save(newFavorite)).willReturn(newFavorite);

		updatedSecondFavorite = new Favorite(
			"updated_favorite",
			"updated_fav_image",
			"updated_fav_api",
				"1"
		);
		given(mockFavoriteRepository.save(updatedSecondFavorite)).willReturn(updatedSecondFavorite);

		// Mock out Delete to return EmptyResultDataAccessException for missing user with ID of 4
		doAnswer(methodCall -> {
			throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
		}).when(mockFavoriteRepository).delete(4L);

	}

	@Test
	public void findAllFavorites_success_returnsStatusOK() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(status().isOk());
	}

	@Test
	public void findAllUsers_success_returnAllFavoritesAsJSON() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$", hasSize(2)));
	}

	@Test
	public void findAllUsers_success_returnLabelForEachFavorite() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$[0].label", is("favorite1")));
	}

	@Test
	public void findAllUsers_success_returnImageUrlForEachFavorite() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$[0].image_url", is("f1image")));
	}

	@Test
	public void findAllFavorites_success_returnApiUriForEachFavorite() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$[0].api_uri", is("f1api")));
	}

	@Test
	public void findFavoriteById_success_returnsStatusOK() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(status().isOk());
	}

	@Test
	public void findFavoriteById_success_returnLabel() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(jsonPath("$.label", is("favorite1")));
	}

	@Test
	public void findFavoriteById_success_returnImageUrl() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(jsonPath("$.image_url", is("f1image")));
	}

	@Test
	public void findFavoriteById_success_returnApiUri() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(jsonPath("$.api_uri", is("f1api")));
	}

	@Test
	public void findFavoriteById_failure_userNotFoundReturns404() throws Exception {

		this.mockMvc
			.perform(get("/4"))
			.andExpect(status().isNotFound());
	}

	@Test
	public void findFavoriteById_failure_favoriteNotFoundReturnsNotFoundErrorMessage() throws Exception {

		this.mockMvc
			.perform(get("/4"))
			.andExpect(status().reason(containsString("Favorite with ID of 4 was not found!")));
	}

	@Test
	public void deleteFavoriteById_success_returnsStatusOk() throws Exception {

		this.mockMvc
			.perform(delete("/1"))
			.andExpect(status().isOk());
	}

	@Test
	public void deleteFavoriteById_success_deletesViaRepository() throws Exception {

		this.mockMvc.perform(delete("/1"));

		verify(mockFavoriteRepository, times(1)).delete(1L);
	}

	@Test
	public void deleteFavoriteById_failure_userNotFoundReturns404() throws Exception {

		this.mockMvc
			.perform(delete("/4"))
			.andExpect(status().isNotFound());
	}

	@Test
	public void createFavorite_success_returnsStatusOk() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFavorite))
			)
			.andExpect(status().isOk());
	}

	@Test
	public void createFavorite_success_returnsLabel() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFavorite))
			)
			.andExpect(jsonPath("$.label", is("new_favorite_for_create")));
	}

	@Test
	public void createFavorite_success_returnsImageUrl() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFavorite))
			)
			.andExpect(jsonPath("$.image_url", is("new_fav_image")));
	}

	@Test
	public void createFavorite_success_returnsApiUri() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFavorite))
			)
			.andExpect(jsonPath("$.api_uri", is("new_fav_api")));
	}


	@Test
	public void updateFavoriteById_success_returnsStatusOk() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFavorite))
			)
			.andExpect(status().isOk());
	}

	@Test
	public void updateFavoriteById_success_returnsUpdatedLabel() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFavorite))
			)
			.andExpect(jsonPath("$.label", is("updated_favorite")));
	}

	@Test
	public void updateFavoriteById_success_returnsUpdatedImageUrl() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFavorite))
			)
			.andExpect(jsonPath("$.image_url", is("updated_fav_image")));
	}

	@Test
	public void updateFavoriteById_success_returnsUpdatedApiUrl() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFavorite))
			)
			.andExpect(jsonPath("$.api_uri", is("updated_fav_api")));
	}

	@Test
	public void updateFavoriteById_failure_favoriteNotFoundReturns404() throws Exception {

		this.mockMvc
			.perform(
				patch("/4")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFavorite))
			)
			.andExpect(status().isNotFound());
	}

	@Test
	public void updateFavoriteById_failure_favoriteNotFoundReturnsNotFoundErrorMessage() throws Exception {

		this.mockMvc
			.perform(
				patch("/4")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFavorite))
			)
			.andExpect(status().reason(containsString("Favorite with ID of 4 was not found!")));
	}

}
