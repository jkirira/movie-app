import './client/src/assets/css/tailwind.css';
import 'sweetalert2/dist/sweetalert2.min.css';
// import './client/src/assets/img';
import Vue from 'vue';
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from './client/app.vue';
import router from './routes.js'
import store from "./client/store/index.js";
import moment from 'moment'
import VueSweetalert2 from 'vue-sweetalert2';


Vue.prototype.moment = moment

Vue.use(VueRouter)
Vue.use(Vuex)

const sw_options = {
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2, sw_options);

Vue.filter("convertDate", function (value) {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a')
});


new Vue({
    el: '#app',

    router,

    store,

    render: h => h(App)

})