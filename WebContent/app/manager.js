Vue.component('manager-page', {
    data: function() {
    	return {
    		currentComponent: 'profile-settings',
    		manager: null,
        }
    },

    props: [
        'user',
    ],

    template:
    `
    <div>
    	<ul class="navbar">
    	
    		<li><a>Dobrodošli, {{ user.name }} {{ user.surname }}</a></li>
    		
            <li><a href="#" v-on:click="showComponent('profile-settings')">Podešavanja profila</a></li>    		
    		<li><a href="#" v-on:click="showComponent('manager-restaurant')">Restoran</a></li>    		
    		<li><a href="#" v-on:click="showComponent('manager-items')">Artikli</a></li>    		
    		<li><a href="#" v-on:click="logout()">Odjavi se</a></li>
            
    	</ul>
    	
    	<component :is="currentComponent" :user="user" :manager="manager"></component>
    </div>
    `,

    methods: {
    	/** Switch between components for <component> tag */
    	showComponent : function(componentName) {
            this.currentComponent = componentName;
        },
        
        /** Http request for logout */
        logout : function() {
    		axios.get('rest/log/logout').then(response => router.go('/'));
        },
        
    },

    mounted() {
    	axios.get('rest/data/getManager/' + this.user.username).then(response => this.manager = response.data);

    }
});
