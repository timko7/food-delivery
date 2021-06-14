package common;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

public class Consts {
	
	@Context 
	ServletContext servletContext;
	
	public static final String restaurantsLogoLocation = "res/images/restaurants";

}
