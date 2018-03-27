package com.example.favoritesapi.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "FAVORITES")
public class Favorite {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "LABEL")
	private String label;

	@Column(name = "IMAGE_URL")
	private String image_url;

	@Column(name = "API_URI")
	private String api_uri;

	@Column(name = "USER_ID")
	private String user_id;

	public Favorite(String label, String image_url, String api_uri, String user_id) {
		this.label = label;
		this.image_url = image_url;
		this.api_uri = api_uri;
		this.user_id = user_id;
	}
}
