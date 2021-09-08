package services;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import common.Consts;
import model.Buyer;
import model.Cart;
import model.Comment;
import model.DeliveryMan;
import model.Item;
import model.ItemInCart;
import model.Manager;
import model.Order;
import model.Request;
import model.Restaurant;
import model.TypeBuyer;
import model.User;
import model.collection.Buyers;
import model.collection.DeliveryMans;
import model.collection.Managers;
import model.collection.Orders;
import model.collection.Restaurants;
import model.collection.Users;
import model.types.CommentStatus;
import model.types.OrderStatus;
import model.types.RequestStatus;
import model.types.UserType;
import utils.ImageWriter;

@Path("/data")
public class DataService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext servletContext;

	@GET
	@Path("/testic")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		System.out.println("syoprint: Hello from: 'data/testic'");
		return "Hello from: 'log/testic'";
	}

	@GET
	@Path("/testUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> testUsers() {
		System.out.println("usao y testUsers");
		return Data.getUsers(servletContext).getUsers().values();

	}

	@POST
	@Path("/userEdit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User editUser(User user) {
		Users users = Data.getUsers(servletContext);
		User userToEdit = users.containsUsername(user.getUsername());

		if (userToEdit == null) {
			return user;
		}

		userToEdit.setName(user.getName());
		userToEdit.setSurname(user.getSurname());
		userToEdit.setPassword(user.getPassword());

		users.saveUsers();

		if (userToEdit.getUserType().equals(UserType.BUYER)) {
			Buyers buyers = Data.getBuyers(servletContext);
			Buyer buyer = buyers.containsUsername(user.getUsername());

			buyer.setName(user.getName());
			buyer.setSurname(user.getSurname());
			buyer.setPassword(user.getPassword());

			buyers.saveBuyers();
		}

		if (userToEdit.getUserType().equals(UserType.MANAGER)) {
			Managers managers = Data.getManagers(servletContext);
			Manager manager = managers.containsUsername(user.getUsername());

			manager.setName(user.getName());
			manager.setSurname(user.getSurname());
			manager.setPassword(user.getPassword());

			managers.saveManagers();
		}

		if (userToEdit.getUserType().equals(UserType.DELIVERY_MAN)) {
			DeliveryMans deliveryMans = Data.getDeliveryMans(servletContext);
			DeliveryMan deliveryMan = deliveryMans.containsUsername(user.getUsername());

			deliveryMan.setName(user.getName());
			deliveryMan.setSurname(user.getSurname());
			deliveryMan.setPassword(user.getPassword());

			deliveryMans.saveDeliveryMans();
		}

		return userToEdit;
	}

	@GET
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllUsers() {
		User user = (User) request.getSession().getAttribute("user-info"); // only admin can get all users
		if (user.getUserType() == UserType.ADMIN) {
			return Data.getUsers(servletContext).getUsers().values();
		}
		return new ArrayList<User>();
	}

	@GET
	@Path("/getUsersSortNameA")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsersSortNameA() {
		Users users = Data.getUsers(servletContext);
		ArrayList<User> ret = users.sortNameA();

		System.out.println("Sorted users by name A: " + ret);
		return ret;

	}

	@GET
	@Path("/getUsersSortNameD")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsersSortNameD() {
		Users users = Data.getUsers(servletContext);
		ArrayList<User> ret = users.sortNameD();

		System.out.println("Sorted users by name D: " + ret);
		return ret;

	}

	@GET
	@Path("/getUsersSortSurnameA")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsersSortSurnameA() {
		Users users = Data.getUsers(servletContext);
		ArrayList<User> ret = users.sortSurnameA();

		System.out.println("Sorted users by surname A: " + ret);
		return ret;

	}

	@GET
	@Path("/getUsersSortSurnameD")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsersSortSurnameD() {
		Users users = Data.getUsers(servletContext);
		ArrayList<User> ret = users.sortSurnameD();

		System.out.println("Sorted users by surname D: " + ret);
		return ret;

	}

	@GET
	@Path("/getUsersSortUsernameA")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsersSortUsernameA() {
		Users users = Data.getUsers(servletContext);
		ArrayList<User> ret = users.sortUsernameA();

		System.out.println("Sorted users by username A: " + ret);
		return ret;

	}

	@GET
	@Path("/getUsersSortUsernameD")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsersSortUsernameD() {
		Users users = Data.getUsers(servletContext);
		ArrayList<User> ret = users.sortUsernameD();

		System.out.println("Sorted users by username D: " + ret);
		return ret;

	}

	@POST
	@Path("/addManager")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User addManager(User userM) {
		System.out.println("addManager: " + userM);
		Users users = Data.getUsers(servletContext);
		Managers managers = Data.getManagers(servletContext);

		if (users.getUsers().containsKey(userM.getUsername())) {
			return null;
		} else {
			userM.setUserType(UserType.MANAGER);
			userM.setBlocked(false);

			users.getUsers().put(userM.getUsername(), userM);
			users.saveUsers();

			Manager manager = new Manager();
			manager = manager.makeFromUser(userM);

			managers.getManagers().put(manager.getUsername(), manager);
			managers.saveManagers();

			return userM;
		}
	}
	
	@GET
	@Path("/getBuyer")
	@Produces(MediaType.APPLICATION_JSON)
	public Buyer getBuyer() {
		User user = (User) request.getSession().getAttribute("user-info");
		
		if (user != null) {
			Buyers buyers = Data.getBuyers(servletContext);
			return buyers.containsUsername(user.getUsername());		
		}
		return null;
	}

	@POST
	@Path("/addDeliveryMan")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User addDeliveryMan(User userD) {
		System.out.println("addDeliveryMan: " + userD);
		Users users = Data.getUsers(servletContext);
		DeliveryMans deliveryMans = Data.getDeliveryMans(servletContext);

		if (users.getUsers().containsKey(userD.getUsername())) {
			return null;
		} else {
			userD.setUserType(UserType.DELIVERY_MAN);
			userD.setBlocked(false);

			users.getUsers().put(userD.getUsername(), userD);
			users.saveUsers();

			DeliveryMan deliveryMan = new DeliveryMan();
			deliveryMan = deliveryMan.makeFromUser(userD);

			deliveryMans.getDeliveryMans().put(deliveryMan.getUsername(), deliveryMan);
			deliveryMans.saveDeliveryMans();

			return userD;
		}
	}

	@POST
	@Path("/addRestaurant")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant addRestaurant(Restaurant restaurant) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Managers managers = Data.getManagers(servletContext);
		Manager manager = managers.containsUsername(restaurant.getManagerUsername());

		if (restaurants.containsName(restaurant.getName()) == null && manager != null) {
			restaurant.setDeleted(false);
			restaurant.setOpen(true);
			restaurant.setLogo("logoPath");
			restaurants.getRestaurants().put(restaurant.getName(), restaurant);
			restaurants.saveRestaurants();
			
			manager.setRestaurant(restaurant.getName());
			manager.setInCharge(true);
			managers.saveManagers();
			
			return restaurant;
		}

		return null;
	}

	@POST
	@Path("/addLogoForRestaurant")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant addLogoForRestaurant(@FormDataParam("name") String name,
			@FormDataParam("file") InputStream inputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(name);

		if (restaurant == null) {
			return null;
		} else {			
			String logoLocation = servletContext.getRealPath("") + Consts.restaurantsLogoLocation + "/" + name;
			System.out.println("TEST(addLogoRest..) -> string logoLocation: " + logoLocation);
			ImageWriter.saveImage(logoLocation, inputStream, fileDetail);
			restaurant.setLogo(
					Consts.restaurantsLogoLocation + "/" + restaurant.getName() + "/" + fileDetail.getFileName());
			restaurants.saveRestaurants();
		}

		return restaurant;
	}
	
	@POST
	@Path("/addLogoForRestaurant2")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant addLogoForRestaurant2(@FormDataParam("name") String name,
			@FormDataParam("file") InputStream inputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(name);

		if (restaurant == null) {
			return null;
		} else {			
			String logoLocation2 = Consts.restaurantsLogoLocation2 + "/" + name;
			System.out.println("TEST(addLogoRest..) -> string logoLocation: " + logoLocation2);
			ImageWriter.saveImage(logoLocation2, inputStream, fileDetail);
			restaurant.setLogo(
					Consts.restaurantsLogoLocation + "/" + restaurant.getName() + "/" + fileDetail.getFileName());
			restaurants.saveRestaurants();
		}

		return restaurant;
	}

	
	@GET
	@Path("getAllRestaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getAllRestaurants() {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		return restaurants.getRestaurants().values();
	}
	
	@GET
	@Path("/getRestaurantsOpenFirst")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getRestaurantsOpenFirst() {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		ArrayList<Restaurant> ret = restaurants.sortOpenFirst();
		return ret;
	}
	
	@GET
	@Path("/getRestaurant/{restaurantName}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant getRestaurant(@PathParam("restaurantName") String restaurantName) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		return restaurants.containsName(restaurantName);
	}
	
	@GET
	@Path("/openRestaurant/{restaurantName}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant openRestaurant(@PathParam("restaurantName") String restaurantName) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return null;
		} else {
			restaurant.setOpen(true);
			restaurants.saveRestaurants();
		}
		
		return restaurant;
	}
	
	@GET
	@Path("/closeRestaurant/{restaurantName}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant closeRestaurant(@PathParam("restaurantName") String restaurantName) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return null;
		} else {
			restaurant.setOpen(false);
			restaurants.saveRestaurants();
		}
		
		return restaurant;
	}
	
	@GET
	@Path("/getFreeManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manager> getFreeManagers() {
		Managers managers = Data.getManagers(servletContext);
		
		ArrayList<Manager> freeManagers = new ArrayList<>();
		freeManagers = managers.getFreeManagers();

		return freeManagers;
	}
	
	@GET
	@Path("/getManager/{username}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Manager getManager(@PathParam("username") String username) {
		Managers managers = Data.getManagers(servletContext);
		return managers.containsUsername(username);
	}
	
	// items
	
	@POST
	@Path("/addItem")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Item addItem(Item item) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(item.getRestaurantName());
		
		if (restaurant == null) {
			return null;
		}
		
		if (restaurant.containsItem(item.getName()) == null) {
			item.setDeleted(false);
			item.setImage("imagePath");
			restaurant.getItems().add(item);
			
			restaurants.saveRestaurants();
			return item;
		}
		
		return null;
	}
	
	@POST
	@Path("/addImageItem")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Item addImageItem(@FormDataParam("restaurantName") String restaurantName,
			@FormDataParam("itemName") String itemName,
			@FormDataParam("file") InputStream inputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);

		if (restaurant == null) {
			return null;
		} else {			
			Item item = restaurant.containsItem(itemName);
			if (item == null) {
				return null;
			} else {
				String imageLocation = servletContext.getRealPath("") + Consts.restaurantsLogoLocation + "/" + restaurantName + "/" + itemName;
				System.out.println("TEST(addLogoRest..) -> string logoLocation: " + imageLocation);
				ImageWriter.saveImage(imageLocation, inputStream, fileDetail);
				item.setImage(
						Consts.restaurantsLogoLocation + "/" + restaurant.getName() + "/" + itemName + "/" + fileDetail.getFileName());
				restaurants.saveRestaurants();
				
				return item;
			}
		}
	}
	
	@POST
	@Path("/addImageItem2")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Item addImageItem2(@FormDataParam("restaurantName") String restaurantName,
			@FormDataParam("itemName") String itemName,
			@FormDataParam("file") InputStream inputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);

		if (restaurant == null) {
			return null;
		} else {
			Item item = restaurant.containsItem(itemName);
			if (item == null) {
				return null;
			} else {
				String imageLocation2 = Consts.restaurantsLogoLocation2 + "/" + restaurantName + "/" + itemName;
				System.out.println("TEST(addLogoRest..) -> string logoLocation: " + imageLocation2);
				ImageWriter.saveImage(imageLocation2, inputStream, fileDetail);
				item.setImage(
						Consts.restaurantsLogoLocation + "/" + restaurant.getName() + "/" + itemName + "/" + fileDetail.getFileName());
				restaurants.saveRestaurants();
				
				return item;
			}
		}
	}
	
	@POST
	@Path("/editItem")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Item editItem(Item item) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(item.getRestaurantName());
		
		if (restaurant == null) {
			return null;
		} else {
			Item itemToEdit = restaurant.containsItem(item.getName());
			if (itemToEdit == null) {
				return null;
			} else {
				
				itemToEdit.setPrice(item.getPrice());
				itemToEdit.setType(item.getType());
				itemToEdit.setDescription(item.getDescription());
				itemToEdit.setQuantity(item.getQuantity());
				restaurants.saveRestaurants();
				
				return itemToEdit;
			}
		}
	}
	
	@GET
	@Path("/deleteItem/{restaurantName}/{itemName}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancelReservation(@PathParam("restaurantName") String restaurantName, @PathParam("itemName") String itemName) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);

		if (restaurant == null) {
			return null;
		} else {
			Item itemToDelete = restaurant.containsItem(itemName);
			if (itemToDelete == null) {
				return null;
			} else {
				
				itemToDelete.setDeleted(true);
				restaurants.saveRestaurants();
				
				return Response.ok("OK").build();
			}
		}
	}
	
	
	@POST
	@Path("/addItemInChartToAdd")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addItemInChartToAdd(ItemInCart itemInCartToAdd) {
		User user = (User) request.getSession().getAttribute("user-info");
		if (user == null) {
			return Response.status(400).entity("Buyer not logged in!!").build();
		}
		
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsUsername(user.getUsername());	
		if (buyer == null) {
			return Response.status(400).entity("Buyer not found!!").build();
		}
		
		if (buyer.getCart().getItemsInCart().isEmpty()) {
			buyer.getCart().getItemsInCart().add(itemInCartToAdd);
			buyer.getCart().setPrice(itemInCartToAdd.getQuantity() * itemInCartToAdd.getItem().getPrice());
			buyers.saveBuyers();
			return Response.ok(itemInCartToAdd).build();
		} else {
			String restaurantName = buyer.getCart().getItemsInCart().get(0).getItem().getRestaurantName();
			if (restaurantName.equals(itemInCartToAdd.getItem().getRestaurantName())) {
				if (buyer.getCart().containsItemInCart(itemInCartToAdd.getItem().getName()) != null) {
					return Response.status(Status.BAD_REQUEST).entity("Item is already in cart!").build();
				}
				buyer.getCart().getItemsInCart().add(itemInCartToAdd);
				double priceToAdd = itemInCartToAdd.getQuantity() * itemInCartToAdd.getItem().getPrice();
				double oldPrice = buyer.getCart().getPrice();
				buyer.getCart().setPrice(oldPrice + priceToAdd);
				buyers.saveBuyers();
				return Response.ok(itemInCartToAdd).build();
			}
			else {
				return Response.status(400).entity("Cannot order from different restaurant!!").build();
			}
		}
	}
	
	@PUT
	@Path("/changeItemInCart")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ItemInCart changeItemInCart(ItemInCart itemInCart) {
		User user = (User) request.getSession().getAttribute("user-info");
		if (user == null) {
			return null;
		}
		
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsUsername(user.getUsername());	
		if (buyer == null) {
			return null;
		}
		
		ItemInCart ret = buyer.getCart().containsItemInCart(itemInCart.getItem().getName());

		if (ret != null) {
			double priceWithoutItem = buyer.getCart().getPrice() - ret.getQuantity() * ret.getItem().getPrice();
			ret.setQuantity(itemInCart.getQuantity());
			buyer.getCart().setPrice(priceWithoutItem + itemInCart.getQuantity() * itemInCart.getItem().getPrice());
			buyers.saveBuyers();
		}
		return ret;		
	}
	
	@PUT
	@Path("/deleteItemInCart")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteItemInCart(ItemInCart itemInCart) {
		User user = (User) request.getSession().getAttribute("user-info");
		if (user == null) {
			return Response.status(400).entity("Cannot remove item from cart! \nUser not logged in!").build();
		}
		
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsUsername(user.getUsername());	
		if (buyer == null) {
			return Response.status(400).entity("Cannot remove item from cart! \nCannot find buyer!").build();
		}
		
		ItemInCart toDelete = buyer.getCart().containsItemInCart(itemInCart.getItem().getName());
		
		if (toDelete != null) {
			buyer.getCart().getItemsInCart().remove(toDelete);
			double priceToSet = buyer.getCart().getPrice() - itemInCart.getItem().getPrice() * itemInCart.getQuantity();
			buyer.getCart().setPrice(priceToSet);
			buyers.saveBuyers();
			return Response.ok("Successfully removed from cart!").build();
		} else {
			return Response.status(400).entity("Cannot remove item from cart! \nItem not found!").build();
		}
		
	}
	
	@POST
	@Path("/makeOrder")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response makeOrder(Order orderToAdd) {	//TODO: uradi za popust
		User user = (User) request.getSession().getAttribute("user-info");
		if (user == null) {
			return Response.status(400).entity("Cannot make order! \nUser not logged in!").build();
		}
		
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsUsername(user.getUsername());	
		if (buyer == null) {
			return Response.status(400).entity("Cannot make order! \nCannot find buyer!").build();
		}
		
		Orders orders = Data.getOrders(servletContext);
		String idOrder = orders.getUniqueIdOrder();
		System.out.println(":::ID_ORDER: " + idOrder);
		orderToAdd.setId(idOrder);
		
		LocalDateTime time = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm:ss");
        String timeStr = time.format(formatter);
        
		orderToAdd.setDateTime(timeStr);
		orderToAdd.setOrderStatus(OrderStatus.PROCESSING);
		orderToAdd.setUsernameDeliveryMan("");
		orders.getOrders().put(orderToAdd.getId(), orderToAdd);
		orders.saveOrders();
		
		buyer.getOrders().add(orderToAdd);
		buyer.setCart(new Cart(buyer.getUsername(), 0));
		
		double newPoints = orderToAdd.getPrice() / 1000 * 133;
		double oldPoints = buyer.getPoints();
		buyer.setPoints(newPoints + oldPoints);
		
		if (buyer.getPoints() < 100) {
			buyer.setTypeBuyer(new TypeBuyer("Obican", 0, 100));
		} else if (buyer.getPoints() >= 100 && buyer.getPoints() < 300) {
			buyer.setTypeBuyer(new TypeBuyer("Bronzani", 10, 300));
		} else if (buyer.getPoints() >= 300 && buyer.getPoints() < 500) {
			buyer.setTypeBuyer(new TypeBuyer("Srebrni", 20, 500));
		} else if (buyer.getPoints() >= 500) {
			buyer.setTypeBuyer(new TypeBuyer("Zlatni", 30, 1000));
		}
		
		buyers.saveBuyers();
		
		return Response.ok(orderToAdd).build();		
		
	}
	
	@PUT
	@Path("/cancelOrder")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancelOrder(Order order) {
		
		User user = (User) request.getSession().getAttribute("user-info");
		if (user == null) {
			return Response.status(400).entity("Cannot cancel order! \nUser not logged in!").build();
		}
		
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsUsername(user.getUsername());	
		if (buyer == null) {
			return Response.status(400).entity("Cannot cancel order! \nCannot find buyer!").build();
		}
		
		Order ret = buyer.containsOrder(order.getId());
		if (ret == null) {
			return Response.status(400).entity("Cannot cancel order! \nCannot find order at the buyer!").build();
		}
		
		if (ret != null) {
			Orders orders = Data.getOrders(servletContext);
			Order order2 = orders.containsById(order.getId());
			if (order2 == null) {
				return Response.status(400).entity("Cannot cancel order! \nCannot find order in orders data!").build();
			}
			
			ret.setOrderStatus(OrderStatus.CANCELED);
			double lostPoints = ret.getPrice() / 1000 * 133 * 4;
			double oldPoints = buyer.getPoints();
			buyer.setPoints(oldPoints - lostPoints);
			if (buyer.getPoints() < 100) {
				buyer.setTypeBuyer(new TypeBuyer("Obican", 0, 100));
			} else if (buyer.getPoints() >= 100 && buyer.getPoints() < 300) {
				buyer.setTypeBuyer(new TypeBuyer("Bronzani", 10, 300));
			} else if (buyer.getPoints() >= 300 && buyer.getPoints() < 500) {
				buyer.setTypeBuyer(new TypeBuyer("Srebrni", 20, 500));
			} else if (buyer.getPoints() >= 500) {
				buyer.setTypeBuyer(new TypeBuyer("Zlatni", 30, 1000));
			}
			
			buyers.saveBuyers();
			
			order2.setOrderStatus(OrderStatus.CANCELED);
			orders.saveOrders();
			
		}
		
		return Response.ok("Successfully canceled order").build();		
	}
	
	@GET
	@Path("/getOrdersByRestaurantName/{restaurantName}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Order> getOrdersByRestaurantName(@PathParam("restaurantName") String restaurantName) {
		Orders orders = Data.getOrders(servletContext);
		return orders.getOrdersByRestaurantName(restaurantName);
	}
	
	@GET
	@Path("/prepareOrder/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response prepareOrder(@PathParam("id") String id) {
		Orders orders = Data.getOrders(servletContext);
		Order order = orders.containsById(id);
		if (order == null) {
			return Response.status(400).entity("Cannot prepare order! \nCannot find order in orders data!").build();
		} else {
			Buyers buyers = Data.getBuyers(servletContext);
			Buyer buyer = buyers.containsIdOrder(id);
			if (buyer == null) {
				return Response.status(400).entity("Cannot prepare order! \nCannot find order in buyers!").build();
			}
			
			Order orderB = buyer.containsOrder(id);
			if (orderB == null) {
				return Response.status(400).entity("Cannot prepare order! \nCannot find order in buyers!").build();
			}
			
			order.setOrderStatus(OrderStatus.IN_PREPARATION);
			orderB.setOrderStatus(OrderStatus.IN_PREPARATION);
			
			orders.saveOrders();
			buyers.saveBuyers();
			
			return Response.ok("Successfully prepared order").build();		
		}
		
	}
	
	@GET
	@Path("/waitingDelivery/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response waitingDelivery(@PathParam("id") String id) {
		Orders orders = Data.getOrders(servletContext);
		Order order = orders.containsById(id);
		if (order == null) {
			return Response.status(400).entity("Cannot change order to wait! \nCannot find order in orders data!").build();
		} else {
			Buyers buyers = Data.getBuyers(servletContext);
			Buyer buyer = buyers.containsIdOrder(id);
			if (buyer == null) {
				return Response.status(400).entity("Cannot change order to wait! \nCannot find order in buyers!").build();
			}
			
			Order orderB = buyer.containsOrder(id);
			if (orderB == null) {
				return Response.status(400).entity("Cannot change order to wait! \nCannot find order in buyers!").build();
			}
			
			order.setOrderStatus(OrderStatus.WAITING_DELIVERY);
			orderB.setOrderStatus(OrderStatus.WAITING_DELIVERY);
			
			orders.saveOrders();
			buyers.saveBuyers();
			
			return Response.ok("Successfully prepared order").build();		
		}
		
	}
	
	// delivery-man
	@GET
	@Path("/getDeliveryMan/{username}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public DeliveryMan getDeliveryMan(@PathParam("username") String username) {
		DeliveryMans deliveryMans = Data.getDeliveryMans(servletContext);
		return deliveryMans.containsUsername(username);
	}
	
	
	@POST
	@Path("/sendRequest")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response sendRequest(@FormDataParam("idOrder") String idOrder, @FormDataParam("username") String username) {
		Orders orders = Data.getOrders(servletContext);
		Order order = orders.containsById(idOrder);
		if (order == null) {
			return Response.status(400).entity("Cannot send request! \nCannot find order in data!").build();
		}
 		
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(order.getRestaurantName());
		if (restaurant == null) {
			return Response.status(400).entity("Cannot send request! \nCannot find restaurant!").build();
		}
		
		Request newRequest = new Request(idOrder, username, RequestStatus.SENT);
		restaurant.getRequests().add(newRequest);
		
		restaurants.saveRestaurants();
		
		return Response.ok("Successfully sent request!").build();
	}
	
	@GET
	@Path("/getOrdersForDelivery")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Order> getOrdersForDelivery(@PathParam("username") String username) {
		Orders orders = Data.getOrders(servletContext);
		return orders.getOrdersForDelivery();
	}
	
	@PUT
	@Path("/rejectRequest/{restaurantName}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Request rejectRequest(@PathParam("restaurantName") String restaurantName, Request request) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return null;
		}
		
		Request ret = restaurant.containsRequestByIdOrder(request.getIdOrder());
		if (ret == null) {
			return null;
		}
		
		ret.setRequestStatus(RequestStatus.REJECTED);
		restaurants.saveRestaurants();
		return ret;
	}
	
	@PUT
	@Path("/acceptRequest/{restaurantName}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Request acceptRequest(@PathParam("restaurantName") String restaurantName, Request request) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return null;
		}
		
		Request ret = restaurant.containsRequestByIdOrder(request.getIdOrder());
		if (ret == null) {
			return null;
		}
		
		Orders orders = Data.getOrders(servletContext);
		Order order = orders.containsById(request.getIdOrder());
		if (order == null) {
			return null;
		}
		
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsIdOrder(request.getIdOrder());
		if (buyer == null) {
			return null;
		}
		Order orderB = buyer.containsOrder(request.getIdOrder());
		if (orderB == null) {
			return null;
		}
		
		DeliveryMans deliveryMans = Data.getDeliveryMans(servletContext);
		DeliveryMan deliveryMan = deliveryMans.containsUsername(request.getDeliveryUsername());
		if (deliveryMan == null) {
			return null;
		}
		
		deliveryMan.getOrdersToDeliver().add(request.getIdOrder());
		
		orderB.setOrderStatus(OrderStatus.IN_TRANSPORT);
		orderB.setUsernameDeliveryMan(request.getDeliveryUsername());
		
		order.setOrderStatus(OrderStatus.IN_TRANSPORT);
		order.setUsernameDeliveryMan(request.getDeliveryUsername());
		
		ret.setRequestStatus(RequestStatus.ACCEPTED);
		
		restaurants.saveRestaurants();
		orders.saveOrders();
		buyers.saveBuyers();
		deliveryMans.saveDeliveryMans();
		return ret;
	}
	
	@POST
	@Path("/getByArrayIds")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Order> getByArrayIds(ArrayList<String> ordersIDs) {
		Orders orders = Data.getOrders(servletContext);
		ArrayList<Order> ret = orders.getOrdersByArrayIDs(ordersIDs);
		return ret;
	}
	
	@PUT
	@Path("/arrivedOrder")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Order arrivedOrder(Order order) {
		Orders orders = Data.getOrders(servletContext);
		Order ret = orders.containsById(order.getId());
		if (ret == null) {
			return null;
		}
				
		Buyers buyers = Data.getBuyers(servletContext);
		Buyer buyer = buyers.containsIdOrder(order.getId());
		if (buyer == null) {
			return null;
		}
		Order orderB = buyer.containsOrder(order.getId());
		if (orderB == null) {
			return null;
		}
		
		ret.setOrderStatus(OrderStatus.DELIVERED);
		orderB.setOrderStatus(OrderStatus.DELIVERED);
		
		orders.saveOrders();
		buyers.saveBuyers();
		
		return ret;
	}
	
	@GET
	@Path("/getRequestsByUsername/{username}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Request> getRequestsByUsername(@PathParam("username") String username) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		ArrayList<Request> ret = restaurants.getRequestsByUsername(username);
		return ret;
	}
	
	
	//comments..
	
	@POST
	@Path("/addComment/{restaurantName}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addComment(@PathParam("restaurantName") String restaurantName, Comment newComment) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return Response.status(400).entity("Cannot send comment! \nCannot find restaurant!").build();
		}
		
		Date time = new Date();
 		
		newComment.setCommentStatus(CommentStatus.SENT);
		newComment.setTime(String.valueOf(time.getTime()));
		restaurant.getComments().add(newComment);
		
		restaurants.saveRestaurants();
		
		return Response.ok("Successfully sent comment!").build();
	}
		
	@GET
	@Path("/approveComment/{restaurantName}/{commentTime}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response approveComment(@PathParam("restaurantName") String restaurantName, @PathParam("commentTime") String commentTime) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return Response.status(400).entity("Cannot approve comment! \nCannot find restaurant!").build();
		} else {
			
			Comment comment = restaurant.containsCommentByTime(commentTime);
			if (comment == null) {
				return Response.status(400).entity("Cannot approve comment! \nCannot find comment!").build();
			}
			
			comment.setCommentStatus(CommentStatus.ACCEPTED);
			double averageRating = 0.0;
			double rating = 0.0;
			int numberOfRates = 0;
			for (Comment comment2 : restaurant.getComments()) {
				if (comment2.getCommentStatus().equals(CommentStatus.ACCEPTED)) {
					rating += comment2.getRating();
					numberOfRates++;
				}
			}
			if (numberOfRates > 0) {
				averageRating = rating / numberOfRates;
			}
			restaurant.setAverageRating(averageRating);
			restaurants.saveRestaurants();
			
			return Response.ok(averageRating).build();		
		}
		
	}
	
	@GET
	@Path("/rejectComment/{restaurantName}/{commentTime}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response rejectComment(@PathParam("restaurantName") String restaurantName, @PathParam("commentTime") String commentTime) {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		Restaurant restaurant = restaurants.containsName(restaurantName);
		if (restaurant == null) {
			return Response.status(400).entity("Cannot reject comment! \nCannot find restaurant!").build();
		} else {
			
			Comment comment = restaurant.containsCommentByTime(commentTime);
			if (comment == null) {
				return Response.status(400).entity("Cannot reject comment! \nCannot find comment!").build();
			}
			
			comment.setCommentStatus(CommentStatus.REJECTED);
			double averageRating = 0.0;
			double rating = 0.0;
			int numberOfRates = 0;
			for (Comment comment2 : restaurant.getComments()) {
				if (comment2.getCommentStatus().equals(CommentStatus.ACCEPTED)) {
					rating += comment2.getRating();
					numberOfRates++;
				}
			}
			if (numberOfRates > 0) {
				averageRating = rating / numberOfRates;
			}
			restaurant.setAverageRating(averageRating);
			restaurants.saveRestaurants();
			
			return Response.ok(averageRating).build();		
		}
		
	}
	
	
	@GET
	@Path("/getBuyersForRestaurant/{restaurantName}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Buyer> getBuyersForRestaurant(@PathParam("restaurantName") String restaurantName) {
		Buyers buyers = Data.getBuyers(servletContext);
		return buyers.getBuyersForRestaurant(restaurantName);
	}
	
	@GET
	@Path("/getTypesOfRestaurants")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getTypesOfRestaurants() {
		Restaurants restaurants = Data.getRestaurants(servletContext);
		ArrayList<String> ret = restaurants.getTypes();
		return ret;
	}
	
	
}

