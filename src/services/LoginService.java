package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Buyer;
import model.TypeBuyer;
import model.User;
import model.collection.Buyers;
import model.collection.Users;
import model.types.UserType;

@Path("/log")
public class LoginService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext servletCtx;

	@GET
	@Path("/testic")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		System.out.println("syoprint: Hello from: 'log/testic'");
		return "Hello from: 'log/testic'";
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User loginUser(User user) {
		System.out.println("LOGIN: " + user);

		Users users = Data.getUsers(servletCtx);

		User userReturn = (User) request.getSession().getAttribute("user-info");
		if (userReturn == null) {
			userReturn = users.checkLogin(user);

			if (userReturn == null) {
				return null;
			}

			request.getSession().setAttribute("user-info", userReturn);

		}

		// TODO: dodaj za proveru blocked
		if (userReturn.isBlocked()) {
			request.getSession().invalidate();
		}

		System.out.println("LOGIN(end): " + userReturn);
		return userReturn;

	}

	@GET
	@Path("/getUser")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser() {
		User ret = (User) request.getSession().getAttribute("user-info");
		return ret;
	}

	@GET
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout() {
		request.getSession().invalidate();
		return Response.status(200).build();
	}

	@POST
	@Path("/registration")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User registration(User user) {
		System.out.println("Registracija: " + user);
		Users users = Data.getUsers(servletCtx);
		Buyers buyers = Data.getBuyers(servletCtx);

		if (users.getUsers().containsKey(user.getUsername())) {
			return null;
		} else {
			user.setUserType(UserType.BUYER);
			user.setBlocked(false);

			users.getUsers().put(user.getUsername(), user);
			users.saveUsers();

			Buyer buyer = new Buyer();
			buyer = buyer.makeFromUser(user);

			buyer.setTypeBuyer(new TypeBuyer("OBICAN", 0, 100));

			System.out.println("U registration:: " + buyer);
			buyers.getBuyers().put(buyer.getUsername(), buyer);
			buyers.saveBuyers();

			return user;
		}
	}

	@DELETE
	@Path("/deleteUser/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteUser(@PathParam("username") String username2) {
		System.out.println("Deleting user: " + username2);
		Users users = Data.getUsers(servletCtx);
		User ret = new User();

		if (!users.getUsers().containsKey(username2)) {
			return null;
		} else {
			ret = users.getUsers().remove(username2);
			users.saveUsers();
		}
		return Response.status(200).entity("Obrisan user: " + ret).build();

	}

}
