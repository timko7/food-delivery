package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

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

}
