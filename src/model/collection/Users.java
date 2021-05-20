package model.collection;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.User;
import model.types.Gender;
import model.types.UserType;

public class Users {

	public static String filePath = "C:\\webProjekat-workspace\\food-delivery\\WebContent\\data\\users.json";

	private HashMap<String, User> users;

	public Users() {
		this(filePath);

	}

	public Users(String usersPath) {
		users = new HashMap<>();
		// testData();
		loadUsers(usersPath);
		// saveUsers();
	}

	private void testData() {

		User a1 = new User("admin", "admin", "Aca", "Acic", Gender.MALE, UserType.ADMIN, "2002-5-15", false);
		User a2 = new User("ad", "admin", "Pera", "Percic", Gender.MALE, UserType.ADMIN, "2000-2-20", false);
		User a3 = new User("adminko", "admin", "Aja", "Ajacic", Gender.FEMALE, UserType.ADMIN, "1999-11-23", false);

		users.put(a1.getUsername(), a1);
		users.put(a2.getUsername(), a2);
		users.put(a3.getUsername(), a3);
	}

	public void saveUsers() {
		File file = new File(filePath);
		System.out.println("saveUsers() -> Putanja za cuvanje:" + filePath);
		try {
			file.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}

		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(file);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, false);
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			// Through the configure method we can extend the default process to ignore the
			// new fields
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String usersToString = objectMapper.writeValueAsString(users);
			fileWriter.write(usersToString);
			System.out.println("userssss.... " + usersToString);
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
	public void loadUsers(String contextPath) {
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
			MapType type = factory.constructMapType(HashMap.class, String.class, User.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			users = (HashMap<String, User>) objectMapper.readValue(file, type);
		} catch (FileNotFoundException fnf) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String usersToString = objectMapper.writeValueAsString(users);
				fileWriter.write(usersToString);
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
		System.out.println("loadUsers() -> Putanja za cuvanje:" + filePath);
		System.out.println("LOADED USERS: " + users);
	}

	public HashMap<String, User> getUsers() {
		return users;
	}

	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}

	public User checkLogin(User userToCheck) {
		for (User user : users.values()) {
			if (user.getUsername().equals(userToCheck.getUsername())
					&& user.getPassword().equals(userToCheck.getPassword())) {
				return user;
			}
		}
		return null;
	}

}
