Vue.component('all-users', {
    data: function() {
        return {
            users: [],
            usersBackup: [],
            searchUsername: null,
            searchName: null,
            searchSurname: null,
            
            
            //sort
            usersSorted: [],
            sorting: false,
            
            userM: {
                username: null,
                password: null,
                name: null,
                surname: null,
                gender: null,
                dateOfBirth: null,
            },
            userD: {
                username: null,
                password: null,
                name: null,
                surname: null,
                gender: null,
                dateOfBirth: null,
            },
            managerAdd: false,
            deliveryManAdd: false,
            
        }
    },

    template:
    `
    <div>
	    <div class='card'>
	        <div class='card-header'>
	            <h2>Svi korisnici sistema:</h2>
	        </div>
	
	        <div class='card-body'>
	            <table class="table table-hover table-dark">
	                <thead>
	                    <tr>
	                        <th scope="col">Korisničko ime</th>
	                        <th scope="col">Ime</th>
	                        <th scope="col">Prezime</th>
	                        <th scope="col">Pol</th>
	                        <th scope="col">Uloga</th>
	                        <th scope="col">Datum rodjenja</th>
	                    </tr>
	                </thead>
	                <tbody v-if="!sorting">
	                    <tr v-for="user in users">
	                    	<td>{{user.username}}</td>
	                		<td>{{user.name}}</td>
	                		<td>{{user.surname}}</td>
	                		<td>{{user.gender}}</td>
	                		<td>{{user.userType}}</td>
	                		<td>{{user.dateOfBirth}}</td>
	                    </tr>
	                </tbody>
	                
	                <tbody v-if="sorting">
	                    <tr v-for="user in usersSorted">
	                    	<td>{{user.username}}</td>
	                		<td>{{user.name}}</td>
	                		<td>{{user.surname}}</td>
	                		<td>{{user.gender}}</td>
	                		<td>{{user.userType}}</td>
	                		<td>{{user.dateOfBirth}}</td>
	                    </tr>
	                </tbody>
	                
	            </table>
	            
	            <table class="table table-hover w-50" style="float: left;" v-if="!sorting">
	                
	                <tbody>
	                    <tr>
	                        <th><label>Pretraži korisnike po korisničkom imenu:</label></th>
	                        <td><input type="text" v-model="searchUsername"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByUsername()">Pretraži</button></td>
	                    </tr>
	                    <tr>
	                        <th><label>Pretraži korisnike po imenu:</label></th>
	                        <td><input type="text" v-model="searchName"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchByName()">Pretraži</button></td>
	                    </tr>
	                    <tr>
	                        <th><label>Pretraži korisnike po prezimenu:</label></th>
	                        <td><input type="text" v-model="searchSurname"/></td>
	                        <td><button type="button" class="btn btn-dark" v-on:click="searchBySurname()">Pretraži</button></td>
	                    </tr>
	    				<tr>
	                        <td colspan="3"><button type="button" class="btn btn-dark btn-block" v-on:click="resetSearch()">Resetuj pretragu</button></td>
	                    </tr>
	
	                </tbody>
	            </table>
	            
	            <table class="w-25" style="float: left;">
	                
	                <tbody>
	                    <tr>
	                        <th>Sortiranje</th>
	                    </tr>
	                    <tr>
	                        <td>
	                            <select v-on:change="sortiranje($event)">
	                                <option>Odaberite sortiranje</option>
	                                                            
	                                <option value="sortNameA">Ime(rastuće)</option>
	                                <option value="sortNameD">Ime(opadajuće)</option>
	                                
	                                <option value="sortSurnameA">Prezime(rastuće)</option>
	                                <option value="sortSurnameD">Prezime(opadajuće)</option>
	                                
	                                <option value="sortUsernameA">Korisnicko ime(rastuće)</option>
	                                <option value="sortUsernameD">Korisnicko ime(opadajuće)</option>
	                                
	                                <option>Broju bodova(rastuće)</option>
	                                <option>Broju bodova(opadajuće)</option>
	                            </select>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td><button type="button" class="btn btn-dark btn-block" @click="cancelSort()">Poništi sortiranje</button></td>
	                    </tr>
	
	                </tbody>
	            </table>
	
	            <table class="w-25" style="float: left;" v-if="!sorting">
	                <tbody>
	                    <tr>
	                        <th>Filtriranje</th>
	                    </tr>
	
	                    <tr>
	                        <th>
	                            Uloga:
	                        </th>
	                        <th>
	                            Tip Kupca
	                        </th> 
	                    </tr>
	
	                    <tr>
	                        <td>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="adminCheck">
	                                <label class="custom-control-label" for="adminCheck">Administrator</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="managerCheck">
	                                <label class="custom-control-label" for="managerCheck">Menadžer</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="buyerCheck">
	                                <label class="custom-control-label" for="buyerCheck">Kupac</label>
	                            </div>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="deliveryManCheck">
	                                <label class="custom-control-label" for="deliveryManCheck">Dostavljač</label>
	                            </div>
	                        </td>
	                        <td>
	                            <div class="custom-control custom-checkbox m-2">
	                                <input type="checkbox" class="custom-control-input" id="ch1">
	                                <label class="custom-control-label" for="ch1">Uradi tip kupca</label>
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colspan="2"><button type="button" class="btn btn-dark btn-block">Primeni filtere</button></td>
	                    </tr>
	                    <tr>
	                        <td colspan="2"><button type="button" class="btn btn-dark btn-block">Poništi filtere</button></td>
	                    </tr>
	                </tbody>
	            </table>
	            
	        </div>
	    </div>
	    
	    <div class="card">
        <h5 class="card-header">Dodavanje menadžera ili dostavljača</h5>

        <div class="card-body">
            <div class="m-2" style="float: left; width: 45%;">
                <button v-if="!managerAdd && !deliveryManAdd" type="button" class="btn btn-primary" v-on:click="showAddManager()">Menadžer</button>

                <div v-if="managerAdd">
                    <table class="table-form">
                        <tr>
                            <td>Korisničko ime</td>
                            <td><input type="text" v-model="userM.username" /></td>
                        </tr>
                        <tr>
                            <td>Lozinka</td>
                            <td><input type="password" v-model="userM.password" /></td>
                        </tr>
                        <tr>
                            <td>Ime</td>
                            <td><input type="text" v-model="userM.name" /></td>
                        </tr>
                        <tr>
                            <td>Prezime</td>
                            <td><input type="text" v-model="userM.surname" /></td>
                        </tr>
                        <tr>
                            <td>Pol</td>
                            <td>
                                <select v-model="userM.gender">
                                    <option value="MALE" selected>Muški</option>
                                    <option value="FEMALE">Ženski</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Datum rodjenja</td>
                            <td><input type="date" v-model="userM.dateOfBirth" /></td>
                        </tr>
                        <tr>
                            <th><button type="button" class="btn btn-primary" v-on:click="addManager()" >Dodaj menadžera</button></th>
                            <th><button type="button" class="btn btn-danger" v-on:click="cancelM()" >Odustani</button></th>
                        </tr>
                    </table>
                </div>
            
            </div>



            <div class="m-2" style="float: left; width: 45%;">
                <button v-if="!managerAdd && !deliveryManAdd" type="button" class="btn btn-primary" v-on:click="showAddDeliverer()">Dostavljač</button>

                <div v-if="deliveryManAdd">
                    <table class="table-form">
                        <tr>
                            <td>Korisničko ime</td>
                            <td><input type="text" v-model="userD.username" /></td>
                        </tr>
                        <tr>
                            <td>Lozinka</td>
                            <td><input type="password" v-model="userD.password" /></td>
                        </tr>
                        <tr>
                            <td>Ime</td>
                            <td><input type="text" v-model="userD.name" /></td>
                        </tr>
                        <tr>
                            <td>Prezime</td>
                            <td><input type="text" v-model="userD.surname" /></td>
                        </tr>
                        <tr>
                            <td>Pol</td>
                            <td>
                                <select v-model="userD.gender">
                                    <option value="MALE" selected>Muški</option>
                                    <option value="FEMALE">Ženski</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Datum rodjenja</td>
                            <td><input type="date" v-model="userD.dateOfBirth" /></td>
                        </tr>
                        <tr>
                            <th><button type="button" class="btn btn-primary" v-on:click="addDeliverer()" >Dodaj dostavljača</button></th>
                            <th><button type="button" class="btn btn-danger" v-on:click="cancelD()" >Odustani</button></th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
    `,

    methods: {
    	getAllUsers : function() {
            axios.get('rest/data/getAllUsers').then(response => this.users = response.data);
            
        },
        
        searchByUsername : function() {
			toastt('Search username')
			if (this.usersBackup.length == 0) {
                this.usersBackup = this.users;
            } else {
                this.users = this.usersBackup;
            }

            let ret = [];

            for (let user of this.users) {
                if (user.username.toLowerCase() === this.searchUsername.toLowerCase()) {
                    ret.push(user);
                }
            }

            this.users = ret;
            //return ret;
		},
		
		searchByName : function() {
            toastt('Search name')
            if (this.usersBackup.length == 0) {
                this.usersBackup = this.users;
            } else {
                this.users = this.usersBackup;
            }

            let ret = [];

            for (let user of this.users) {
                if (user.name.toLowerCase() === this.searchName.toLowerCase()) {
                    ret.push(user);
                }
            }

            this.users = ret;
            //return ret;
		},
		
		searchBySurname: function() {
            toastt('Search surname');
            if (this.usersBackup.length == 0) {
                this.usersBackup = this.users;
            } else {
                this.users = this.usersBackup;
            }

            let ret = [];

            for (let user of this.users) {
                if (user.surname.toLowerCase() === this.searchSurname.toLowerCase()) {
                    ret.push(user);
                }
            }

            this.users = ret;
            //return ret;
		},
		
		resetSearch: function() {
			if (this.usersBackup.length == 0) {
                this.usersBackup = this.users;
            }
			this.users = this.usersBackup;
		},
		
		// f-je sortiranja
		cancelSort: function () {
			this.sorting = false;
			this.usersSorted = [];
		},
		sortiranje: function(event) {
			if(event.target.value === "sortNameA") {
				this.sortingNameA();
			}
			if(event.target.value === "sortNameD") {
				this.sortingNameD();
			}
			if(event.target.value === "sortSurnameA") {
				this.sortingSurnameA();
			}
			if(event.target.value === "sortSurnameD") {
				this.sortingSurnameD();
			}
			if(event.target.value === "sortUsernameA") {
				this.sortingUsernameA();
			}
			if(event.target.value === "sortUsernameD") {
				this.sortingUsernameD();
			}
			
		},
		sortingNameA: function() {
			axios.get('rest/data/getUsersSortNameA').then(response => this.usersSorted = response.data);
			this.sorting = true;
		},
		sortingNameD: function() {
			axios.get('rest/data/getUsersSortNameD').then(response => this.usersSorted = response.data);
			this.sorting = true;
		},
		sortingSurnameA: function() {
			axios.get('rest/data/getUsersSortSurnameA').then(response => this.usersSorted = response.data);
			this.sorting = true;
		},
		sortingSurnameD: function() {
			axios.get('rest/data/getUsersSortSurnameD').then(response => this.usersSorted = response.data);
			this.sorting = true;
		},
		sortingUsernameA: function() {
			axios.get('rest/data/getUsersSortUsernameA').then(response => this.usersSorted = response.data);
			this.sorting = true;
		},
		sortingUsernameD: function() {
			axios.get('rest/data/getUsersSortUsernameD').then(response => this.usersSorted = response.data);
			this.sorting = true;
		},
		
		
		showAddManager: function() {
			this.managerAdd = true;
			this.deliveryManAdd = false;
		},
		showAddDeliverer: function () {
			this.managerAdd = false;
			this.deliveryManAdd = true;
		},
		cancelM: function() {
			this.managerAdd = false;
			this.deliveryManAdd = false;
			this.userM.username = '';
			this.userM.password = '';
			this.userM.name = '';
			this.userM.surname = '';
			this.userM.gender = '';
			this.userM.dateOfBirth = null;
		},
		cancelD: function() {
			this.managerAdd = false;
			this.deliveryManAdd = false;
			this.userD.username = '';
			this.userD.password = '';
			this.userD.name = '';
			this.userD.surname = '';
			this.userD.gender = '';
			this.userD.dateOfBirth = null;
		},
		
		addManager: function() {
			if (!this.checkIfInputsAreFilledM()) {
				return;
			}
			
			axios.post('rest/data/addManager', this.userM)
			.then(response => {
				if (response.data === '') {
                    toastt('Greška prilikom kreiranja menadžera. Korisničko ime je zauzeto.');
				} else {
					toastt('Uspešno kreiranje menadžera!')
				}				
			})
		}, 
		addDeliverer: function() {
			if (!this.checkIfInputsAreFilledD()) {
				return;
			}
			
			axios.post('rest/data/addDeliveryMan', this.userD)
			.then(response => {
				if (response.data === '') {
                    toastt('Greška prilikom kreiranja dostavljača. Korisničko ime je zauzeto.');
				} else {
					toastt('Uspešno kreiranje dostavljača!')
				}				
			})
		},
		checkIfInputsAreFilledM: function() {
			if (this.userM.username == null || this.userM.username.trim() === '' ||
					this.userM.password == null || this.userM.password.trim() === '' ||
					this.userM.name == null || this.userM.name.trim() === '' ||
					this.userM.surname == null || this.userM.surname.trim() === '' ||
					this.userM.gender == null || this.userM.gender.trim() === '' ||
					this.userM.dateOfBirth == null) {
				toastt('Niste uneli sva potrebna polja!');
				return false;
			}
			return true;
		},
		checkIfInputsAreFilledD: function() {
			if (this.userD.username == null || this.userD.username.trim() === '' ||
					this.userD.password == null || this.userD.password.trim() === '' ||
					this.userD.name == null || this.userD.name.trim() === '' ||
					this.userD.surname == null || this.userD.surname.trim() === '' ||
					this.userD.gender == null || this.userD.gender.trim() === '' ||
					this.userD.dateOfBirth == null) {
				toastt('Niste uneli sva potrebna polja!');
				return false;
			}
			return true;
		},
		
		
    },
    

    mounted() {
        this.getAllUsers();
    }
});
