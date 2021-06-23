/* Components */
const compLogin = { template: '<login></login>' };
const compRegistration = { template: '<registration></registration>' };
const compHomeAll = { template: '<home-all></home-all>' };

const compRestaurant = {template: '<login></login>'}
 
const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: compLogin },
        { path: '/registration', component: compRegistration },
        
        
        //{ path: '*', component: compLogin },
    ]
});

let app = new Vue({
    router, 
    el: '#foodDelivery'
});
