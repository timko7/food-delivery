Vue.component('buyer-cart', {
	data: function() {
        return {
        	order: {
        		itemsInCart: [],
        		restaurantName: null,
        		price: null,
        		nameSurname: null,
        		location: {
        			street: null,
					number: null,
					place: null,
					postalCode: null,
        		},
        	},
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
            
            <div class='card-body'>
	            
	    		<div class="d-inline m-1">Ukupna cena porudžbine(u dinarima):</div>
				<div class="d-inline"><u>{{buyer.cart.price}}..</u></div>

    		</div>
    		
    		<div class='card-body' v-if="buyer.cart.itemsInCart.length">
                <table>

                    <tr class="" >
                        <th class="" >Lokacija za dostavu</th>
                    </tr>

                    <tr>
                        <td>Ulica</td>
                        <td><input type="text" v-model="order.location.street" /></td>
                    </tr>
                    <tr>
                        <td>Broj</td>
                        <td><input type="text" v-model="order.location.number" /></td>
                    </tr>
                    <tr>
                        <td>Mesto</td>
                        <td><input type="text" v-model="order.location.place" /></td>
                    </tr>
                    <tr>
                        <td>Poštanski broj</td>
                        <td><input type="text" v-model="order.location.postalCode" /></td>
                    </tr>

                    <tr>
                        <td>
                            <button class="btn btn-primary" @click="makeOrder()">Poruči</button>
                        </td>
                    </tr>
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
						
						let priceCartNew = 0;
    					
    					this.buyer.cart.itemsInCart.forEach(i => {
    						priceCartNew = priceCartNew + i.item.price * i.quantity;
    					})
    					this.buyer.cart.price = priceCartNew;
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
    					let priceCartNew = 0;
    					
    					this.buyer.cart.itemsInCart.forEach(i => {
    						priceCartNew = priceCartNew + i.item.price * i.quantity;
    					})
    					this.buyer.cart.price = priceCartNew;
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
    					let priceCartNew = 0;
    					
    					this.buyer.cart.itemsInCart.forEach(i => {
    						priceCartNew = priceCartNew + i.item.price * i.quantity;
    					})
    					this.buyer.cart.price = priceCartNew;
    				}
    			});
    		}
    	},
    	
    	makeOrder: function() {
    		if (!this.checkIfInputsAreFilled()) {
				return;
			}
    		
    		this.buyer.cart.itemsInCart.forEach(i => {
    			this.order.itemsInCart.push(i);
			})
			
			this.order.restaurantName = this.buyer.cart.itemsInCart[0].item.restaurantName;
    		this.order.price = this.buyer.cart.price;
    		this.order.nameSurname = this.buyer.name + ' ' + this.buyer.surname;
    		console.log('Order::: ', this.order)
			
    		axios.post('rest/data/makeOrder', this.order)
			.then(response => {
				if (response.data === '') {
                    toastt('Greška prilikom kreiranja poridžbine!');
				} else {
					toastt('Uspešno krairana porudžbina! ');
					this.buyer.orders.push(response.data);
					this.buyer.cart.price = 0;
					this.buyer.cart.itemsInCart = [];
					console.log('Posle porudzbine: B:: ', this.buyer.cart)
				}				
			})
			.catch(error => {
				toastt('Greska prilikom kreiranja porudžbine! ');
    		});
    		
    	},
    	
    	checkIfInputsAreFilled: function() {
    		if (this.order.location.street == null || this.order.location.street.trim() === '') {
				toastt('Niste uneli naziv ulice!')
				return false
			}
    		if (this.order.location.number == null || this.order.location.number.trim() === '') {
				toastt('Niste uneli broj kuce!')
				return false
			}
    		if (this.order.location.place == null || this.order.location.place.trim() === '') {
				toastt('Niste uneli naziv mesta!')
				return false
			}
    		if (this.order.location.postalCode == null || this.order.location.postalCode.trim() === '') {
				toastt('Niste uneli poštanski broj!')
				return false
			}
    		
    		return true
    	},
    	
    	
    },

    mounted() {
    	
    }
});