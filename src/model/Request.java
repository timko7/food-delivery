package model;

import model.types.RequestStatus;

public class Request {
	private String idOrder;
	private String deliveryUsername;
	private RequestStatus requestStatus;

	public Request() {
	}

	public Request(String idOrder, String deliveryUsername, RequestStatus requestStatus) {
		super();
		this.idOrder = idOrder;
		this.deliveryUsername = deliveryUsername;
		this.requestStatus = requestStatus;
	}

	public String getIdOrder() {
		return idOrder;
	}

	public void setIdOrder(String idOrder) {
		this.idOrder = idOrder;
	}

	public String getDeliveryUsername() {
		return deliveryUsername;
	}

	public void setDeliveryUsername(String deliveryUsername) {
		this.deliveryUsername = deliveryUsername;
	}

	public RequestStatus getRequestStatus() {
		return requestStatus;
	}

	public void setRequestStatus(RequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}

	@Override
	public String toString() {
		return "Request [idOrder=" + idOrder + ", deliveryUsername=" + deliveryUsername + ", requestStatus="
				+ requestStatus + "]";
	}

}
