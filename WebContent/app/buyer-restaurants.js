Vue.component('buyer-restaurants', {
	data: function() {
        return {
        	restaurants: [],
        	restaurantBackup: null,
        	showingOne: false,
        	itemInChartToAdd: {
        		item: null,
        		quantity: null,
        	}
        }
    },
    
    props: [
        'buyer',
    ],
    
    template:
    `
    <div>
    	    	
    	<div class="card" v-if="!showingOne">
            <div class='card-header'>
                <h2>Restorani</h2>
            </div>

            <div class='card-body'>
                
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Tip</th>
                            <th scope="col">Lokacija</th>    			
                            <th scope="col">Prosečna ocena</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Da li radi?</th>
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="r in restaurants">
                            <td><a href="#" v-on:click="showRestaurant(r)">{{r.name}}</a></td>
                            <td>{{r.type}}</td>
                            <td>{{r.location.place}}</td>
                            <td>{{r.averageRating}}</td>
                            <td><img style="width: 100px; cursor: pointer;" :src="r.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="r.open">OTVOREN</td>
                            <td v-if="!r.open">ZATVOREN</td>
	                    </tr>
	                </tbody>
	                
	            </table>

            </div>


        </div>
        
        <div class="card" v-if="showingOne">
            <div class='card-header'>
                <h2>Prikaz jednog restorana</h2>
                <button class="btn btn-primary" v-on:click="showAll()">Prikaži sve restorane</button>
            </div>

            <div class='card-body'>
                
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Tip</th>
                            <th scope="col">Lokacija</th>    			
                            <th scope="col">Prosečna ocena</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Da li radi?</th>
                        </tr>
	                </thead>
	                <tbody>
	                    <tr>
                            <td>{{restaurantBackup.name}}</td>
                            <td>{{restaurantBackup.type}}</td>
                            <td>{{restaurantBackup.location.place}}</td>
                            <td>{{restaurantBackup.averageRating}}</td>
                            <td><img style="width: 100px; cursor: pointer;" :src="restaurantBackup.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="restaurantBackup.open">OTVOREN</td>
                            <td v-if="!restaurantBackup.open">ZATVOREN</td>
	                    </tr>
	                </tbody>
	            </table>

            </div>

            <div class='card-header'>
                <h2>Artikli restorana</h2>
            </div>

            <div class='card-body'>
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Naziv</th>
                            <th scope="col">Slika</th>
                            <th scope="col">Opis</th>    			
                            <th scope="col">Cena</th>
                        </tr>
	                </thead>
	                <tbody v-if="restaurantBackup.items">
	                    <tr v-for="i in restaurantBackup.items" v-if="!i.deleted">
	                    	<td>{{i.name}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="i.image" alt="Slika ne postoji" /></td>
                            <td>{{i.description}}</td>
	                		<td>{{i.price}}</td>
	                		<td v-if="restaurantBackup.open">
                                <input type="number" min="1" style="width: 50px;" value="1" v-model="itemInChartToAdd.quantity"/>
                                <button class="btn btn-primary" v-on:click="addInCart(i)">Dodaj u korpu</button>
	                		</td>
	                    </tr>
	                </tbody>
	            </table>
            </div>

            <div class='card-header'>
                <h2>Komentari restorana</h2>
            </div>

            <div class='card-body'>
                
                Komentari...
                buyer::
                {{buyer}}

            </div>

        </div>
    	
    </div>
    `,
        
    methods: {
    	showRestaurant: function(rest) {
    		this.restaurantBackup = Object.assign({}, rest);
    		this.showingOne = true;
    	},
    	showAll: function() {
    		this.showingOne = false;
    		this.restaurantBackup = Object.assign({}, {});
    	},
    	
    	addInCart: function(itemToAdd) {
    		if (this.itemInChartToAdd.quantity == null || this.itemInChartToAdd.quantity < 1) {
    			toastt('Količina ne može biti manja od 1!')
    			return
    		}
    		this.itemInChartToAdd.item = Object.assign({}, itemToAdd);
    		
    		//check if an item is from same restaurant as other items in cart
    		axios.post('rest/data/addItemInChartToAdd', this.itemInChartToAdd)
    		.then(response => {
    			if (response.data === '') {
					toastt('Greska prilikom dodavanja u korpu! \n Može se dodati samo iz istog restorana!');
				} else {
					toastt('Uspešno dodato u korpu..');
					this.buyer.cart.itemsInCart.push(response.data);
					this.buyer.cart.price = this.buyer.cart.price + response.data.item.price * response.data.quantity;
				}
    		})
    		.catch(error => {
				toastt('Greska prilikom dodavanja u korpu! \n Može se dodati samo iz istog restorana!');
				console.log('Greska prilikom dodavanja u korpu! \n Može se dodati samo iz istog restorana!');
    		})
    	}
    },

    mounted() {
    	axios.get('rest/data/getRestaurantsOpenFirst').then(response => this.restaurants = response.data);

    }
});