package model;

import java.util.ArrayList;

import model.types.Gender;
import model.types.UserType;

public class Buyer {

	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private UserType userType;
	private String dateOfBirth; // yyyy-mm-dd
	private boolean blocked; // true-blocked

	private double points;
	private TypeBuyer typeBuyer;
	private ArrayList<Order> orders = new ArrayList<>();
	private Cart cart;

	public Buyer() {

	}

	public Buyer(String username, String password, String name, String surname, Gender gender, UserType userType,
			String dateOfBirth, boolean blocked, double points, TypeBuyer typeBuyer, ArrayList<Order> orders, Cart cart) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.userType = userType;
		this.dateOfBirth = dateOfBirth;
		this.blocked = blocked;
		this.points = points;
		this.typeBuyer = typeBuyer;
		this.orders = orders;
		this.cart = cart;
	}

	public Buyer makeFromUser(User user) {
		Buyer buyer = new Buyer();
		buyer.setUsername(user.getUsername());
		buyer.setPassword(user.getPassword());
		buyer.setName(user.getName());
		buyer.setSurname(user.getSurname());
		buyer.setGender(user.getGender());
		buyer.setUserType(user.getUserType());
		buyer.setDateOfBirth(user.getDateOfBirth());
		buyer.setBlocked(user.isBlocked());

		buyer.setPoints(0);

		buyer.setOrders(new ArrayList<>());

		return buyer;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public TypeBuyer getTypeBuyer() {
		return typeBuyer;
	}

	public void setTypeBuyer(TypeBuyer typeBuyer) {
		this.typeBuyer = typeBuyer;
	}

	public ArrayList<Order> getOrders() {
		return orders;
	}

	public void setOrders(ArrayList<Order> orders) {
		this.orders = orders;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	@Override
	public String toString() {
		return "Buyer [username=" + username + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", gender=" + gender + ", userType=" + userType + ", dateOfBirth=" + dateOfBirth + ", blocked="
				+ blocked + ", points=" + points + ", typeBuyer=" + typeBuyer + ", orders=" + orders + ", cart=" + cart
				+ "]";
	}
	
	public Order containsOrder(String orderId) {
		for (Order order : orders) {
			if (order.getId().equals(orderId)) {
				return order;
			}
		}
		return null;
	}
	

}
