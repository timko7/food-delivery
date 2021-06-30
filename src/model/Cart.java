package model;

import java.util.ArrayList;

public class Cart {
	private String username;
	private ArrayList<ItemInCart> itemsInCart = new ArrayList<>();
	private int price;

	public Cart() {
	}

	public Cart(String username, int price) {
		super();
		this.username = username;
		this.price = price;
		this.itemsInCart = new ArrayList<>();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public ArrayList<ItemInCart> getItemsInCart() {
		return itemsInCart;
	}

	public void setItemsInCart(ArrayList<ItemInCart> itemsInCart) {
		this.itemsInCart = itemsInCart;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Cart [username=" + username + ", itemsInCart=" + itemsInCart + ", price=" + price + "]";
	}

	public ItemInCart containsItemInCart(String itemInCartName) {
		for (ItemInCart itemInCart : itemsInCart) {
			if (itemInCart.getItem().getName().equals(itemInCartName)) {
				return itemInCart;
			}
		}
		return null;
	}

}
