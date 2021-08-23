Vue.component('buyer-orders', {
	data: function() {
        return {
        	commenting: false,
        	restaurantBackup: "",
        	orderBackup:null,
        	newComment: {
        		buyerUsername: "",
        		text: "",
        		rating: null,
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
    		<div class='card-body'>
    			<h3>Tip kupca: </h3>
    			<div>
				  <ul class="list-group list-group-flush">
				    <li class="list-group-item">Kategorija kupca: {{ buyer.typeBuyer.name }}</li>
				    <li class="list-group-item">Popust pri porudžbini: {{ buyer.typeBuyer.discount }}</li>
				    <li class="list-group-item">Potreban broj bodova za sledeću kategoriju: {{ buyer.typeBuyer.requiredPointsForNext }} </li>
				    <li class="list-group-item">Trenutni broj bodova: {{ buyer.points }}</li>
				  </ul>
				</div>
    		</div>
    	</div>
    	
		
    	<div class="card" v-if="!commenting">
    	
    		<div class='card-header'>
                <h2>Nedostavljene porudžbine:</h2>
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
	                    <tr v-for="o in buyer.orders" v-if="o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELED'">
	                    
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
            
    		
            <div class='card-header'>
                <h2>Moje sve porudžbine:</h2>
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
                            <td v-if="o.orderStatus === 'DELIVERED'"><button class="btn btn-primary" @click="makeComment(o)">DODAJ KOMENTAR</button></td>

	                    </tr>
	                </tbody>
	                
	            </table>
            </div>

        </div>
        
        
        
        <div class="card" v-if="commenting">
    	
    		<div class='card-header'>
                <h2>Komentar za restoran: '{{restaurantBackup}}' (porudzbina: {{orderBackup.id}})</h2>
            </div>
            
            <div class='card-body'>

                    <table class="table-form">
                        <tr>
                            <td>Tekst komantara:</td>
                            <td><input type="text" v-model="newComment.text" /></td>
                        </tr>
                        <tr>
                            <td>Ocena:</td>
                            <td>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id1" value="1" name="rating" v-model="newComment.rating" checked>
                                    <label class="custom-control-label" for="id1">1</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id2" value="2" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id2">2</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id3" value="3" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id3">3</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" id="id4" value="4" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id4">4</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">    
                                    <input type="radio" class="custom-control-input" id="id5" value="5" name="rating" v-model="newComment.rating">
                                    <label class="custom-control-label" for="id5">5</label> 
                                </div>
                            </td>
                            
                        </tr>
                        <tr>
                            <th><button type="button" class="btn btn-primary" v-on:click="addComment()" >Pošalji Komentar</button></th>
                            <th><button type="button" class="btn btn-danger" v-on:click="cancel()" >Odustani</button></th>
                        </tr>
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
				toastt('Greška prilikom otkazivanja porudžbine!');
    		})
    	},
    	
    	makeComment: function(order) {
    		this.commenting = true;
    		this.restaurantBackup = order.restaurantName;
    		this.orderBackup = order;
    		
    	},
    	
    	cancel: function() {
    		this.commenting = false;
    		this.restaurantBackup = "";
    		this.orderBackup = null;
    		this.newComment.text = "";
    		this.newComment.rating = null;
    		
    	},
    	
    	addComment: function() {
    		if (!this.checkIfInputsAreFilled()) {
				return;
			}
    		
    		this.newComment.buyerUsername = this.buyer.username;
    		console.log("KOMENTAR: ", this.newComment,  this.restaurantBackup)
    		
    	},
    	
    	checkIfInputsAreFilled: function() {
    		if (this.restaurantBackup === "" || this.restaurantBackup == null) {
    			toastt('Niste odabrali za koji restoran želite da ostavite komentar!')
				return false
    		}
    		if (this.newComment.text == null || this.newComment.text.trim() === '') {
				toastt('Niste uneli tekst komentara!')
				return false
			}
    		if (this.newComment.rating == null) {
				toastt('Niste odabrali ocenu!')
				return false
			}
    		return true
    	}
    	
    	
    },

    mounted() {
    	
    }
});