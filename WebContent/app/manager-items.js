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
        	backupItem: {
        		name: null,
        		price: null,
        		type: null,
        		restaurantName: null,
        		quantity: '',
        		description: '',
        		image: null,
        	},
        	editing: false,
        	
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
	                    <tr v-for="i in items" v-if="!i.deleted">
	                    	<td>{{i.name}}</td>
	                        <td><img style="width: 200px; cursor: pointer;" :src="i.image" alt="Logo ne postoji" onclick="window.open(this.src)" /></td>
	                		<td>{{i.price}}</td>
                            <td>{{i.type}}</td>
                            <td>{{i.quantity}}</td>
                            <td>{{i.description}}</td>
                            <td>
                    			<button class="btn btn-primary" v-on:click="onClickEdit(i)" >Izmeni</button>
                            	<button class="btn btn-danger" v-on:click="deleteItem(i)" >Obriši</button>
                			</td>
	                    </tr>
	                </tbody>
	                
	            </table>
            </div>
            
            <div class='card-body' v-if="editing">
                <h3>Izmena postojećeg artikla</h3>

                <table>
                    <tr>
                        <td>Naziv</td>
                        <td><input type="text" v-model="backupItem.name" disabled/></td>
                    </tr>
                    <tr>
                        <td>Cena (RSD)</td>
                        <td><input type="number" v-model="backupItem.price" min="0"/></td>
                    </tr>
                    <tr>
                        <td>Tip</td>
                        <td><input type="text" v-model="backupItem.type"/></td>
                    </tr>

                    <tr>
                        <td>Slika</td>
                        <td><input class="btn btn-primary" type="file" accept="image/*" v-on:change="onFileChanged" /></td>
                    </tr>

                    <tr>
                        <td>Opis</td>
                        <td><input type="text" v-model="backupItem.description"/></td>
                    </tr>
                    <tr>
                        <td>Količina</td>
                        <td><input type="text" v-model="backupItem.quantity"/></td>
                    </tr>


                    <tr>
                        <td>
                            <button class="btn btn-primary" v-on:click="editItem()">Izmeni artikal</button>
                            <button class="btn btn-danger" v-on:click="cancelEdit()">Odustani</button>
                        </td>
                    </tr>
                </table>

            </div>


            <div class='card-body' v-if="!editing">
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
									this.selectedImage = null;
									this.items.push(response.data)
								}
							});
						}
					});
				}
			});
		},
		
		onClickEdit: function(itemToEdit) {
			this.editing = true;
			this.backupItem = Object.assign({}, itemToEdit);
		},
		
		editItem: function() {
			if (!this.checkIfInputsAreFilled2()) {
				return
			}
			axios.post('rest/data/editItem', this.backupItem)
			.then(response => {
                if (response.data === '') {
                    toast('Došlo je do greške prilikom izmene artikla..');
                    return;
                }
                
                let itemToEdit = this.restaurant.items.find(obj => obj.name === this.backupItem.name);
                this.copyDataIntoObject(itemToEdit, response.data)

                if (this.selectedImage != null) {
                    const formData = new FormData();
                    formData.append('restaurantName', this.restaurant.name);
					formData.append('itemName', this.backupItem.name);
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
									this.selectedImage = null;
									itemToEdit.image = response.data.image;
								}
							});
						}
					});
                }
            });
			this.cancelEdit();
			
		},
		
		deleteItem: function(itemToDelete) {
			axios.get('rest/data/deleteItem/' + itemToDelete.restaurantName + '/' + itemToDelete.name)
			.then (response => {
				if (response.data == '') {
					toastt('Greška prilikom brisanja artikla!')
					return
				}
				let itemToEdit = this.restaurant.items.find(obj => obj.name === itemToDelete.name);
				itemToEdit.deleted = true;
				toastt('asdasda', itemToEdit)
				console.log(itemToEdit);
				//this.backupItem = Object.assign({}, itemToEdit);
			});
		},
		
		copyDataIntoObject : function(toObj, fromObj) {
            toObj.price = fromObj.price;
            toObj.type = fromObj.type;
            toObj.description = fromObj.description;
            toObj.quantity = fromObj.quantity;
        },

        cancelEdit() {
        	this.editing = false;
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
		},
		
		checkIfInputsAreFilled2: function() {
			if (this.backupItem.name === null || this.backupItem.name.trim() === '') {
				toastt('Niste uneli naziv artikla!!')
				return false
			}
			if (this.backupItem.price === null) {
				toastt('Niste uneli cenu artikla!!')
				return false
			}
			if (this.backupItem.type === null || this.backupItem.type.trim() === '') {
				toastt('Niste uneli tip artikla!!')
				return false
			}
//			if (this.selectedImage === null) {
//				toastt('Niste odabrali sliku artikla!')
//				return false
//			}
			return true			
		},
    },

    mounted() {
    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => {
    		this.restaurant = response.data;
    		this.items = this.restaurant.items;
    	});
    }
});