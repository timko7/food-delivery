Vue.component('admin-page', {
    data: function() {
    	return {
    		currentComponent: 'profile-settings',
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
            <li><a href="#" v-on:click="showComponent('all-users')">Korisnici</a></li>
            <li><a href="#" v-on:click="showComponent('admin-restaurants')">Restorani</a></li>
    		<li><a href="#" v-on:click="logout()">Odjavi se</a></li>
            
    	</ul>
    	
    	<component :is="currentComponent" :user="user"></component>
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

    }
});
