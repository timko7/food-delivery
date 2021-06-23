Vue.component('buyer-restaurants', {
	data: function() {
        return {
        	restaurants: [],
        	restaurantBackup: null,
        	showingOne: false,
        }
    },
    
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
	                    </tr>
	                </tbody>
	            </table>
            </div>

            <div class='card-header'>
                <h2>Komentari restorana</h2>
            </div>

            <div class='card-body'>
                
                Komentari...

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
    },

    mounted() {
    	axios.get('rest/data/getRestaurantsOpenFirst').then(response => this.restaurants = response.data);
    }
});