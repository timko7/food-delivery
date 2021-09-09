Vue.component('manager-restaurant', {
	data: function() {
        return {
        	restaurant: null,
        	orders: [],
        	buyers: [],
        	
        	ordersBackup: [],
        	searchPriceFrom: null,
        	searchPriceTo: null,
        	searchDateFrom: null,
        	searchDateTo: null,
        	
        	checkedFilter: [],
        }
    },
    
    props: [
        'manager',
    ],
    
    template:
    `
    <div>
    	
    	
    	<div>
    		<div class='card-body'>
	            <h3>Osnovne informacije restorana za koji sam zadužen</h3>
	            <table class="table table-hover table-dark" v-if="restaurant">
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
	                    <tr>
	                    	<td>{{restaurant.name}}</td>
	                		<td>{{restaurant.type}}</td>
	                		<td>
	                			<template>
									<tr>
										<td>{{restaurant.location.place}} {{restaurant.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{restaurant.location.street}} {{restaurant.location.number}}</td>
									</tr>
									<tr>
										<td>{{restaurant.location.longitude}}, {{restaurant.location.latitude}}</td>
									</tr>
								</template>
	                		</td>
	                		<td>{{restaurant.averageRating}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="restaurant.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
	                		<td v-if="restaurant.open">OTVOREN</td>
	                		<td v-if="!restaurant.open">ZATVOREN</td>
	                    </tr>
	                </tbody>
	                
	            </table>
	            <div v-if="restaurant">
	            	<button v-if="!restaurant.open" type="button" class="btn btn-dark" v-on:click="openRestaurant()" >Otvori restoran</button>
	            	<button v-if="restaurant.open" type="button" class="btn btn-dark" v-on:click="closeRestaurant()" >Zatvori restoran</button>
	            </div>
	        </div>
    	</div>
    	
    	
    	
    	<div class="card">
    	
    		<div class='card-header'>
                <h2>Nedostavljene porudžbine:</h2>
            </div>
            
            <div class='card-body'>
            
    			<table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Restoran</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Vreme</th>
                            <th scope="col">Artikli</th>
                            <th scope="col">Status</th>
                            
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="o in orders" v-if="o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELED'">
	                    
                            <td>{{o.id}}</td>
                            <td>{{o.restaurantName}}</td>
                            <td>{{o.price}}</td>
                            <td>{{o.dateTime}}</td>
                            <td>
                            	<template v-for="i in o.itemsInCart">
									<td>{{ i.item.name }}; </td>
								</template>
                            </td>
                            <td>{{o.orderStatus}}</td>
                            
                            <td v-if="o.orderStatus === 'PROCESSING'"><button class="btn btn-primary" @click="prepareOrder(o)">U pripremi</button></td>
                            <td v-if="o.orderStatus === 'IN_PREPARATION'"><button class="btn btn-primary" @click="waitingDelivery(o)">Čeka dostavu</button></td>

	                    </tr>
	                </tbody>
	                
	            </table>
            </div>
                        

        </div>
        
        
        
        
        <div class="card">
    	
    		<div class='card-header'>
                <h2>Sve porudžbine:</h2>
            </div>
            
            <div class='card-body'>
            
    			<table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Restoran</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Vreme</th>
                            <th scope="col">Artikli</th>
                            <th scope="col">Status</th>
                            
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="o in orders">
	                    
                            <td>{{o.id}}</td>
                            <td>{{o.restaurantName}}</td>
                            <td>{{o.price}}</td>
                            <td>{{o.dateTime}}</td>
                            <td>
                            	<template v-for="i in o.itemsInCart">
									<td>{{ i.item.name }}; </td>
								</template>
                            </td>
                            <td>{{o.orderStatus}}</td>
                            
                            <td v-if="o.orderStatus === 'PROCESSING'"><button class="btn btn-primary" @click="prepareOrder(o)">U pripremi</button></td>
                            <td v-if="o.orderStatus === 'IN_PREPARATION'"><button class="btn btn-primary" @click="waitingDelivery(o)">Čeka dostavu</button></td>
                            
	                    </tr>
	                </tbody>
	                
	            </table>
	            
	            <table class="table table-hover w-50" style="float: left;" >
	                
	                <tbody>
	                    <tr>
	                        <th><label>Pretraži porudžbine po ceni (od - do):</label></th>
	                        <td><input type="number" v-model="searchPriceFrom"/></td>
	                        <td><input type="number" v-model="searchPriceTo"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByPrice()">Pretraži</button></td>
	                    </tr>
	                    <tr>
	                        <th><label>Pretraži porudžbine po datumu (od - do):</label></th>
	                        <td><input type="date" v-model="searchDateFrom"/></td>
	                        <td><input type="date" v-model="searchDateTo"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByDate()">Pretraži</button></td>
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
	                                                            
	                                <option value="sortPriceA">Cena(rastuće)</option>
	                                <option value="sortPriceD">Cena(opadajuće)</option>
	                                
	                                <option value="sortDateA">Datum(rastuće)</option>
	                                <option value="sortDateD">Datum(opadajuće)</option>
	                                
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
	                            <th>Status porudžbine</th>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="PROCESSING" value="PROCESSING" v-model="checkedFilter">
	                                <label class="custom-control-label" for="PROCESSING">PROCESSING</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="IN_PREPARATION" value="IN_PREPARATION" v-model="checkedFilter">
	                                <label class="custom-control-label" for="IN_PREPARATION">IN_PREPARATION</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="WAITING_DELIVERY" value="WAITING_DELIVERY" v-model="checkedFilter">
	                                <label class="custom-control-label" for="WAITING_DELIVERY">WAITING_DELIVERY</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="IN_TRANSPORT" value="IN_TRANSPORT" v-model="checkedFilter">
	                                <label class="custom-control-label" for="IN_TRANSPORT">IN_TRANSPORT</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="DELIVERED" value="DELIVERED" v-model="checkedFilter">
	                                <label class="custom-control-label" for="DELIVERED">DELIVERED</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="CANCELED" value="CANCELED" v-model="checkedFilter">
	                                <label class="custom-control-label" for="CANCELED">CANCELED</label>
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
        
        
        
        <div class="card">
    	
    		<div class='card-header'>
                <h2>Komentari vezani za restoran:</h2>
            </div>
            
            <div class='card-body'>
            
    			<table class="table table-hover table-dark" v-if="restaurant.comments">
	                <thead>
	                    <tr>
                            <th scope="col">Korisničko ime kupca</th>
                            <th scope="col">Tekst komentara</th>
                            <th scope="col">Ocena</th>
                            <th scope="col">Status komentara</th>
                            
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="c in restaurant.comments">
	                    
                            <td>{{c.buyerUsername}}</td>
                            <td>{{c.text}}</td>
                            <td>{{c.rating}}</td>
                            <td>{{c.commentStatus}}</td>
                            <td v-if="c.commentStatus !== 'ACCEPTED'"><button class="btn btn-primary" @click="approveComment(c)">Odobri komentar</button></td>
                            <td v-if="c.commentStatus !== 'REJECTED'"><button class="btn btn-primary" @click="rejectComment(c)">Odbaci komentar</button></td>
                            
	                    </tr>
	                </tbody>
	                
	            </table>
            </div>
                        
        </div>
        
        <div class="card">
    	
    		<div class='card-header'>
                <h2>Kupci koji su poručili iz ovog restorana:</h2>
            </div>
            
            <div class='card-body'>
            	<table class="table table-hover table-dark">
	                <thead>
	                    <tr>
	                        <th scope="col">Korisničko ime</th>
	                        <th scope="col">Ime</th>
	                        <th scope="col">Prezime</th>
	                        <th scope="col">Pol</th>
	                        <th scope="col">Datum rodjenja</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="b in buyers">
	                    	<td>{{b.username}}</td>
	                		<td>{{b.name}}</td>
	                		<td>{{b.surname}}</td>
	                		<td>{{b.gender}}</td>
	                		<td>{{b.dateOfBirth}}</td>
	                    </tr>
	                </tbody>
	            </table>
            </div>
                        
        </div>
        
        
    	
    	
    </div>
    `,
        
    methods: {
    	openRestaurant: function() {
        	axios.get('rest/data/openRestaurant/' + this.restaurant.name)
        	.then(response => {
        		if (response.data === '') {
        			toastt('Greska prilikom otvaranja restorana..');
                    return;
        		} else {
        			this.restaurant = response.data;
        		}
        	});
    	},
    	
    	closeRestaurant: function() {
        	axios.get('rest/data/closeRestaurant/' + this.restaurant.name)
        	.then(response => {
        		if (response.data === '') {
        			toastt('Greska prilikom zatvaranja restorana..');
                    return;
        		} else {
        			this.restaurant = response.data;
        		}
        	});
    	},
    	
    	prepareOrder: function(order) {
    		axios.get('rest/data/prepareOrder/' + order.id)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greška prilikom pripreme porudžbine!!');
				} else {
					toastt('Uspešno pripremljena porudžbina!');
					order.orderStatus = "IN_PREPARATION";
				}
    		})
    		.catch(error => {
				toastt('Greška prilikom pripreme porudžbine!');
    		})
    	},
    	
    	waitingDelivery: function(order) {
    		axios.get('rest/data/waitingDelivery/' + order.id)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greška prilikom promene porudžbine u \'čeka dostavljača\'!!');
				} else {
					toastt('Uspešno promenjena porudžbina u \'čeka dostavljača\'!');
					order.orderStatus = "WAITING_DELIVERY";
				}
    		})
    		.catch(error => {
				toastt('Greška prilikom promene porudžbine u \'čeka dostavljača\'!!');
    		})
    	},
    	
        approveComment: function(comment) {
        	axios.get('rest/data/approveComment/' + this.restaurant.name + '/' + comment.time)
        	.then(response => {
    			if (response.data === '') {
					toastt('Greška prilikom odobravanja komentara!!');
				} else {
					toastt('Uspešno odobren komentar!');
					comment.commentStatus = "ACCEPTED";
					this.restaurant.averageRating = response.data;
				}
    		})
    		.catch(error => {
				toastt('Greška prilikom odobravanja komentara!!');
    		})
        },
        
        rejectComment: function(comment) {
        	axios.get('rest/data/rejectComment/' + this.restaurant.name + '/' + comment.time)
        	.then(response => {
    			if (response.data === '') {
					toastt('Greška prilikom odbacivanja komentara!!');
				} else {
					toastt('Uspešno odbačen komentar!');
					comment.commentStatus = "REJECTED";
					this.restaurant.averageRating = response.data;
				}
    		})
    		.catch(error => {
				toastt('Greška prilikom odbacivanja komentara!!');
    		})
        },
        
        getBuyersForRestaurant: function() {
        	axios.get('rest/data/getBuyersForRestaurant/' + this.manager.restaurant).then(response => this.buyers = response.data);
        },
        
      //search 
    	resetSearch: function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.orders;
            }
			this.orders = this.ordersBackup;
			
			this.searchPriceFrom = null;
			this.searchPriceTo = null;
			this.searchDateFrom = null;
			this.searchDateTo = null;
        	this.checkedFilter = [];

		},
		
		searchByPrice : function() {
			if (this.searchPriceFrom == null || this.searchPriceTo == null || this.searchPriceFrom === "" || this.searchPriceTo === "") {
            	toastt('Neuspela pretraga! Popunite oba polja (od - do)!');
            	return;
            }
			
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.orders;
            } else {
                this.orders = this.ordersBackup;
            }

            let ret = [];
            
            for (let order of this.orders) {
                if (order.price >= this.searchPriceFrom && order.price <= this.searchPriceTo) {
                    ret.push(order);
                }
            }

            this.orders = ret;
            this.checkedFilter = [];
		},
		
		searchByDate : function() {
			if (this.searchDateFrom == null || this.searchDateTo == null) {
            	toastt('Neuspela pretraga! Popunite oba polja (od - do)!');
            	return;
            }
			
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.orders;
            } else {
                this.orders = this.ordersBackup;
            }

            let ret = [];

            searchNewDFrom = new Date(this.searchDateFrom)
            searchNewDTo= new Date(this.searchDateTo)
            
            for (let order of this.orders) {
            	let d = Date.parse(order.dateTime);
            	newDateOrder = new Date(d);
                if (+newDateOrder >= +searchNewDFrom && +newDateOrder <= +searchNewDTo) {
                    ret.push(order);
                }
            }

            this.orders = ret;
            this.checkedFilter = [];
		},
    	
		sorting: function() {
			if(event.target.value === "sortPriceA") {
				this.sortingPriceA();
			}
			if(event.target.value === "sortPriceD") {
				this.sortingPriceD();
			}
			if(event.target.value === "sortDateA") {
				this.sortingDateA();
			}
			if(event.target.value === "sortDateD") {
				this.sortingDateD();
			}
		},
		
		sortingPriceA: function() {
			this.orders.sort(function(a, b){
			    let x = a.price;
			    let y = b.price;
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingPriceD: function() {
			this.orders.sort(function(a, b){
				let x = a.price;
			    let y = b.price;
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingDateA: function() {
			this.orders.sort(function(a, b){
			    let x = a.dateTime.toLowerCase();
			    let y = b.dateTime.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingDateD: function() {
			this.orders.sort(function(a, b){
			    let x = a.dateTime.toLowerCase();
			    let y = b.dateTime.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		
		filter: function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.orders;
            }

            let ret = [];
            
        	if (this.checkedFilter.includes("PROCESSING")) {
				for (let order of this.orders) {
					if (order.orderStatus === "PROCESSING") {
						ret.push(order);
					}
				}
			}
			if (this.checkedFilter.includes("IN_PREPARATION")) {
				for (let order of this.orders) {
					if (order.orderStatus === "IN_PREPARATION") {
						ret.push(order);
					}
				}
			}
			if (this.checkedFilter.includes("WAITING_DELIVERY")) {
				for (let order of this.orders) {
					if (order.orderStatus === "WAITING_DELIVERY") {
						ret.push(order);
					}
				}
			}
			if (this.checkedFilter.includes("IN_TRANSPORT")) {
				for (let order of this.orders) {
					if (order.orderStatus === "IN_TRANSPORT") {
						ret.push(order);
					}
				}
			}
			if (this.checkedFilter.includes("DELIVERED")) {
				for (let order of this.orders) {
					if (order.orderStatus === "DELIVERED") {
						ret.push(order);
					}
				}
			}
			if (this.checkedFilter.includes("CANCELED")) {
				for (let order of this.orders) {
					if (order.orderStatus === "CANCELED") {
						ret.push(order);
					}
				}
			}
        
            this.orders = ret;
		},

    },

    mounted() {
    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => this.restaurant = response.data);
    	axios.get('rest/data/getOrdersByRestaurantName/' + this.manager.restaurant).then(response => this.orders = response.data);
    	this.getBuyersForRestaurant();
    }
});