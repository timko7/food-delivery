Vue.component('manager-items', {
	data: function() {
        return {
        	
        }
    },
    
    props: [
        'manager',
    ],
    
    template:
    `
    <div>

        <div class="card">

            <div class='card-header'>
                <h2>Artikli</h2>

            </div>

            <div class='card-body'>
                <h3>Svi artikli restorana</h3>
                
            </div>


            <div class='card-body'>
                <h3>Dodavanje novog artikla</h3>

            </div>

        </div>

    </div>
    `,
        
    methods: {
    	
    },

    mounted() {
//    	axios.get('rest/data/getRestaurant/' + this.manager.restaurant).then(response => this.restaurant = response.data);
    }
});