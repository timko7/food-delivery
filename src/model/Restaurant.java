package model;

import java.util.ArrayList;

public class Restaurant {

	private String name;
	private String type;
	private boolean open; // true - open, false - not
	private String logo; // putanja gde se cuva slika..
	private double averageRating;
	private String managerUsername;

	private ArrayList<Item> items = new ArrayList<>();
	private ArrayList<Comment> comments = new ArrayList<>();
	private Location location = new Location();
	private boolean deleted;

	public Restaurant() {
	}

	public Restaurant(String name, String type, boolean open, String logo, double averageRating, String managerUsername,
			ArrayList<Item> items, ArrayList<Comment> comments, Location location, boolean deleted) {
		super();
		this.name = name;
		this.type = type;
		this.open = open;
		this.logo = logo;
		this.averageRating = averageRating;
		this.managerUsername = managerUsername;
		this.items = items;
		this.comments = comments;
		this.location = location;
		this.deleted = deleted;
	}

	public Restaurant(String name, String type, String logo, Location location, String managerUsername) {
		super();
		this.name = name;
		this.type = type;
		this.logo = logo;
		this.location = location;
		this.managerUsername = managerUsername;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isOpen() {
		return open;
	}

	public void setOpen(boolean open) {
		this.open = open;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public double getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}

	public ArrayList<Item> getItems() {
		return items;
	}

	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}

	public ArrayList<Comment> getComments() {
		return comments;
	}

	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "Restaurant [name=" + name + ", type=" + type + ", open=" + open + ", logo=" + logo + ", averageRating="
				+ averageRating + ", items=" + items + ", comments=" + comments + ", location=" + location
				+ ", deleted=" + deleted + "]";
	}

	public String getManagerUsername() {
		return managerUsername;
	}

	public void setManagerUsername(String managerUsername) {
		this.managerUsername = managerUsername;
	}

	public Item containsItem(String itemName) {
		for (Item item : items) {
			if (item.getName().equals(itemName)) {
				return item;
			}
		}
		return null;
	}

}
