Vue.component('manager-requests', {
	data: function() {
        return {
        	restaurant: null,
        }
    },
    
    props: [
        'manager',
    ],
    
    template:
    `
    <div>
    
    	<div class="card">
    	
    		<div class='card-header'>
                <h2>Zahtevi za porudžbine koje čekaju dostavu:</h2>
            </div>
            
            <div class='card-body'>
            	<table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">ID porudžbine</th>
                            <th scope="col">Korisničko ime dostavljača</th>
                            <th scope="col">Status zahteva</th>                            
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="r in restaurant.requests">
	                    
                            <td>{{r.idOrder}}</td>
                            <td>{{r.deliveryUsername}}</td>
                            <td>{{r.requestStatus}}</td>
                            
                            <td v-if="r.requestStatus === 'SENT'">
                            	<button class="btn btn-primary" @click="acceptRequest(r)">Odobri zahtev</button>
                            	<button class="btn btn-primary" @click="rejectRequest(r)">Poništi zahtev</button>
                            </td>

	                    </tr>
	                </tbody>
	            </table>
            </div>
            
    	</div>



    </div>
    `,

    methods: {
    	rejectRequest: function(request) {
    		console.log(request)
    		const formData = new FormData();
			formData.append('request', request);
			formData.append('restaurantName', this.restaurant.name);
			
    		axios.put('rest/data/rejectRequest/' + this.restaurant.name, request)
    		.then(response => {
				if (response.data === '') {
					toastt('Greška prilikom poništavanja zahteva!');
				} else {
					toastt('Uspešno poništen zahtev!');
					request.requestStatus = "REJECTED";
				}
			});
    	},
    	
    	acceptRequest: function(request) {
    		console.log(request)
    		const formData = new FormData();
			formData.append('request', request);
			formData.append('restaurantName', this.restaurant.name);
			
    		axios.put('rest/data/acceptRequest/' + this.restaurant.name, request)
    		.then(response => {
				if (response.data === '') {
					toastt('Greška prilikom prihvatanja zahteva!');
				} else {
					toastt('Uspešno prihvaćen zahtev!');
					console.log(response.data)

					request.requestStatus = "ACCEPTED";
				}
			});
    	},
    	
    },

    mounted() {
    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => this.restaurant = response.data);
    }
});
