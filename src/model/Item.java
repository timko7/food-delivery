package model;

public class Item {

	private String name;
	private double price;
	private String type;
	private String restaurantName;
	private String quantity;
	private String description;
	private String image; // putanja gde se cuva slika..

	private boolean deleted;

	public Item() {
	}

	public Item(String name, double price, String type, String restaurantName, String quantity, String description,
			String image, boolean deleted) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantName = restaurantName;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
		this.deleted = deleted;
	}

	public Item(String name, double price, String type, String restaurantName, String quantity, String description) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantName = restaurantName;
		this.quantity = quantity;
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Item [name=" + name + ", price=" + price + ", type=" + type + ", restaurantName=" + restaurantName
				+ ", quantity=" + quantity + ", description=" + description + ", image=" + image + ", deleted="
				+ deleted + "]";
	}

}
