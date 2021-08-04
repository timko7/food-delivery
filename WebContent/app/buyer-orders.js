Vue.component('buyer-orders', {
	data: function() {
        return {
        	
        }
    },
    
    props: [
        'buyer',
    ],
    
    template:
    `
    <div>
    	    	
    	<div class="card">
            <div class='card-header'>
                <h2>Moje porudžbine:</h2>
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
                            
	                    </tr>
	                </tbody>
	                
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
				toastt('Greška prilikom izbacivanja iz korpe!');
    		})
    	},
    	
    	
    },

    mounted() {
    	
    }
});