Vue.component('login', {

    data: function() {
        return {
            user: {
                username: null,
                password: null
            },
            loggedUser: null,
            userLoggedIn: false,
            usnameE: false,
            passE: false
        }
    },

    template:
    `
    <div class="login-form" v-if="!userLoggedIn">
        <table>
            <tr><td><input type="text" placeholder="Unesite korisničko ime" v-model="user.username" /> <label v-if="usnameE" style="color: red">Niste uneli korisničko ime!!</label> </td></tr>
            <tr><td><input type="password" placeholder="Unesite lozinku" v-model="user.password" /> <label v-if="passE" style="color: red">Niste uneli lozinku!!</label> </td></tr>
            <tr><td><input type="button" value="Prijavi se" v-on:click="login()" /></td></tr>
            <tr><td colspan="2"><a href="#/registration">Nemaš nalog? Registruj se!</a></td></tr>
        </table>
    </div>
    <div v-else-if="userLoggedIn">
    	<admin-page v-if="loggedUser.userType === 'ADMIN'" :user="loggedUser"></admin-page>
    	
    </div>
    `,

    methods: {
        login : function() {
            if (!this.checkIfInputsAreFilled()) {
                return;
            }

            axios.post('rest/log/login', this.user)
            .then(response => {
                if (response.data === '') { // user doesn't exists
                    toastt('Nalog sa unetom kombinacijom korisničkog imena i lozinke ne postoji!');
                } else {
                    this.loggedUser = response.data;
                    
                    if (this.loggedUser.blocked === true) {
                        toastt('Vaš nalog je blokiran! Ne možete se prijaviti na aplikaciju!'); 
                    } else {
                        this.userLoggedIn = true;
                    }
                }
            });
        },

        checkIfInputsAreFilled : function() {
            if (this.user.username == null || this.user.username.trim() === '') {
                toastt('Niste uneli korisničko ime!!');
                this.usnameE = true;
                
                return false;
            } else if (this.user.password == null || this.user.password.trim() === '') {
                toastt('Niste uneli lozinku!!');
                this.passE = true;
                
                return false;
            }

            this.usnamE = false;
            this.passE = false;
            return true;            
        }
    },

    mounted() {
        axios.get('rest/log/getUser')
        .then(response => {
            this.loggedUser = response.data;
            this.userLoggedIn = (response.data === '') ? false : true; 
        });
    }

});