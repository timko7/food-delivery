package services;

import java.util.ArrayList;
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
import model.types.UserType;

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
	
	
}
