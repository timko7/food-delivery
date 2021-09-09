Vue.component('buyer-orders', {
	data: function() {
        return {
        	commenting: false,
        	restaurantBackup: "",
        	orderBackup:null,
        	newComment: {
        		buyerUsername: "",
        		text: "",
        		rating: null,
        	},
        	
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
        'buyer',
    ],
    
    template:
    `
    <div>
    	
    	<div class="card">
    		<div class='card-body'>
    			<h3>Tip kupca: </h3>
    			<div>
				  <ul class="list-group list-group-flush">
				    <li class="list-group-item">Kategorija kupca: {{ buyer.typeBuyer.name }}</li>
				    <li class="list-group-item">Popust pri porudžbini: {{ buyer.typeBuyer.discount }} %</li>
				    <li class="list-group-item">Potreban broj bodova za sledeću kategoriju: {{ buyer.typeBuyer.requiredPointsForNext }} </li>
				    <li class="list-group-item">Trenutni broj bodova: {{ buyer.points }}</li>
				  </ul>
				</div>
    		</div>
    	</div>
    	
		
    	<div class="card" v-if="!commenting">
    	
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
	                    <tr v-for="o in buyer.orders" v-if="o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELED'">
	                    
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
                            
                            <td v-if="o.orderStatus === 'PROCESSING'"><button class="btn btn-primary" @click="cancelOrder(o)">OTKAŽI</button></td>
                            
	                    </tr>
	                </tbody>
	                
	            </table>
            </div>
            
    		
            <div class='card-header'>
                <h2>Moje sve porudžbine:</h2>
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
	                    <tr v-for="o in buyer.orders">
	                    
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
                            
                            <td v-if="o.orderStatus === 'PROCESSING'"><button class="btn btn-primary" @click="cancelOrder(o)">OTKAŽI</button></td>
                            <td v-if="o.orderStatus === 'DELIVERED'"><button class="btn btn-primary" @click="makeComment(o)">DODAJ KOMENTAR</button></td>

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
        
        
        
        <div class="card" v-if="commenting">
    	
    		<div class='card-header'>
                <h2>Komentar za restoran: '{{restaurantBackup}}' (porudzbina: {{orderBackup.id}})</h2>
            </div>
            
            <div class='card-body'>

                    <table class="table-form">
                        <tr>
                            <td>Tekst komantara:</td>
                            <td><input type="text" v-model="newComment.text" /></td>
                        </tr>
                        <tr>
                            <td>Ocena:</td>
                            <td>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id1" value="1" name="rating" v-model="newComment.rating" checked>
                                    <label class="custom-control-label" for="id1">1</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id2" value="2" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id2">2</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id3" value="3" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id3">3</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id4" value="4" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id4">4</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">    
                                    <input type="radio" class="custom-control-input" id="id5" value="5" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id5">5</label> 
                                </div>
                            </td>
                            
                        </tr>
                        <tr>
                            <th><button type="button" class="btn btn-primary" v-on:click="addComment()" >Pošalji Komentar</button></th>
                            <th><button type="button" class="btn btn-danger" v-on:click="cancel()" >Odustani</button></th>
                        </tr>
                    </table>

            </div>
        </div>
        
        
    	
    </div>
    `,
        
    methods: {
    	cancelOrder: function(order) {
    		axios.put('rest/data/cancelOrder', order)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greška prilikom otkazivanja porudžbine!!');
				} else {
					toastt('Uspešno otkazana porudžbina!');
					order.orderStatus = "CANCELED";
				}
    		})
    		.catch(error => {
				toastt('Greška prilikom otkazivanja porudžbine!');
    		})
    	},
    	
    	makeComment: function(order) {
    		this.commenting = true;
    		this.restaurantBackup = order.restaurantName;
    		this.orderBackup = order;
    		
    	},
    	
    	cancel: function() {
    		this.commenting = false;
    		this.restaurantBackup = "";
    		this.orderBackup = null;
    		this.newComment.text = "";
    		this.newComment.rating = null;
    		
    	},
    	
    	addComment: function() {
    		if (!this.checkIfInputsAreFilled()) {
				return;
			}
    		
    		this.newComment.buyerUsername = this.buyer.username;
    		console.log("KOMENTAR: ", this.newComment,  this.restaurantBackup)
    		
    		axios.post('rest/data/addComment/' + this.restaurantBackup, this.newComment)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greska prilikom slanja komentara!');
					this.cancel();
				} else {
					toastt('Uspešno poslat komentar..');
					this.cancel();
				}
    		})
    		.catch(error => {
				toastt('Greska prilikom slanja komentara!');
				this.cancel();
    		})
    		
    	},
    	
    	checkIfInputsAreFilled: function() {
    		if (this.restaurantBackup === "" || this.restaurantBackup == null) {
    			toastt('Niste odabrali za koji restoran želite da ostavite komentar!')
				return false
    		}
    		if (this.newComment.text == null || this.newComment.text.trim() === '') {
				toastt('Niste uneli tekst komentara!')
				return false
			}
    		if (this.newComment.rating == null) {
				toastt('Niste odabrali ocenu!')
				return false
			}
    		return true
    	},
    	
    	
    	//search 
    	resetSearch: function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.buyer.orders;
            }
			this.buyer.orders = this.ordersBackup;
			
			this.searchName = "";
			this.searchPriceFrom = null;
			this.searchPriceTo = null;
			this.searchDateFrom = null;
			this.searchDateTo = null;
        	this.checkedFilter = [];

		},
		
		searchByName : function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.buyer.orders;
            } else {
                this.buyer.orders = this.ordersBackup;
            }

            let ret = [];

            for (let order of this.buyer.orders) {
                if (order.restaurantName.toLowerCase() === this.searchName.toLowerCase()) {
                    ret.push(order);
                }
            }

            this.buyer.orders = ret;
            this.checkedFilter = [];
		},
		
		searchByPrice : function() {
			if (this.searchPriceFrom == null || this.searchPriceTo == null || this.searchPriceFrom === "" || this.searchPriceTo === "") {
            	toastt('Neuspela pretraga! Popunite oba polja (od - do)!');
            	return;
            }
			
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.buyer.orders;
            } else {
                this.buyer.orders = this.ordersBackup;
            }

            let ret = [];
            
            for (let order of this.buyer.orders) {
                if (order.price >= this.searchPriceFrom && order.price <= this.searchPriceTo) {
                    ret.push(order);
                }
            }

            this.buyer.orders = ret;
            this.checkedFilter = [];
		},
		
		searchByDate : function() {
			if (this.searchDateFrom == null || this.searchDateTo == null) {
            	toastt('Neuspela pretraga! Popunite oba polja (od - do)!');
            	return;
            }
			
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.buyer.orders;
            } else {
                this.buyer.orders = this.ordersBackup;
            }

            let ret = [];

            searchNewDFrom = new Date(this.searchDateFrom)
            searchNewDTo= new Date(this.searchDateTo)
            
            for (let order of this.buyer.orders) {
            	let d = Date.parse(order.dateTime);
            	newDateOrder = new Date(d);
                if (+newDateOrder >= +searchNewDFrom && +newDateOrder <= +searchNewDTo) {
                    ret.push(order);
                }
            }

            this.buyer.orders = ret;
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
			this.buyer.orders.sort(function(a, b){
			    let x = a.restaurantName.toLowerCase();
			    let y = b.restaurantName.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingNameD: function() {
			this.buyer.orders.sort(function(a, b){
			    let x = a.restaurantName.toLowerCase();
			    let y = b.restaurantName.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingPriceA: function() {
			this.buyer.orders.sort(function(a, b){
			    let x = a.price;
			    let y = b.price;
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingPriceD: function() {
			this.buyer.orders.sort(function(a, b){
				let x = a.price;
			    let y = b.price;
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		sortingDateA: function() {
			this.buyer.orders.sort(function(a, b){
			    let x = a.dateTime.toLowerCase();
			    let y = b.dateTime.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});
		},
		sortingDateD: function() {
			this.buyer.orders.sort(function(a, b){
			    let x = a.dateTime.toLowerCase();
			    let y = b.dateTime.toLowerCase();
			    if (x < y) {return 1;}
			    if (x > y) {return -1;}
			    return 0;
			});
		},
		
		filter: function() {
			if (this.ordersBackup.length == 0) {
                this.ordersBackup = this.buyer.orders;
            }

            let ret = [];
            
            let containsStatus = false;
            let containsType = false;
            
            for (let order of this.buyer.orders) {
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
    				for (let order of this.buyer.orders) {
    					if (order.orderStatus === "PROCESSING") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("IN_PREPARATION")) {
    				for (let order of this.buyer.orders) {
    					if (order.orderStatus === "IN_PREPARATION") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("WAITING_DELIVERY")) {
    				for (let order of this.buyer.orders) {
    					if (order.orderStatus === "WAITING_DELIVERY") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("IN_TRANSPORT")) {
    				for (let order of this.buyer.orders) {
    					if (order.orderStatus === "IN_TRANSPORT") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("DELIVERED")) {
    				for (let order of this.buyer.orders) {
    					if (order.orderStatus === "DELIVERED") {
    						ret.push(order);
    					}
    				}
    			}
    			if (this.checkedFilter.includes("CANCELED")) {
    				for (let order of this.buyer.orders) {
    					if (order.orderStatus === "CANCELED") {
    						ret.push(order);
    					}
    				}
    			}
            }
            
            this.buyer.orders = ret;
		},
    	
    },

    mounted() {
    	axios.get('rest/data/getTypesOfRestaurants')
    	.then(response => {
    		this.types = response.data
    	});
    }
});