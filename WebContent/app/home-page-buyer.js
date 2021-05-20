Vue.component('home-page-buyer', {
	data: function() {
		return {
			
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
            
    		<li><a href="#" v-on:click="logout()">Odjavi se</a></li>
    	</ul>
    	
    	
    </div>
	`,
	
	methods: {
        /** Http request for logout */
        logout : function() {
    		axios.get('rest/log/logout').then(response => router.go('/'));
        },
        
    },

    mounted() {

    }
	
});