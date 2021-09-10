Vue.component('delivery-man-waitingDelivery', {
    data: function() {
    	return {
    		ordersForDelivery: [],
    		
    		ordersBackup: [],
        	searchName: "",
        	searchPriceFrom: null,
        	searchPriceTo: null,
        	searchDateFrom: null,
        	searchDateTo: null,
        	
        	types: [],
        	checkedFilter: [],
        }
    },

    props: [
        'delivery_man',
    ],

    template:
    `
    <div>
    
    	<div class="card">
    	
    		<div class='card-header'>
                <h2>Porudžbine koje čekaju dostavu:</h2>
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
                            <th scope="col">Lokacija</th>
                            <th scope="col">Status</th>
                            
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="o in ordersForDelivery" v-if="o.orderStatus === 'WAITING_DELIVERY'">
	                    
                            <td>{{o.id}}</td>
                            <td>{{o.restaurantName}}</td>
                            <td>{{o.price}}</td>
                            <td>{{o.dateTime}}</td>
                            <td>
                            	<template v-for="i in o.itemsInCart">
									<td>{{ i.item.name }}; </td>
								</template>
                            </td>
                            <td>
                            	<template>
									<tr>
										<td>{{o.location.place}} {{o.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{o.location.street}} {{o.location.number}}</td>
									</tr>
								</template>
                            </td>
                            <td>{{o.orderStatus}}</td>
                            
                            <td v-if="o.orderStatus === 'WAITING_DELIVERY'"><button class="btn btn-primary" @click="sendRequest(o)">Pošalji zahtev za dostavu</button></td>

	                    </tr>
	                </tbody>
	            </table>
	            
	            <table class="table table-hover w-50" style="float: left;" >
	                
	                <tbody>
	                    <tr>
	                        <th><label>Pretraži porudžbine po restoranu:</label></th>
	                        <td><input type="text" v-model="searchName"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByName()">Pretraži</button></td>
	                    </tr>
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
	                                                            
	                                <option value="sortNameA">Naziv restorana(rastuće)</option>
	                                <option value="sortNameD">Naziv restorana(opadajuće)</option>
	                                
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
	                        	<th>Tip restorana</th>
	                            <div class="custom-control custom-checkbox m-2" v-for="t in types">
	                                <input type="checkbox" class="custom-control-input" :id="t" :value="t" v-model="checkedFilter">
	                                <label class="custom-control-label" :for="t">{{t}}</label>
	                            </div>
	                            
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



    </div>
    `,

    methods: {
    	sendRequest: function(order) {
    		const formData = new FormData();
			formData.append('idOrder', order.id);
			formData.append('username', this.delivery_man.username);
			
			axios.post('rest/data/sendRequest', formData)
			.then(response => {
				if (response.data === '') {
                    toastt('Greška prilikom slanja zahteva!');
				} else {
					toastt('Uspešno poslat zahtev! Sačekajte odgovor!');
				}				
			})
			.catch(error => {
				toastt('Greška prilikom slanja zahteva! ');
    		});
    	},
    	
    	
    	//search 
    	resetSearch: function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.ordersForDelivery;
            }
			this.ordersForDelivery = this.ordersBackup;
			
			this.searchName = "";
			this.searchPriceFrom = null;
			this.searchPriceTo = null;
			this.searchDateFrom = null;
			this.searchDateTo = null;
        	this.checkedFilter = [];

		},
		
		searchByName : function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.ordersForDelivery;
            } else {
                this.ordersForDelivery = this.ordersBackup;
            }

            let ret = [];

            for (let order of this.ordersForDelivery) {
                if (order.restaurantName.toLowerCase() === this.searchName.toLowerCase()) {
                    ret.push(order);
                }
            }

            this.ordersForDelivery = ret;
            this.checkedFilter = [];
		},
		
		searchByPrice : function() {
			if (this.searchPriceFrom == null || this.searchPriceTo == null || this.searchPriceFrom === "" || this.searchPriceTo === "") {
            	toastt('Neuspela pretraga! Popunite oba polja (od - do)!');
            	return;
            }
			
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.ordersForDelivery;
            } else {
                this.ordersForDelivery = this.ordersBackup;
            }

            let ret = [];
            
            for (let order of this.ordersForDelivery) {
                if (order.price >= this.searchPriceFrom && order.price <= this.searchPriceTo) {
                    ret.push(order);
                }
            }

            this.ordersForDelivery = ret;
            this.checkedFilter = [];
		},
		
		searchByDate : function() {
			if (this.searchDateFrom == null || this.searchDateTo == null) {
            	toastt('Neuspela pretraga! Popunite oba polja (od - do)!');
            	return;
            }
			
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.ordersForDelivery;
            } else {
                this.ordersForDelivery = this.ordersBackup;
            }

            let ret = [];

            searchNewDFrom = new Date(this.searchDateFrom)
            searchNewDTo= new Date(this.searchDateTo)
            
            for (let order of this.ordersForDelivery) {
            	let d = Date.parse(order.dateTime);
            	newDateOrder = new Date(d);
                if (+newDateOrder >= +searchNewDFrom && +newDateOrder <= +searchNewDTo) {
                    ret.push(order);
                }
            }

            this.ordersForDelivery = ret;
            this.checkedFilter = [];
		},
    	
		sorting: function() {
			if(event.target.value === "sortNameA") {
				this.sortingNameA();
			}
			if(event.target.value === "sortNameD") {
				this.sortingNameD();
			}
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
		
		sortingNameA: function() {
			this.ordersForDelivery.sort(function(a, b){
			    let x = a.restaurantName.toLowerCase();
			    let y = b.restaurantName.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingNameD: function() {
			this.ordersForDelivery.sort(function(a, b){
			    let x = a.restaurantName.toLowerCase();
			    let y = b.restaurantName.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingPriceA: function() {
			this.ordersForDelivery.sort(function(a, b){
			    let x = a.price;
			    let y = b.price;
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingPriceD: function() {
			this.ordersForDelivery.sort(function(a, b){
				let x = a.price;
			    let y = b.price;
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingDateA: function() {
			this.ordersForDelivery.sort(function(a, b){
			    let x = a.dateTime.toLowerCase();
			    let y = b.dateTime.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingDateD: function() {
			this.ordersForDelivery.sort(function(a, b){
			    let x = a.dateTime.toLowerCase();
			    let y = b.dateTime.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		
		filter: function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.ordersForDelivery;
            }

            let ret = [];
            
            let containsStatus = false;
            let containsType = false;
            
            for (let order of this.ordersForDelivery) {
            	for (let type of this.types) {
            		if (this.checkedFilter.includes(type)) {
            			if (this.checkedFilter.includes("PROCESSING")) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type && order.orderStatus === "PROCESSING") {
            						ret.push(order);
            					}
            				});
            				containsStatus = true;
            			}
            			if (this.checkedFilter.includes("IN_PREPARATION")) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type && order.orderStatus === "IN_PREPARATION") {
            						ret.push(order);
            					}
            				});
            				containsStatus = true;
            			}
            			if (this.checkedFilter.includes("WAITING_DELIVERY")) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type && order.orderStatus === "WAITING_DELIVERY") {
            						ret.push(order);
            					}
            				});
            				containsStatus = true;
            			}
            			if (this.checkedFilter.includes("IN_TRANSPORT")) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type && order.orderStatus === "IN_TRANSPORT") {
            						ret.push(order);
            					}
            				});
            				containsStatus = true;
            			}
            			if (this.checkedFilter.includes("DELIVERED")) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type && order.orderStatus === "DELIVERED") {
            						ret.push(order);
            					}
            				});
            				containsStatus = true;
            			}
            			if (this.checkedFilter.includes("CANCELED")) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type && order.orderStatus === "CANCELED") {
            						ret.push(order);
            					}
            				});
            				containsStatus = true;
            			}
            			if (!containsStatus) {
            				axios.get('rest/data/getTypeForRestaurant/' + order.restaurantName)
            				.then(response => {
            					if (response.data === type) {
            						ret.push(order);
            					}
            				});
            			}
            			containsType = true;
            		}
            	}
            }
            
            if (!containsType) {
            	if (this.checkedFilter.includes("PROCESSING")) {
    				for (let order of this.ordersForDelivery) {
    					if (order.orderStatus === "PROCESSING") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("IN_PREPARATION")) {
    				for (let order of this.ordersForDelivery) {
    					if (order.orderStatus === "IN_PREPARATION") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("WAITING_DELIVERY")) {
    				for (let order of this.ordersForDelivery) {
    					if (order.orderStatus === "WAITING_DELIVERY") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("IN_TRANSPORT")) {
    				for (let order of this.ordersForDelivery) {
    					if (order.orderStatus === "IN_TRANSPORT") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("DELIVERED")) {
    				for (let order of this.ordersForDelivery) {
    					if (order.orderStatus === "DELIVERED") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("CANCELED")) {
    				for (let order of this.ordersForDelivery) {
    					if (order.orderStatus === "CANCELED") {
    						ret.push(order);
    					}
    				}
    			}
            }
            
            this.ordersForDelivery = ret;
		},
    },

    mounted() {
    	axios.get('rest/data/getOrdersForDelivery').then(response => this.ordersForDelivery = response.data);

    	axios.get('rest/data/getTypesOfRestaurants')
    	.then(response => {
    		this.types = response.data
    	});
    }
});
