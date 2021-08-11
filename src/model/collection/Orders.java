package model.collection;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.Order;
import model.types.OrderStatus;

public class Orders {

	public static String filePath = "C:\\webProjekat-workspace\\food-delivery\\WebContent\\res\\orders.json";

	private HashMap<String, Order> orders;

	public Orders() {
		this(filePath);
	}

	public Orders(String path) {
		orders = new HashMap<>();
		loadOrders(path);
	}

	public void saveOrders() {
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
			String ordersToString = objectMapper.writeValueAsString(orders);
			fileWriter.write(ordersToString);
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
	public void loadOrders(String contextPath) {
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
			MapType type = factory.constructMapType(HashMap.class, String.class, Order.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			orders = (HashMap<String, Order>) objectMapper.readValue(file, type);
		} catch (FileNotFoundException fnf) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String ordersToString = objectMapper.writeValueAsString(orders);
				fileWriter.write(ordersToString);
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
	}

	public HashMap<String, Order> getOrders() {
		return orders;
	}

	public void setOrders(HashMap<String, Order> orders) {
		this.orders = orders;
	}

	public String getUniqueIdOrder() {
		String sTemp = getRandomString();
		
		if (orders.values().isEmpty()) {
			return sTemp;
		}

		for (Order order : orders.values()) {
			if (!order.getId().equals(sTemp)) {
				return sTemp;
			}
		}

		return getUniqueIdOrder();
	}

	private String getRandomString() {
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

		StringBuilder sb = new StringBuilder(10);
		sb.append("P");

		for (int i = 1; i < 10; i++) {
			int index = (int) (AlphaNumericString.length() * Math.random());
			sb.append(AlphaNumericString.charAt(index));
		}

		return sb.toString();
	}
	
	public Order containsById(String id) {
		for (Order order : orders.values()) {
			if (order.getId().equals(id)) {
				return order;
			}
		}
		return null;
	}

	public ArrayList<Order> getOrdersByRestaurantName(String restaurantName) {
		ArrayList<Order> ret = new ArrayList<>();
		for (Order order : orders.values()) {
			if(order.getRestaurantName().equals(restaurantName)) {
				ret.add(order);
			}
		}
		return ret;
	}

	public ArrayList<Order> getOrdersForDelivery() {
		ArrayList<Order> ret = new ArrayList<>();
		for (Order order : orders.values()) {
			if(order.getOrderStatus().equals(OrderStatus.WAITING_DELIVERY)) {
				ret.add(order);
			}
		}
		return ret;
	}

	public ArrayList<Order> getOrdersByArrayIDs(ArrayList<String> ordersIDs) {
		ArrayList<Order> ret = new ArrayList<>();
		for (String orderID : ordersIDs) {
			for (Order order : orders.values()) {
				if (orderID.equals(order.getId())) {
					ret.add(order);
				}
			}
		}
		return ret;
	}

}
