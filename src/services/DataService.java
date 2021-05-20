package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import model.User;

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

}
