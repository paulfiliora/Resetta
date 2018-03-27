package com.example.favoritesapi.repositories;

import com.example.favoritesapi.models.Favorite;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FavoriteRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private FavoriteRepository favoriteRepository;

	@Before
	public void setUp() {
		Favorite firstFavorite = new Favorite(
			"favorite",
			"some image_url",
			"some api_url"
		);

		Favorite secondFavorite = new Favorite(
			"second_favorite",
			"some other image_url",
			"some other api_url"
		);

		entityManager.persist(firstFavorite);
		entityManager.persist(secondFavorite);
		entityManager.flush();
	}

	@Test
	public void findAll_returnsAllFavorites() {
		List<Favorite> favoritesFromDb = favoriteRepository.findAll();

		assertThat(favoritesFromDb.size(), is(2));
	}

	@Test
	public void findAll_returnsLabel() {
		List<Favorite> favoritesFromDb = favoriteRepository.findAll();
		String secondFavoritesLabel = favoritesFromDb.get(1).getLabel();

		assertThat(secondFavoritesLabel, is("second_favorite"));
	}

	@Test
	public void findAll_returnsImage_Url() {
		List<Favorite> favoritesFromDb = favoriteRepository.findAll();
		String secondFavoritesImage_Url = favoritesFromDb.get(1).getImage_url();

		assertThat(secondFavoritesImage_Url, is("some other image_url"));
	}

	@Test
	public void findAll_returnsApi_Url() {
		List<Favorite> favoritesFromDb = favoriteRepository.findAll();
		String secondFavoritesApi_Url = favoritesFromDb.get(1).getApi_url();

		assertThat(secondFavoritesApi_Url, is("some other api_url"));
	}

}
