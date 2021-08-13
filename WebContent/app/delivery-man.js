Vue.component('delivery-man-page', {
    data: function() {
    	return {
    		currentComponent: 'profile-settings',
    		delivery_man: null,
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
    		<li><a href="#" v-on:click="showComponent('delivery-man-waitingDelivery')">Porudžbine za dostavu</a></li>    		
    		<li><a href="#" v-on:click="showComponent('delivery-man-myDeliveries')">Moje dostave i zahtevi</a></li>    		
    		<li><a href="#" v-on:click="logout()">Odjavi se</a></li>
            
    	</ul>
    	
    	<component :is="currentComponent" :user="user" :delivery_man="delivery_man"></component>
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
    	axios.get('rest/data/getDeliveryMan/' + this.user.username).then(response => this.delivery_man = response.data);

    }
});
