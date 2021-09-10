Vue.component('delivery-man-myDeliveries', {
    data: function() {
    	return {
    		orders: [],
    		requests: [],
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
                <h2>Porudžbine koje ja dostavljam:</h2>
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
                            	<template>
									<tr>
										<td>{{o.location.place}} {{o.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{o.location.street}} {{o.location.number}}</td>
									</tr>
								</template>
                            <td>{{o.orderStatus}}</td>
                            
                            <td v-if="o.orderStatus === 'IN_TRANSPORT'"><button class="btn btn-primary" @click="arrived(o)">Dostavljeno</button></td>

	                    </tr>
	                </tbody>
	            </table>
            </div>
            
            
            <div class='card-header'>
                <h2>Zahtevi za porudžbine koje sam napravio:</h2>
            </div>
            
            <div class='card-body'>
            	<table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">ID porudžbine</th>
                            <th scope="col">Status zahteva</th>
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="r in requests">
                            <td>{{r.idOrder}}</td>
                            <td>{{r.requestStatus}}</td>
	                    </tr>
	                </tbody>
	            </table>
            </div>
            
    	</div>


    </div>
    `,

    methods: {
    	arrived: function(order) {
    		axios.put('rest/data/arrivedOrder', order)
    		.then(response => {
				if (response.data === '') {
					toastt('Greška prilikom menjana porudžbine u dostavljeno!');
				} else {
					toastt('Uspešno promenjena porudžbina u dostavljeno!');

					order.orderStatus = "DELIVERED";
				}
			});
    	},
    },

    mounted() {
    	axios.post('rest/data/getByArrayIds', this.delivery_man.ordersToDeliver).then(response => this.orders = response.data);
    	axios.get('rest/data/getRequestsByUsername/' + this.delivery_man.username).then(response => this.requests = response.data);
        
    }
});
