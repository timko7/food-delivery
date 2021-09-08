package model.collection;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.Request;
import model.Restaurant;

public class Restaurants {

	public static String filePath = "C:\\webProjekat-workspace\\food-delivery\\WebContent\\res\\restaurants.json";

	private HashMap<String, Restaurant> restaurants;

	public Restaurants() {
		this(filePath);
	}

	public Restaurants(String path) {
		restaurants = new HashMap<>();
		loadRestaurants(path);
	}

	public void saveRestaurants() {
		System.out.println("Usao u save Restaurants..");
		File file = new File(filePath);
		try {
			file.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}

		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(file);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			// Through the configure method we can extend the default process to ignore the
			// new fields
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String restaurantsToString = objectMapper.writeValueAsString(restaurants);
			fileWriter.write(restaurantsToString);
			System.out.println("restaurantsssss.... " + restaurantsToString);
			fileWriter.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileWriter != null) {
				try {
					fileWriter.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}

	@SuppressWarnings("unchecked")
	public void loadRestaurants(String contextPath) {
		File file = null;
		FileWriter fileWriter = null;
		BufferedReader in = null;

		try {
			file = new File(contextPath);
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));

			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, Restaurant.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			restaurants = (HashMap<String, Restaurant>) objectMapper.readValue(file, type);
		} catch (FileNotFoundException fnf) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String restaurantsToString = objectMapper.writeValueAsString(restaurants);
				fileWriter.write(restaurantsToString);
			} catch (IOException ioe) {
				ioe.printStackTrace();
			} finally {
				if (fileWriter != null) {
					try {
						fileWriter.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		System.out.println("LOADED RESTAURANTS: " + restaurants);
	}

	public HashMap<String, Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(HashMap<String, Restaurant> restaurants) {
		this.restaurants = restaurants;
	}

	public Restaurant containsName(String name) {
		for (Restaurant restaurant : restaurants.values()) {
			if (restaurant.getName().equals(name)) {
				return restaurant;
			}
		}
		return null;
	}

	public ArrayList<Restaurant> sortOpenFirst() {
		ArrayList<Restaurant> ret = new ArrayList<>();
		for (Restaurant restaurant : restaurants.values()) {
			ret.add(restaurant);
		}
		ret.sort(Comparator.comparing(Restaurant::isOpen));
		Collections.reverse(ret);
		
		return ret;
	}

	public ArrayList<Request> getRequestsByUsername(String username) {
		ArrayList<Request> ret = new ArrayList<>();
		for (Restaurant restaurant : restaurants.values()) {
			for (Request request : restaurant.getRequests()) {
				if (username.equals(request.getDeliveryUsername())) {
					ret.add(request);
				}
			}
		}
		return ret;
	}

	public ArrayList<String> getTypes() {
		ArrayList<String> ret = new ArrayList<>();
		for (Restaurant restaurant : restaurants.values()) {
			if (!ret.contains(restaurant.getType())) {
				ret.add(restaurant.getType());
			}
		}
		return ret;
	}

}
