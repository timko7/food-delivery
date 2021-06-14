Vue.component('admin-restaurants', {
	data: function() {
		return {
			restaurant: {
				name: null,
				type: null,
				logo: null,
				location: {
					longitude: null,
					latitude: null,
					street: null,
					number: null,
					place: null,
					postalCode: null,
				},
			},
			selectedLogo: null,
			restaurants: [],
		}
	},
	
	template:
	`
	<div>
		<div class='card'>
	        <div class='card-header'>
	            <h2>Restorani:</h2>
	        </div>
	
	        <div class='card-body'>
	            <h3>Izlistati restorane..</h3>
	            <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
	                        <th scope="col">Naziv</th>
	                        <th scope="col">Tip</th>
	                        <th scope="col">Mesto</th>
	                        <th scope="col">Logo</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="rest in restaurants">
	                    	<td>{{rest.name}}</td>
	                		<td>{{rest.type}}</td>
	                		<td>{{rest.location.place}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="rest.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
	                    </tr>
	                </tbody>
	                
	            </table>
	        </div>
	    </div>
	
	    <div class='card'>
	        <div class='card-header'>
	            <h2>Dodavanje restorana:</h2>
	        </div>
	
	
	        
	            <div class='card-body'>
	                <table>
	                    <tr>
	                        <td>Naziv</td>
	                        <td><input type="text" v-model="restaurant.name"/></td>
	                    </tr>
	                    <tr>
	                        <td>Tip</td>
	                        <td><input type="text" v-model="restaurant.type"/></td>
	                    </tr>
	
	                    <tr class="" >
	                        <th class="" >Lokacija</th>
	                    </tr>
	
	                    <tr>
	                        <td>Geografska dužina</td>
	                        <td><input type="text" v-model="restaurant.location.longitude" /></td>
	                    </tr>
	                    <tr>
	                        <td>Geografska širina</td>
	                        <td><input type="text" v-model="restaurant.location.latitude" /></td>
	                    </tr>
	                    <tr>
	                        <td>Ulica</td>
	                        <td><input type="text" v-model="restaurant.location.street" /></td>
	                    </tr>
	                    <tr>
	                        <td>Broj</td>
	                        <td><input type="text" v-model="restaurant.location.number" /></td>
	                    </tr>
	                    <tr>
	                        <td>Mesto</td>
	                        <td><input type="text" v-model="restaurant.location.place" /></td>
	                    </tr>
	                    <tr>
	                        <td>Poštanski broj</td>
	                        <td><input type="text" v-model="restaurant.location.postalCode" /></td>
	                    </tr>
	
	                    <tr>
	                        <td>Logo</td>
	                        <td><input class="btn btn-primary" type="file" accept="image/*" v-on:change="onFileChanged" /></td>
	                        <td><img style="width: 100px; cursor: pointer;" :src="restaurant.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
	                    </tr>
	
	                    <tr>
	                        <td><button class="btn btn-primary" v-on:click="addRestaurant()">Dodaj</button>
	                        </td>
	                    </tr>
	                </table>
	
	            </div>
	        
	
	    </div>
	</div>
	`,
	
	methods: {
		onFileChanged: function(event) {
			this.selectedLogo = event.target.files[0];
		},
		
		addRestaurant: function() {
			if (!this.checkIfInputsAreFilled()) {
				return;
			}
			
			axios.post('rest/data/addRestaurant', this.restaurant)
			.then(response => {
				if (response.data === '') {
                    toastt('Greška prilikom kreiranja restorana. Naziv restorana je zauzeto.');
                    return;
				} else {
					toastt('Uspešno kreiranje restorana!')
				}
				
				if (this.selectedLogo != null) {
					const formData = new FormData();
					formData.append('name', this.restaurant.name);
					formData.append('file', this.selectedLogo, this.selectedLogo.name);
					
					axios.post('rest/data/addLogoForRestaurant', formData)
					.then(response => {
						if (response.data === '') {
							toastt('Greska prilikom dodele logoa!');
						} else {
							toastt('Uspesno dodat logo..');
						}
					});
				}
			});
		},
		
		checkIfInputsAreFilled: function() {
			if (this.restaurant.name == null || this.restaurant.name.trim() === '') {
				toastt('Niste uneli naziv restorana!')
				return false
			}
			if (this.restaurant.type == null || this.restaurant.type.trim() === '') {
				toastt('Niste uneli tip restorana!')
				return false
			}
			if (this.restaurant.location.longitude == null || this.restaurant.location.longitude.trim() === '') {
				toastt('Niste uneli geografsku dužinu!')
				return false
			}
			if (this.restaurant.location.latitude == null || this.restaurant.location.latitude.trim() === '') {
				toastt('Niste uneli geografsku širinu!')
				return false
			}
			if (this.restaurant.location.street == null || this.restaurant.location.street.trim() === '') {
				toastt('Niste uneli ulicu!')
				return false
			}
			if (this.restaurant.location.number == null || this.restaurant.location.number.trim() === '') {
				toastt('Niste uneli geografsku broj!')
				return false
			}
			if (this.restaurant.location.place == null || this.restaurant.location.place.trim() === '') {
				toastt('Niste uneli mesto!')
				return false
			}
			if (this.restaurant.location.postalCode == null || this.restaurant.location.postalCode.trim() === '') {
				toastt('Niste uneli poštanski kod!')
				return false
			}
			if (this.selectedLogo == null) {
				toastt('Niste odabrali logo restorana!')
				return false;
			}
			return true;
		},
		
		getAllRestaurants: function() {
            axios.get('rest/data/getAllRestaurants').then(response => this.restaurants = response.data);
		}
		
	},
	
	
	
	mounted() {
		this.getAllRestaurants();
	}
});
