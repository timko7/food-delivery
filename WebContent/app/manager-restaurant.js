Vue.component('manager-restaurant', {
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
    	
    	
    	<div>
    		<div class='card-body'>
	            <h3>Osnovne informacije restorana za koji sam zadužen</h3>
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
	            
	            <button v-if="!restaurant.open" type="button" class="btn btn-dark" v-on:click="openRestaurant()" >Otvori restoran</button>
	            <button v-if="restaurant.open" type="button" class="btn btn-dark" v-on:click="closeRestaurant()" >Zatvori restoran</button>
	            
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
    },

    mounted() {
    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => this.restaurant = response.data);
    }
});