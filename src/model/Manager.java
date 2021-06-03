package model;

import model.types.Gender;
import model.types.UserType;

public class Manager {

	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private UserType userType;
	private String dateOfBirth; // yyyy-mm-dd
	private boolean blocked; // true-blocked

	private String restaurant;
	private boolean inCharge; // true-in charge

	public Manager() {

	}

	public Manager(String username, String password, String name, String surname, Gender gender, UserType userType,
			String dateOfBirth, boolean blocked, String restaurant, boolean inCharge) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.userType = userType;
		this.dateOfBirth = dateOfBirth;
		this.blocked = blocked;
		this.restaurant = restaurant;
		this.inCharge = inCharge;
	}

	public Manager makeFromUser(User user) {
		Manager manager = new Manager();
		manager.setUsername(user.getUsername());
		manager.setPassword(user.getPassword());
		manager.setName(user.getName());
		manager.setSurname(user.getSurname());
		manager.setGender(user.getGender());
		manager.setUserType(user.getUserType());
		manager.setDateOfBirth(user.getDateOfBirth());
		manager.setBlocked(user.isBlocked());

		manager.setRestaurant("");
		manager.setInCharge(false);

		return manager;
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

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public boolean isInCharge() {
		return inCharge;
	}

	public void setInCharge(boolean inCharge) {
		this.inCharge = inCharge;
	}

	@Override
	public String toString() {
		return "Manager [username=" + username + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", gender=" + gender + ", userType=" + userType + ", dateOfBirth=" + dateOfBirth + ", blocked="
				+ blocked + ", restaurant=" + restaurant + ", inCharge=" + inCharge + "]";
	}

}
