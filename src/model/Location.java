package model;

public class Location {

	private String longitude;
	private String latitude;
	private String street;
	private String number;
	private String place;
	private String postalCode;
	private String address;

	public Location() {
	}

	public Location(String longitude, String latitude, String street, String number, String place, String postalCode) {
		this.longitude = longitude;
		this.latitude = latitude;
		this.street = street;
		this.number = number;
		this.place = place;
		this.postalCode = postalCode;
		this.address = street + number + ", " + place + ", " + postalCode;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Location [longitude=" + longitude + ", latitude=" + latitude + ", street=" + street + ", number="
				+ number + ", place=" + place + ", postalCode=" + postalCode + ", address=" + address + "]";
	}

}
