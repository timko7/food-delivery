package model.types;

public enum RequestStatus {
	
	SENT, REJECTED, ACCEPTED;
	
	public static RequestStatus parsreString(String value) {
		switch (value.toUpperCase()) {
		case "SENT":
			return SENT;
		case "REJECTED":
			return REJECTED;
		case "ACCEPTED":
			return ACCEPTED;
		default:
			return null;
		}
	}
}
