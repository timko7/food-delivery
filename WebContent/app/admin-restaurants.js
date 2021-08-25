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
				managerUsername: null,
			},
			selectedLogo: null,
			restaurants: [],
			restaurantBackup: null,
        	showingOne: false,
			freeManagers: [],
			
			userM: {	// restaurantManager
                username: null,
                password: null,
                name: null,
                surname: null,
                gender: null,
                dateOfBirth: null,
            },
		}
	},
	
	template:
	`
	<div>
		<div class='card' v-if="!showingOne">
	        <div class='card-header'>
	            <h2>Restorani:</h2>
	        </div>
	
	        <div class='card-body'>
	            <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
	                        <th scope="col">Naziv</th>
	                        <th scope="col">Tip</th>
	                        <th scope="col">Mesto</th>
	                        <th scope="col">Prosečna ocena</th>
	                        <th scope="col">Logo</th>
	                        <th scope="col">Da li radi?</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="rest in restaurants">
                            <td><a href="#" v-on:click="showRestaurant(rest)">{{rest.name}}</a></td>
	                		<td>{{rest.type}}</td>
	                		<td>{{rest.location.place}}</td>
	                		<td>{{rest.averageRating}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="rest.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="rest.open">OTVOREN</td>
                            <td v-if="!rest.open">ZATVOREN</td>
	                    </tr>
	                </tbody>
	                
	            </table>
	        </div>
	    </div>
	
	    <div class='card' v-if="!showingOne">
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
	                    </tr>
	                    
	                    <tr>
                            <td>Menadžer</td>
                            <td v-if="!freeManagers.length">
                                <div>
                                    <table class="table-form">
                                        <tr>
                                            <td>Korisničko ime</td>
                                            <td><input type="text" v-model="userM.username" /></td>
                                        </tr>
                                        <tr>
                                            <td>Lozinka</td>
                                            <td><input type="password" v-model="userM.password" /></td>
                                        </tr>
                                        <tr>
                                            <td>Ime</td>
                                            <td><input type="text" v-model="userM.name" /></td>
                                        </tr>
                                        <tr>
                                            <td>Prezime</td>
                                            <td><input type="text" v-model="userM.surname" /></td>
                                        </tr>
                                        <tr>
                                            <td>Pol</td>
                                            <td>
                                                <select v-model="userM.gender">
                                                    <option value="MALE" selected>Muški</option>
                                                    <option value="FEMALE">Ženski</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Datum rodjenja</td>
                                            <td><input type="date" v-model="userM.dateOfBirth" /></td>
                                        </tr>
                                        <tr>
                                            <th><button type="button" class="btn btn-primary" v-on:click="addManager()" >Dodaj menadžera</button></th>
                                        </tr>
                                    </table>
                                </div>
                            </td>

                            <td v-else>
                                <select v-model="restaurant.managerUsername">
                                    <option v-for="man in freeManagers" :value="man.username">{{man.name}} {{man.surname}} ({{man.username}})</option>
                                </select>
                            </td>

                        </tr>
	
	                    <tr>
	                        <td><button class="btn btn-primary" v-on:click="addRestaurant()">Dodaj</button>
	                        </td>
	                    </tr>
	                </table>
	
	            </div>
	        
	
	    </div>
	    
	    <div class="card" v-if="showingOne">
            <div class='card-header'>
                <h2>Prikaz jednog restorana</h2>
                <button class="btn btn-primary" v-on:click="showAll()">Prikaži sve restorane</button>
            </div>

            <div class='card-body'>
                
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Tip</th>
                            <th scope="col">Lokacija</th>    			
                            <th scope="col">Prosečna ocena</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Da li radi?</th>
                        </tr>
	                </thead>
	                <tbody>
	                    <tr>
                            <td>{{restaurantBackup.name}}</td>
                            <td>{{restaurantBackup.type}}</td>
                            <td>{{restaurantBackup.location.place}}</td>
                            <td>{{restaurantBackup.averageRating}}</td>
                            <td><img style="width: 100px; cursor: pointer;" :src="restaurantBackup.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="restaurantBackup.open">OTVOREN</td>
                            <td v-if="!restaurantBackup.open">ZATVOREN</td>
	                    </tr>
	                </tbody>
	            </table>

            </div>

            <div class='card-header'>
                <h2>Artikli restorana</h2>
            </div>

            <div class='card-body'>
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Slika</th>
                            <th scope="col">Opis</th>    			
                            <th scope="col">Cena</th>
                        </tr>
	                </thead>
	                <tbody v-if="restaurantBackup.items">
	                    <tr v-for="(i) in restaurantBackup.items" v-if="!i.deleted">
	                    	<td>{{i.name}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="i.image" alt="Slika ne postoji" /></td>
                            <td>{{i.description}}</td>
	                		<td>{{i.price}}</td>
	                    </tr>
	                </tbody>
	            </table>
            </div>

            <div class='card-header'>
                <h2>Komentari restorana</h2>
            </div>

            <div class='card-body'>
                
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Korisničko ime kupca</th>
                            <th scope="col">Tekst komentara</th>
                            <th scope="col">Ocena</th>
                            <th scope="col">Status komentara</th>
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="c in restaurantBackup.comments">
                            <td>{{c.buyerUsername}}</td>
                            <td>{{c.text}}</td>
                            <td>{{c.rating}}</td>
                            <td>{{c.commentStatus}}</td>
	                    </tr>
	                </tbody>
	                
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
							
							axios.post('rest/data/addLogoForRestaurant2', formData)
							.then(response => {
								if (response.data === '') {
									toastt('Greska prilikom dodele logoa2!');
								} else {
									toastt('Uspesno dodat logo2..');
								}
							});
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
			if (this.restaurant.managerUsername == null) {
				toastt('Niste odabrali menadžera!')
				return false;
			}
			
			return true;
		},
		
		addManager: function() {
			if (!this.checkIfInputsAreFilledManager()) {
				return;
			}
			
			axios.post('rest/data/addManager', this.userM)
			.then(response => {
				if (response.data === '') {
                    toastt('Greška prilikom kreiranja menadžera. Korisničko ime je zauzeto.');
				} else {
					toastt('Uspešno kreiranje menadžera!');
					this.freeManagers.push(response.data);
				}				
			});
		},
		
		checkIfInputsAreFilledManager: function() {
			if (this.userM.username == null || this.userM.username.trim() === '') {
				toastt('Niste uneli korisničko ime!');
				return false;
			}
			if (this.userM.password == null || this.userM.password.trim() === '') {
				toastt('Niste uneli lozinku!');
				return false;
			} 
			if (this.userM.name == null || this.userM.name.trim() === '') {
				toastt('Niste uneli ime!');
				return false;
			}
			if (this.userM.surname == null || this.userM.surname.trim() === '') {
				toastt('Niste uneli prezime!');
				return false;
			}
			if (this.userM.gender == null || this.userM.gender.trim() === '') {
				toastt('Niste odabrali pol!');
				return false;
			}
			if (this.userM.dateOfBirth == null) {
				toastt('Niste uneli datum rođenja!');
				return false;
			}
			return true;
		},
		
		getAllRestaurants: function() {
            axios.get('rest/data/getAllRestaurants').then(response => this.restaurants = response.data);
		},
		
		getFreeManagers: function() {
			axios.get('rest/data/getFreeManagers').then(response => this.freeManagers = response.data);
		},
		
		
		showRestaurant: function(rest) {
    		this.restaurantBackup = Object.assign({}, rest);
    		this.showingOne = true;
    	},
    	showAll: function() {
    		this.showingOne = false;
    		this.restaurantBackup = Object.assign({}, {});
    	},
		
		
	},
	
	
	
	mounted() {
		this.getAllRestaurants();
		this.getFreeManagers();
	}
});
