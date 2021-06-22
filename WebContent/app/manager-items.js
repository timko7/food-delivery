Vue.component('manager-items', {
	data: function() {
        return {
        	item: {
        		name: null,
        		price: null,
        		type: null,
        		restaurantName: null,
        		quantity: '',
        		description: '',
        		image: null,
        	},
        	selectedImage: null,
        	
        	restaurant: null,
        	items: [],
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
                <h2>Artikli</h2>

            </div>

            <div class='card-body'>
                <h3>Svi artikli restorana</h3>
                <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
	                        <th scope="col">Naziv</th>
	                        <th scope="col">Slika</th>
	                        <th scope="col">Cena</th>
	                        <th scope="col">Tip</th>
                            <th scope="col">Količina</th>
	                        <th scope="col">Opis</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="i in items">
	                    	<td>{{i.name}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="i.image" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
	                		<td>{{i.price}}</td>
                            <td>{{i.type}}</td>
                            <td>{{i.quantity}}</td>
                            <td>{{i.description}}</td>
	                    </tr>
	                </tbody>
	                
	            </table>
            </div>


            <div class='card-body'>
                <h3>Dodavanje novog artikla</h3>
                <table>
                    <tr>
                        <td>Naziv</td>
                        <td><input type="text" v-model="item.name"/></td>
                    </tr>
                    <tr>
                        <td>Cena (RSD)</td>
                        <td><input type="number" v-model="item.price" min="0"/></td>
                    </tr>
                    <tr>
                        <td>Tip</td>
                        <td><input type="text" v-model="item.type"/></td>
                    </tr>

                    <tr>
                        <td>Slika</td>
                        <td><input class="btn btn-primary" type="file" accept="image/*" v-on:change="onFileChanged" /></td>
                    </tr>

                    <tr>
                        <td>Opis (opciono)</td>
                        <td><input type="text" v-model="item.description"/></td>
                    </tr>
                    <tr>
                        <td>Količina (opciono)</td>
                        <td><input type="text" v-model="item.quantity"/></td>
                    </tr>

                    <tr>
                        <td><button class="btn btn-primary" v-on:click="addItem()">Dodaj artikal</button>
                        </td>
                    </tr>
                </table>
            </div>

        </div>

    </div>
    `,
        
    methods: {
    	onFileChanged: function(event) {
			this.selectedImage = event.target.files[0];
		},
		
		addItem: function() {
			if (!this.checkIfInputsAreFilled()) {
				return;
			}
			
			this.item.restaurantName = this.manager.restaurant;
			
			axios.post('rest/data/addItem', this.item)
			.then(response =>{
				if (response.data === '') {
					toastt('Greška prilikom kreiranja artikla! Naziv već postoji!')
					return
				} else {
					toastt('Uspešno kreiran artikal!')
					//this.restaurant.items.push(response.data)
					this.items.push(response.data)
				}
				
				if (this.selectedImage != null) {
					const formData = new FormData();
					formData.append('restaurantName', this.restaurant.name);
					formData.append('itemName', this.item.name);
					formData.append('file', this.selectedImage, this.selectedImage.name);
					
					axios.post('rest/data/addImageItem', formData)
					.then(response => {
						if (response.data === '') {
							toastt('Greska prilikom dodele slike!');
						} else {
							toastt('Uspesno dodata slika..');
							
							axios.post('rest/data/addImageItem2', formData)
							.then(response => {
								if (response.data === '') {
									toastt('Greska prilikom dodele slike2!');
								} else {
									toastt('Uspesno dodata slika2..');
								}
							});
						}
					});
				}
			});
		},
		
		checkIfInputsAreFilled: function() {
			if (this.item.name === null || this.item.name.trim() === '') {
				toastt('Niste uneli naziv artikla!!')
				return false
			}
			if (this.item.price === null || this.item.price.trim() === '') {
				toastt('Niste uneli cenu artikla!!')
				return false
			}
			if (this.item.type === null || this.item.type.trim() === '') {
				toastt('Niste uneli tip artikla!!')
				return false
			}
			if (this.selectedImage === null) {
				toastt('Niste odabrali sliku artikla!')
				return false
			}
			return true			
		}
    },

    mounted() {
    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => {
    		this.restaurant = response.data;
    		this.items = this.restaurant.items;
    	});
    }
});