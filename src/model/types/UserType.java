package model.types;

public enum UserType {

	ADMIN, MANAGER, BUYER, DELIVERY_MAN;

	public static UserType parseString(String value) {
		switch (value.toUpperCase()) {
		case "ADMIN":
			return ADMIN;
		case "MANAGER":
			return MANAGER;
		case "BUYER":
			return BUYER;
		case "DELIVERY_MAN":
			return DELIVERY_MAN;
		default:
			return null;
		}
	}

}
