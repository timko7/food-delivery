package model.types;

public enum OrderStatus {

	PROCESSING, IN_PREPARATION, WAITING_DELIVERY, IN_TRANSPORT, DELIVERED, CANCELED;

	public static OrderStatus parsreString(String value) {
		switch (value.toUpperCase()) {
		case "PROCESSING":
			return PROCESSING;
		case "IN_PREPARATION":
			return IN_PREPARATION;
		case "WAITING_DELIVERY":
			return WAITING_DELIVERY;
		case "IN_TRANSPORT":
			return IN_TRANSPORT;
		case "DELIVERED":
			return DELIVERED;
		case "CANCELED":
			return CANCELED;
		default:
			return null;
		}
	}

}
