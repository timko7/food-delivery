/* Components */
const compLogin = { template: '<login></login>' };
const compRegistration = { template: '<registration></registration>' };
//const compHomeAll = { template: '<home-all></home-all>' };

const compRestaurants = {template: '<restaurants></restaurants>'}
 
const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: compLogin },
        { path: '/registration', component: compRegistration },
        { path: '/allRestaurants', component: compRestaurants },
        
        { path: '*', component: compLogin },
    ]
});

let app = new Vue({
    router, 
    el: '#foodDelivery'
});
