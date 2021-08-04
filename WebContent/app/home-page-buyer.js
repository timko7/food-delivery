Vue.component('home-page-buyer', {
	data: function() {
		return {
			currentComponent: 'profile-settings',
			buyer: null,
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
    		<li><a href="#" v-on:click="showComponent('buyer-restaurants')">Restorani</a></li>
    		<li><a href="#" v-on:click="showComponent('buyer-orders')">Moje porudžbine</a></li>
    		<li><a href="#" v-on:click="showComponent('buyer-cart')">Korpa</a></li> 
    		
    		
    		<li><a href="#" v-on:click="logout()">Odjavi se</a></li>
    	</ul>
    	
    	<component :is="currentComponent" :user="user" :buyer="buyer"></component>
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
    	axios.get('rest/data/getBuyer').then(response => this.buyer = response.data);
    }
	
});