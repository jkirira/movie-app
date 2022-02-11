import './client/src/assets/css/tailwind.css';
// import './client/src/assets/img';
import Vue from 'vue';
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from './client/app.vue';
import router from './routes.js'
import store from "./client/store/index.js";
import moment from 'moment'

Vue.prototype.moment = moment

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
    el: '#app',

    router,

    store,

    render: h => h(App)

})