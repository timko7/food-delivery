package model;

import model.types.CommentStatus;

public class Comment {
	private String time; //za id po vremenu
	private String buyerUsername;
	private String text;
	private double rating;
	private CommentStatus commentStatus;

	public Comment() {
	}

	public Comment(String time, String buyerUsername, String text, double rating, CommentStatus commentStatus) {
		super();
		this.time = time;
		this.buyerUsername = buyerUsername;
		this.text = text;
		this.rating = rating;
		this.commentStatus = commentStatus;
	}
	
	

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getBuyerUsername() {
		return buyerUsername;
	}

	public void setBuyerUsername(String buyerUsername) {
		this.buyerUsername = buyerUsername;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public CommentStatus getCommentStatus() {
		return commentStatus;
	}

	public void setCommentStatus(CommentStatus commentStatus) {
		this.commentStatus = commentStatus;
	}

	@Override
	public String toString() {
		return "Comment [time=" + time + ", buyerUsername=" + buyerUsername + ", text=" + text + ", rating=" + rating
				+ ", commentStatus=" + commentStatus + "]";
	}

}
