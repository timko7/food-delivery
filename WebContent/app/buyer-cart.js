Vue.component('buyer-cart', {
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
                <h2>Sadržaj moje korpe</h2>
            </div>

            <div class='card-body'>
                
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Slika</th>
                            <th scope="col">Opis</th>    			
                            <th scope="col">Cena</th>
                            <th scope="col">Količina</th>
                        </tr>
	                </thead>
	                <tbody v-if="buyer.cart.itemsInCart">
	                    <tr v-for="ic in buyer.cart.itemsInCart">
	                    	<td>{{ic.item.name}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="ic.item.image" alt="Slika ne postoji" /></td>
                            <td>{{ic.item.description}}</td>
	                		<td>{{ic.item.price}}</td>
	                		<td>{{ic.quantity}}</td>
	                		
	                		<td>
                                <input v-model="ic.quantity" @change="onChange(ic)" type="number" min="1" style="width: 50px;"/>
                                <button class="btn btn-primary" v-on:click="removeFromCart(ic)">Izbaci iz korpe</button>
	                		</td>
	                    </tr>
	                </tbody>
	                
	            </table>

            </div>


        </div>
        
        
    	
    </div>
    `,
        
    methods: {
    	removeFromCart: function(itemInCart) {
    		axios.put('rest/data/deleteItemInCart', itemInCart)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greška prilikom izbacivanja iz korpe!');
				} else {
					toastt('Uspešno izbacivanje iz korpe!');
					const index = this.buyer.cart.itemsInCart.indexOf(itemInCart);
					if (index > -1) {
						this.buyer.cart.itemsInCart.splice(index, 1);
					}
				}
    		})
    		.catch(error => {
				toastt('Greška prilikom izbacivanja iz korpe!');
    		})
    	},
    	
    	onChange: function(itemInCart) {
    		if (itemInCart.quantity == null || itemInCart.quantity < 1) {
    			toastt('Količina ne sme biti manja od 1!!');
    			itemInCart.quantity = 1;
    			axios.put('rest/data/changeItemInCart', itemInCart)
    			.then(response => {
    				if (response.data === '') {
    					toastt('Greška prilikom promene količine!');
    				} else {
    					toastt('Uspešno promenjena količina u korpi!');
    					itemInCart = response.data;
    				}
    			});
    		} else {
    			axios.put('rest/data/changeItemInCart', itemInCart)
    			.then(response => {
    				if (response.data === '') {
    					toastt('Greška prilikom promene količine!');
    				} else {
    					toastt('Uspešno promenjena količina u korpi!');
    					itemInCart = response.data;
    				}
    			});
    		}
    	},
    },

    mounted() {
    	
    }
});