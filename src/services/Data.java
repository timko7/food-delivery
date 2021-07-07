package services;

import javax.servlet.ServletContext;

import model.collection.Buyers;
import model.collection.DeliveryMans;
import model.collection.Managers;
import model.collection.Orders;
import model.collection.Restaurants;
import model.collection.Users;

public class Data {

	public static Users getUsers(ServletContext sCtx) {
		Users users = (Users) sCtx.getAttribute("users");

		if (users == null) {
			users = new Users();
			sCtx.setAttribute("users", users);
		}

		return users;
	}

	public static Buyers getBuyers(ServletContext sCtx) {
		Buyers buyers = (Buyers) sCtx.getAttribute("buyers");

		if (buyers == null) {
			buyers = new Buyers();
			sCtx.setAttribute("buyers", buyers);
		}

		return buyers;
	}

	public static Managers getManagers(ServletContext sCtx) {
		Managers managers = (Managers) sCtx.getAttribute("managers");

		if (managers == null) {
			managers = new Managers();
			sCtx.setAttribute("managers", managers);
		}

		return managers;
	}

	public static DeliveryMans getDeliveryMans(ServletContext sCtx) {
		DeliveryMans deliveryMans = (DeliveryMans) sCtx.getAttribute("deliveryMans");

		if (deliveryMans == null) {
			deliveryMans = new DeliveryMans();
			sCtx.setAttribute("deliveryMans", deliveryMans);
		}

		return deliveryMans;
	}

	public static Restaurants getRestaurants(ServletContext sCtx) {
		Restaurants restaurants = (Restaurants) sCtx.getAttribute("restaurants");

		if (restaurants == null) {
			restaurants = new Restaurants();
			sCtx.setAttribute("restaurants", restaurants);
		}
		return restaurants;
	}
	
	public static Orders getOrders(ServletContext sCtx) {
		Orders orders = (Orders) sCtx.getAttribute("orders");

		if (orders == null) {
			orders = new Orders();
			sCtx.setAttribute("orders", orders);
		}
		return orders;
	}
}
