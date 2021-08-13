Vue.component('delivery-man-waitingDelivery', {
    data: function() {
    	return {
    		ordersForDelivery: [],
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
                            <td>{{o.orderStatus}}</td>
                            
                            <td v-if="o.orderStatus === 'WAITING_DELIVERY'"><button class="btn btn-primary" @click="sendRequest(o)">Pošalji zahtev za dostavu</button></td>

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
    	}
    },

    mounted() {
    	axios.get('rest/data/getOrdersForDelivery').then(response => this.ordersForDelivery = response.data);
    }
});
