package model.collection;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.Buyer;

public class Buyers {

	public static String filePath = "C:\\webProjekat-workspace\\food-delivery\\WebContent\\data\\buyers.json";

	private HashMap<String, Buyer> buyers;

	public Buyers() {
		this(filePath);
	}

	public Buyers(String path) {
		buyers = new HashMap<>();
		loadBuyers(path);
	}

	public void saveBuyers() {
		System.out.println("Usao u save Buyers..");
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
			System.out.println("U save buyers: " + buyers);
			String buyersToString = objectMapper.writeValueAsString(buyers);
			fileWriter.write(buyersToString);
			System.out.println("buyersssss.... " + buyersToString);
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
	public void loadBuyers(String contextPath) {
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
			MapType type = factory.constructMapType(HashMap.class, String.class, Buyer.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			buyers = (HashMap<String, Buyer>) objectMapper.readValue(file, type);
		} catch (FileNotFoundException fnf) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String buyersToString = objectMapper.writeValueAsString(buyers);
				fileWriter.write(buyersToString);
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
		System.out.println("LOADED BUYERS: " + buyers);
	}

	public HashMap<String, Buyer> getBuyers() {
		return buyers;
	}

	public void setBuyers(HashMap<String, Buyer> buyers) {
		this.buyers = buyers;
	}

	public Buyer containsUsername(String username) {
		for (Buyer buyer : buyers.values()) {
			if (buyer.getUsername().equals(username)) {
				return buyer;
			}
		}
		return null;
	}

}
