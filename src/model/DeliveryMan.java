package model;

import java.util.ArrayList;

import model.types.Gender;
import model.types.UserType;

public class DeliveryMan {

	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private UserType userType;
	private String dateOfBirth; // yyyy-mm-dd
	private boolean blocked; // true-blocked

	private ArrayList<String> ordersToDeliver = new ArrayList<>();

	public DeliveryMan() {

	}

	public DeliveryMan(String username, String password, String name, String surname, Gender gender, UserType userType,
			String dateOfBirth, boolean blocked, ArrayList<String> ordersToDeliver) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.userType = userType;
		this.dateOfBirth = dateOfBirth;
		this.blocked = blocked;
		this.ordersToDeliver = ordersToDeliver;
	}

	public DeliveryMan makeFromUser(User user) {
		DeliveryMan deliveryMan = new DeliveryMan();
		deliveryMan.setUsername(user.getUsername());
		deliveryMan.setPassword(user.getPassword());
		deliveryMan.setName(user.getName());
		deliveryMan.setSurname(user.getSurname());
		deliveryMan.setGender(user.getGender());
		deliveryMan.setUserType(user.getUserType());
		deliveryMan.setDateOfBirth(user.getDateOfBirth());
		deliveryMan.setBlocked(user.isBlocked());

		deliveryMan.setOrdersToDeliver(new ArrayList<>());

		return deliveryMan;
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

	public ArrayList<String> getOrdersToDeliver() {
		return ordersToDeliver;
	}

	public void setOrdersToDeliver(ArrayList<String> ordersToDeliver) {
		this.ordersToDeliver = ordersToDeliver;
	}

	@Override
	public String toString() {
		return "DeliveryMan [username=" + username + ", password=" + password + ", name=" + name + ", surname="
				+ surname + ", gender=" + gender + ", userType=" + userType + ", dateOfBirth=" + dateOfBirth
				+ ", blocked=" + blocked + ", ordersToDeliver=" + ordersToDeliver + "]";
	}

}
