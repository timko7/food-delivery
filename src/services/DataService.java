package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import model.User;
import model.collection.Users;

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

		return userToEdit;
	}

}
