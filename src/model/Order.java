package model;

import java.util.ArrayList;

import model.types.OrderStatus;

public class Order {
	private String id;
	private ArrayList<ItemInCart> itemsInCart = new ArrayList<>();
	private String restaurantName;
	private String dateTime; // format: yyyy.MM.dd. HH:mm:ss
	private double price;
	private String nameSurname;
	private Location location = new Location();
	private OrderStatus orderStatus;
	private String usernameDeliveryMan;

	public Order() {
	}

	public Order(String id, ArrayList<ItemInCart> itemsInCart, String restaurantName, String dateTime, int price,
			String nameSurname, Location location, OrderStatus orderStatus, String usernameDeliveryMan) {
		super();
		this.id = id;
		this.itemsInCart = itemsInCart;
		this.restaurantName = restaurantName;
		this.dateTime = dateTime;
		this.price = price;
		this.nameSurname = nameSurname;
		this.location = location;
		this.orderStatus = orderStatus;
		this.usernameDeliveryMan = usernameDeliveryMan;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ArrayList<ItemInCart> getItemsInCart() {
		return itemsInCart;
	}

	public void setItemsInCart(ArrayList<ItemInCart> itemsInCart) {
		this.itemsInCart = itemsInCart;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getNameSurname() {
		return nameSurname;
	}

	public void setNameSurname(String nameSurname) {
		this.nameSurname = nameSurname;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getUsernameDeliveryMan() {
		return usernameDeliveryMan;
	}

	public void setUsernameDeliveryMan(String usernameDeliveryMan) {
		this.usernameDeliveryMan = usernameDeliveryMan;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", itemsInCart=" + itemsInCart + ", restaurantName=" + restaurantName + ", dateTime="
				+ dateTime + ", price=" + price + ", nameSurname=" + nameSurname + ", location=" + location
				+ ", orderStatus=" + orderStatus + ", usernameDeliveryMan=" + usernameDeliveryMan + "]";
	}

}
