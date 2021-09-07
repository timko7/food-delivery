Vue.component('restaurants', {

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
        <h1 class='card-body'><a href="#/">Loguj se!</a></h1>
        
        <div class='card' v-if="!showingOne">
	        <div class='card-header'>
	            <h2>Restorani:</h2>
	        </div>
	
	        <div class='card-body'>
	            <table class="table table-hover table-dark">
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
	                    <tr v-for="rest in restaurants">
                            <td><a href="#" v-on:click="showRestaurant(rest)">{{rest.name}}</a></td>
	                		<td>{{rest.type}}</td>
	                		<td>
	                			<template>
									<tr>
										<td>{{rest.location.place}} {{rest.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{rest.location.street}} {{rest.location.number}}</td>
									</tr>
									<tr>
										<td>{{rest.location.longitude}}, {{rest.location.latitude}}</td>
									</tr>
								</template>
							</td>
	                		<td>{{rest.averageRating}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="rest.logo" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
                            <td v-if="rest.open">OTVOREN</td>
                            <td v-if="!rest.open">ZATVOREN</td>
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
                            <td>
                            	<template>
									<tr>
										<td>{{restaurantBackup.location.place}} {{restaurantBackup.location.postalCode}}</td>
									</tr>
									<tr>
										<td>{{restaurantBackup.location.street}} {{restaurantBackup.location.number}}</td>
									</tr>
									<tr>
										<td>{{restaurantBackup.location.longitude}}, {{restaurantBackup.location.latitude}}</td>
									</tr>
								</template>
    						</td>
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
	                    <tr v-for="(i) in restaurantBackup.items" v-if="!i.deleted">
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
                
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
                            <th scope="col">Korisničko ime kupca</th>
                            <th scope="col">Tekst komentara</th>
                            <th scope="col">Ocena</th>
                            <th scope="col">Status komentara</th>
                        </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="c in restaurantBackup.comments">
                            <td>{{c.buyerUsername}}</td>
                            <td>{{c.text}}</td>
                            <td>{{c.rating}}</td>
                            <td>{{c.commentStatus}}</td>
	                    </tr>
	                </tbody>
	                
	            </table>

            </div>

        </div>
        
    </div>
    `,

    methods: {
    	getRestaurantsOpenFirst: function() {
            axios.get('rest/data/getRestaurantsOpenFirst').then(response => this.restaurants = response.data);
		},
		
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
    	this.getRestaurantsOpenFirst();
    },
});