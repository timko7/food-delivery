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
        }
    },

    template:
    `
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
		}
		
    },
    

    mounted() {
        this.getAllUsers();
    }
});
