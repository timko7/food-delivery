package common;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

public class Consts {
	
	@Context 
	ServletContext servletContext;
	
	public static final String restaurantsLogoLocation = "res/images/restaurants";

	public static final String restaurantsLogoLocation2 = "C:\\webProjekat-workspace\\food-delivery\\WebContent\\res\\images\\restaurants";
}
