Vue.component('buyer-restaurants', {
	data: function() {
        return {
        	restaurants: [],
        	restaurantBackup: null,
        	showingOne: false,
        	itemInChartToAdd: {
        		item: null,
        		quantity: null,
        	},
        	quantitiesTemp: [],

        	restaurantsBackup: [],
        	searchName: "",
        	searchType: "",
        	searchLocation: "",
        	searchRate: "",
        	
        	types: [],
        	checkedFilter: [],
        }
    },
    
    props: [
        'buyer',
    ],
    
    template:
    `
    <div>
    	    	
    	<div class="card" v-if="!showingOne">
            <div class='card-header'>
                <h2>Restorani</h2>
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
	                    <tr v-for="r in restaurants">
                            <td><a href="#" v-on:click="showRestaurant(r)">{{r.name}}</a></td>
                            <td>{{r.type}}</td>
                            <td>
	                			<template>
									<tr>
										<td>{{r.location.place}} {{r.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{r.location.street}} {{r.location.number}}</td>
									</tr>
									<tr>
										<td>{{r.location.longitude}}, {{r.location.latitude}}</td>
									</tr>
								</template>
	                		</td>
                            <td>{{r.averageRating}}</td>
                            <td><img style="width: 100px; cursor: pointer;" :src="r.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="r.open">OTVOREN</td>
                            <td v-if="!r.open">ZATVOREN</td>
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
	                    <tr v-for="(i, index) in restaurantBackup.items" v-if="!i.deleted">
	                    	<td>{{i.name}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="i.image" alt="Slika ne postoji" /></td>
                            <td>{{i.description}}</td>
	                		<td>{{i.price}}</td>
	                		<td v-if="restaurantBackup.open">
                                <input type="number" min="1" style="width: 50px;" value="1" v-model="quantitiesTemp[index]"/>
                                <button class="btn btn-primary" v-on:click="addInCart(i, quantitiesTemp[index])">Dodaj u korpu</button>
	                		</td>
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
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="c in restaurantBackup.comments" v-if="c.commentStatus === 'ACCEPTED'">
	                    
                            <td>{{c.buyerUsername}}</td>
                            <td>{{c.text}}</td>
                            <td>{{c.rating}}</td>
                            
	                    </tr>
	                </tbody>
	                
	            </table>

            </div>

        </div>
    	
    </div>
    `,
        
    methods: {
    	showRestaurant: function(rest) {
    		this.restaurantBackup = Object.assign({}, rest);
    		this.restaurantBackup.items.forEach(i => {
    			this.quantitiesTemp.push(1);
			})
    		this.showingOne = true;
    	},
    	showAll: function() {
    		this.showingOne = false;
    		this.restaurantBackup = Object.assign({}, {});
    		this.quantitiesTemp = [];
    	},
    	
    	addInCart: function(itemToAdd, q) {
    		if (q == null || q < 1) {
    			toastt('Količina ne može biti manja od 1!')
    			return
    		}
    		console.log(q, 'dfsg')
    		this.itemInChartToAdd.item = Object.assign({}, itemToAdd);
    		this.itemInChartToAdd.quantity = q;
    		
    		//check if an item is from same restaurant as other items in cart
    		axios.post('rest/data/addItemInChartToAdd', this.itemInChartToAdd)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greska prilikom dodavanja u korpu! \n Može se dodati samo iz istog restorana!');
				} else {
					toastt('Uspešno dodato u korpu..');
					this.buyer.cart.itemsInCart.push(response.data);
					this.buyer.cart.price = this.buyer.cart.price + response.data.item.price * response.data.quantity;
				}
    		})
    		.catch(error => {
				toastt('Greska prilikom dodavanja u korpu! \n Može se dodati samo iz istog restorana!');
				console.log('Greska prilikom dodavanja u korpu! \n Može se dodati samo iz istog restorana!');
    		})
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
    	axios.get('rest/data/getRestaurantsOpenFirst')
    	.then(response => {
    		this.restaurants = response.data
    	});
    	
    	axios.get('rest/data/getTypesOfRestaurants')
    	.then(response => {
    		this.types = response.data
    	});
    }
});