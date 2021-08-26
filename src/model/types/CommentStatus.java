package model.types;

public enum CommentStatus {

	SENT, REJECTED, ACCEPTED;

	public static CommentStatus parsreString(String value) {
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
