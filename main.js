import './client/src/assets/css/tailwind.css';
import Vue from 'vue';
import VueRouter from "vue-router";
import App from './client/app.vue';
import router from './routes.js'

Vue.use(VueRouter)

new Vue({
    el: '#app',

    router,

    // store,

    render: h => h(App)

})