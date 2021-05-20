package model.types;

public enum Gender {

	MALE, FEMALE;

	public static Gender parseString(String value) {
		switch (value.toUpperCase()) {
		case "MALE":
			return MALE;
		case "FEMALE":
			return FEMALE;
		default:
			return null;
		}
	}

}
