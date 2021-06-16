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

import model.DeliveryMan;

public class DeliveryMans {

	public static String filePath = "C:\\webProjekat-workspace\\food-delivery\\WebContent\\res\\deliveryMans.json";

	private HashMap<String, DeliveryMan> deliveryMans;

	public DeliveryMans() {
		this(filePath);
	}

	public DeliveryMans(String path) {
		deliveryMans = new HashMap<>();
		loadDeliveryMans(path);
	}

	public void saveDeliveryMans() {
		System.out.println("Usao u save DeliveryMans..");
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
			String deliveryMansToString = objectMapper.writeValueAsString(deliveryMans);
			fileWriter.write(deliveryMansToString);
			System.out.println("deliveryMansssss.... " + deliveryMansToString);
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
	public void loadDeliveryMans(String contextPath) {
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
			MapType type = factory.constructMapType(HashMap.class, String.class, DeliveryMan.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			deliveryMans = (HashMap<String, DeliveryMan>) objectMapper.readValue(file, type);
		} catch (FileNotFoundException fnf) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String deliveryMansToString = objectMapper.writeValueAsString(deliveryMans);
				fileWriter.write(deliveryMansToString);
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
		System.out.println("LOADED DeliveryMans: " + deliveryMans);
	}

	public HashMap<String, DeliveryMan> getDeliveryMans() {
		return deliveryMans;
	}

	public void setDeliveryMans(HashMap<String, DeliveryMan> deliveryMans) {
		this.deliveryMans = deliveryMans;
	}

	public DeliveryMan containsUsername(String username) {
		for (DeliveryMan deliveryMan : deliveryMans.values()) {
			if (deliveryMan.getUsername().equals(username)) {
				return deliveryMan;
			}
		}
		return null;
	}

}
