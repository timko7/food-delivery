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
            
            restaurantsBackup: [],
        	searchName: "",
        	searchType: "",
        	searchLocation: "",
        	searchRate: "",
        	
        	types: [],
        	checkedFilter: [],
        	
        	combinedName: "",
        	combinedType: "",
        	combinedLocation: "",
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
	                		<td>
	                			<template>
									<tr>
										<td>{{rest.location.place}} {{rest.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{rest.location.street}} {{rest.location.number}}</td>
									</tr>
									<tr>
										<td>{{rest.location.longitude}}, {{rest.location.latitude}}</td>
									</tr>
								</template>
	                		</td>
	                		<td>{{rest.averageRating}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="rest.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="rest.open">OTVOREN</td>
                            <td v-if="!rest.open">ZATVOREN</td>
	                    </tr>
	                </tbody>
	                
	            </table>
	            
	            <table class="table table-hover w-50" style="float: left;" >
	                
	                <tbody>
	                    <tr>
	                        <th><label>Pretraži restorane po nazivu:</label></th>
	                        <td><input type="text" v-model="searchName"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByName()">Pretraži</button></td>
	                    </tr>
	                    <tr>
	                        <th><label>Pretraži restorane po tipu:</label></th>
	                        <td><input type="text" v-model="searchType"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByType()">Pretraži</button></td>
	                    </tr>
	                    <tr>
	                        <th><label>Pretraži restorane po lokaciji:</label></th>
	                        <td><input type="text" v-model="searchLocation"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByLocation()">Pretraži</button></td>
	                    </tr>
	                    <tr>
	                        <th><label>Pretraži restorane po prosečnoj oceni:</label></th>
	                        <td><input type="text" v-model="searchRate"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByRate()">Pretraži</button></td>
	                    </tr>
	    				<tr>
	                        <td colspan="3"><button type="button" class="btn btn-dark btn-block" v-on:click="resetSearch()">Resetuj pretragu</button></td>
	                    </tr>
	                    
	                    <tr>
	                    	<td>
		                    	<tr>
	                        		<th><h2>Kombinovana pretraga restorana:</h2></th>
	                    		</tr>
	                        </td>
	                    </tr>
	                    <tr>
	                    	<td>
		                    	<tr>
			                        <th><label>Naziv:</label></th>
			                        <td><input type="text" v-model="combinedName"/></td>
		                        </tr>
	                        </td>
	                    </tr>
	                    <tr>
	                    	<td>
		                    	<tr>
			                        <th><label>Tip:</label></th>
			                        <td><input type="text" v-model="combinedType"/></td>
		                        </tr>
	                        </td>
	                    </tr>
	                    <tr>
	                    	<td>
		                    	<tr>
			                        <th><label>Lokacija:</label></th>
			                        <td><input type="text" v-model="combinedLocation"/></td>
			                        <td><button type="button" class="btn btn-dark" v-on:click="searchCombined()">Pretraži</button></td>
    								<td><button type="button" class="btn btn-dark" v-on:click="resetSearch()">Resetuj pretragu</button></td>
		                        </tr>
	                        </td>
	                    </tr>
	
	                </tbody>
	            </table>
	            
	            <table class="w-25" style="float: left;">
	                
	                <tbody>
	                    <tr>
	                        <th>Sortiranje</th>
	                    </tr>
	                    <tr>
	                        <td>
	                            <select v-on:change="sorting($event)">
	                                <option>Odaberite sortiranje</option>
	                                                            
	                                <option value="sortNameA">Naziv(rastuće)</option>
	                                <option value="sortNameD">Naziv(opadajuće)</option>
	                                
	                                <option value="sortLocationA">Lokacija(rastuće)</option>
	                                <option value="sortLocationD">Lokacija(opadajuće)</option>
	                                
	                                <option value="sortRateA">Prosečna ocena(rastuće)</option>
	                                <option value="sortRateD">Prosečna ocena(opadajuće)</option>
	                                
	                            </select>
	                        </td>
	                    </tr>	
	                </tbody>
	                
	            </table>
	            
	            
	            <table class="w-25" style="float: left;">
	                <tbody>
	                    <tr>
	                        <th>Filtriranje</th>
	                    </tr>
	
	                    <tr>
	                        <td>
	                            <div class="custom-control custom-checkbox m-2" v-for="t in types">
	                                <input type="checkbox" class="custom-control-input" :id="t" :value="t" v-model="checkedFilter">
	                                <label class="custom-control-label" :for="t">{{t}}</label>
	                            </div>
	                            
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="open" value="onlyOpen" v-model="checkedFilter">
	                                <label class="custom-control-label" for="open">Samo otvoreni</label>
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colspan="2"><button type="button" class="btn btn-dark btn-block" @click="filter()">Primeni filtere</button></td>
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
                            <td>
	                			<template>
									<tr>
										<td>{{restaurantBackup.location.place}} {{restaurantBackup.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{restaurantBackup.location.street}} {{restaurantBackup.location.number}}</td>
									</tr>
									<tr>
										<td>{{restaurantBackup.location.longitude}}, {{restaurantBackup.location.latitude}}</td>
									</tr>
								</template>
	                		</td>
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
    	
    	//search restaurants
    	resetSearch: function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            }
			this.restaurants = this.restaurantsBackup;
			
        	this.searchName = "";
        	this.searchType = "";
        	this.searchLocation = "";
        	this.searchRate = "";
        	this.checkedFilter = [];
        	this.combinedName = "";
        	this.combinedType = "";
        	this.combinedLocation = "";

		},
		
		searchByName : function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            } else {
                this.restaurants = this.restaurantsBackup;
            }

            let ret = [];

            for (let restaurant of this.restaurants) {
                if (restaurant.name.toLowerCase() === this.searchName.toLowerCase()) {
                    ret.push(restaurant);
                }
            }

            this.restaurants = ret;
            this.checkedFilter = [];
		},
		
		searchByType : function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            } else {
                this.restaurants = this.restaurantsBackup;
            }

            let ret = [];

            for (let restaurant of this.restaurants) {
                if (restaurant.type.toLowerCase() === this.searchType.toLowerCase()) {
                    ret.push(restaurant);
                }
            }

            this.restaurants = ret;
            this.checkedFilter = [];
		},
		
		searchByLocation : function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            } else {
                this.restaurants = this.restaurantsBackup;
            }

            let ret = [];

            for (let restaurant of this.restaurants) {
                if (restaurant.location.place.toLowerCase() === this.searchLocation.toLowerCase()) {
                    ret.push(restaurant);
                }
            }

            this.restaurants = ret;
            this.checkedFilter = [];
		},
		
		searchByRate : function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            } else {
                this.restaurants = this.restaurantsBackup;
            }

            let ret = [];

            for (let restaurant of this.restaurants) {
                if (restaurant.averageRating == this.searchRate.toLowerCase()) {
                    ret.push(restaurant);
                }
            }

            this.restaurants = ret;
            this.checkedFilter = [];
		},
		
		searchCombined: function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            } else {
                this.restaurants = this.restaurantsBackup;
            }
			
			let ret = [];

			if (this.combinedName == null && this.combinedName.trim() === "" &&
					this.combinedType == null && this.combinedType.trim() === "" &&
					this.combinedLocation == null && this.combinedLocation.trim() === "") {
				this.restaurants = ret;
	            this.checkedFilter = [];
	            return;
			}
			
			if (this.combinedName !== "" && this.combinedType !== "" && this.combinedLocation !== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.name.toLowerCase() === this.combinedName.toLowerCase() && 
	                		restaurant.type.toLowerCase() === this.combinedType.toLowerCase() &&
	                		restaurant.location.place.toLowerCase() === this.combinedLocation.toLowerCase()) {
	                    ret.push(restaurant);
	                }
	            }				
			} else if (this.combinedName !== "" && this.combinedType !== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.name.toLowerCase() === this.combinedName.toLowerCase() && 
	                		restaurant.type.toLowerCase() === this.combinedType.toLowerCase()) {
	                    ret.push(restaurant);
	                }
	            }
			} else if (this.combinedName !== "" && this.combinedLocation !== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.name.toLowerCase() === this.combinedName.toLowerCase() && 
	                		restaurant.location.place.toLowerCase() === this.combinedLocation.toLowerCase()) {
	                    ret.push(restaurant);
	                }
	            }
			} else if (this.combinedType !== "" && this.combinedLocation !== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.type.toLowerCase() === this.combinedType.toLowerCase() && 
	                		restaurant.location.place.toLowerCase() === this.combinedLocation.toLowerCase()) {
	                    ret.push(restaurant);
	                }
	            }
			} else if (this.combinedName !== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.name.toLowerCase() === this.combinedName.toLowerCase()) {
	                	ret.push(restaurant);
	                }
	            }
			} else if (this.combinedType !== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.type.toLowerCase() === this.combinedType.toLowerCase()) {
	                	ret.push(restaurant);
	                }
	            }
			} else if (this.combinedLocation!== "") {
				for (let restaurant of this.restaurants) {
	                if (restaurant.location.place.toLowerCase() === this.combinedLocation.toLowerCase()) {
	                	ret.push(restaurant);
	                }
	            }
			}
			
            this.restaurants = ret;
            this.checkedFilter = [];
		},
		
		sorting: function() {
			if(event.target.value === "sortNameA") {
				this.sortingNameA();
			}
			if(event.target.value === "sortNameD") {
				this.sortingNameD();
			}
			if(event.target.value === "sortLocationA") {
				this.sortingLocationA();
			}
			if(event.target.value === "sortLocationD") {
				this.sortingLocationD();
			}
			if(event.target.value === "sortRateA") {
				this.sortingRateA();
			}
			if(event.target.value === "sortRateD") {
				this.sortingRateD();
			}
		},
		
		sortingNameA: function() {
			this.restaurants.sort(function(a, b){
			    let x = a.name.toLowerCase();
			    let y = b.name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingNameD: function() {
			this.restaurants.sort(function(a, b){
			    let x = a.name.toLowerCase();
			    let y = b.name.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingLocationA: function() {
			this.restaurants.sort(function(a, b){
			    let x = a.location.place.toLowerCase();
			    let y = b.location.place.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingLocationD: function() {
			this.restaurants.sort(function(a, b){
			    let x = a.location.place.toLowerCase();
			    let y = b.location.place.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingRateA: function() {
			this.restaurants.sort(function(a, b){
			    let x = a.averageRating;
			    let y = b.averageRating;
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingRateD: function() {
			this.restaurants.sort(function(a, b){
				let x = a.averageRating;
			    let y = b.averageRating;
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		
		filter: function() {
			if (this.restaurantsBackup.length == 0) {
                this.restaurantsBackup = this.restaurants;
            }

            let ret = [];
            
            for (let rest of this.restaurants) {
            	for (let type of this.types) {
            		if (this.checkedFilter.includes(type)) {
            			if (this.checkedFilter.includes("onlyOpen")) {
            				if (rest.type === type && rest.open) {
            					ret.push(rest);
            				}
            			} else {
            				if (rest.type === type) {
            					ret.push(rest);
            				}
            			}
            		}
            	}
            }
            
            if (this.checkedFilter.length == 1 && this.checkedFilter.includes("onlyOpen")) {
            	for (let rest of this.restaurants) {
            		if (rest.open) {
    					ret.push(rest);
    				}
            	}
            }
            
            this.restaurants = ret;
		},
		
		
	},
	
	
	
	mounted() {
		this.getAllRestaurants();
		this.getFreeManagers();
		
		axios.get('rest/data/getTypesOfRestaurants')
    	.then(response => {
    		this.types = response.data
    	});
	}
});
