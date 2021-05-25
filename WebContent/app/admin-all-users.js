Vue.component('all-users', {
    data: function() {
        return {
            users: [],
            usersBackup: [],
            searchUsername: null,
            searchName: null,
            searchSurname: null,
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
                <tbody>
                    <tr v-for="user in users">
                    	<td>{{user.username}}</td>
                		<td>{{user.name}}</td>
                		<td>{{user.surname}}</td>
                		<td>{{user.gender}}</td>
                		<td>{{user.userType}}</td>
                		<td>{{user.dateOfBirth}}</td>
                    </tr>
                </tbody>
            </table>
            
            <table class="table table-hover w-50">
                
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
		}

    },

    mounted() {
        this.getAllUsers();
    }
});
