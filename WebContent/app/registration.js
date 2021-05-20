Vue.component('registration', {

    data: function() {
        return {
            user: {
                username: null,
                password: null,
                name: null,
                surname: null,
                gender: null,
            },
            passwordAgain: null,
            usnameE: false,
            passE: false,
            passAE: false,
            nameE: false,
            snameE: false,
            genderE: false,
        }
    },

    template: 
    `
    <div>
        <table align="center" class="table-form">
            <tr>
            	<th colspan="2">Popunite sledeća polja za registraciju:</th></tr>
            <tr>
            	<td>Korisničko ime</td>
            	<td><input type="text" v-model="user.username" />
            	<label v-if="usnameE" style="color: red">Niste uneli korisničko ime!!</label></td>
            </tr>
            <tr>
            	<td>Lozinka</td>
            	<td><input type="password" v-model="user.password" />
    			<label v-if="passE" style="color: red">Niste uneli lozinku!!</label></td>
            </tr>
            <tr>
            	<td>Ponovite lozinku</td>
            	<td><input type="password" v-model="passwordAgain" />
            	<label v-if="passAE" style="color: red">Niste uneli ponovnu lozinku!!</label></td>
            </tr>
            <tr>
            	<td>Ime</td>
            	<td><input type="text" v-model="user.name" />
            	<label v-if="nameE" style="color: red">Niste uneli ime!!</label></td>
            </tr>
            <tr>
            	<td>Prezime</td>
            	<td><input type="text" v-model="user.surname" />
            	<label v-if="snameE" style="color: red">Niste uneli prezime!!</label></td>
            </tr>
             <tr>
            	<td>Pol</td>
            	<td>
            		<select v-model="user.gender">
					    <option value="MALE">Muški</option>
					    <option value="FEMALE" selected>Ženski</option>
					</select>
            	<label v-if="genderE" style="color: red">Niste odabrali pol!!</label></td>
            </tr>
            <tr>
            	<th colspan="2"><input type="button" value="Registruj se" v-on:click="register()" /></th>
            </tr>
        </table>
    </div>
    `,

    methods: {

        register : function() {
            if (!this.checkIfInputsAreFilled()) {
                return;
            }

            if (this.passwordAgain !== this.user.password) {
                toastt('Lozinke koje ste uneli se ne poklapaju. Pokuštajte ponovo.');
                return;
            }

            const formData = new FormData();
            formData.append('user', this.user);

            axios.post('rest/log/registration', this.user)
            .then(response => {
                if (response.data === '') { // registration error
                    toastt('Greška prilikom registrovanja naloga. Korisničko ime je zauzeto.');
                } else {
                    router.push('/');
                }
            });
        },

        checkIfInputsAreFilled : function() {
            if (this.user.username == null || this.user.username.trim() === '') {
                toastt('Niste uneli korisničko ime.');
                this.usnameE = true;
                return false;
            } else {
            	this.usnameE = false;
            }
            
            if (this.user.password == null || this.user.username.trim() === '') {
                toastt('Niste uneli lozinku.');
                this.passE = true;
                return false;
            } else {
            	this.passE = false;
            }
            
            if (this.passwordAgain == null || this.passwordAgain.trim() === '') {
                toastt('Niste uneli ponovnu lozinku.');
                this.passAE = true;
                return false;
            } else {
            	this.passAE = false;
            }
            
            if (this.user.name == null || this.user.name.trim() === '') {
                toastt('Niste uneli ime.');
                this.nameE = true;
                return false;
            } else {
            	this.nameE = false;
            }
            
            if (this.user.surname == null || this.user.surname.trim() === '') {
                toastt('Niste uneli prezime.');
                this.snameE = true;
                return false;
            } else {
            	this.snameE = false;
            }
            
            if (this.user.gender == null || this.user.gender.trim() === '') {
            	toastt('Niste odabrali pol.');
            	this.genderE = true
            	return false;
            } else {
            	this.genderE = false;
            }
            
            this.usnameE = false;
            this.passE = false;
            this.passAE = false;
            this.nameE = false;
            this.snameE = false;
            this.genderE = false;
                        
            return true;
        }
    },

    mounted() {
    },
});