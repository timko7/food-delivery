package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.User;
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

		if (users.getUsers().containsKey(user.getUsername())) {
			return null;
		} else {
			user.setUserType(UserType.BUYER);
			user.setBlocked(false);
			
			users.getUsers().put(user.getUsername(), user);
			users.saveUsers();
			
			return user;
		}
	}

}
