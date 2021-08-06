Vue.component('manager-restaurant', {
	data: function() {
        return {
        	restaurant: null,
        	orders: [],
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
	                		<td>{{restaurant.location.place}}</td>
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
    },

    mounted() {
    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => this.restaurant = response.data);
    	axios.get('rest/data/getOrdersByRestaurantName/' + this.manager.restaurant).then(response => this.orders = response.data);
    }
});