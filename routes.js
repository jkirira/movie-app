import Vue from 'vue'
import VueRouter from "vue-router";
import HomeComponent from "./client/src/components/Home.vue"
import LoginComponent from "./client/src/components/LoginForm.vue"
import SignupComponent from "./client/src/components/SignupForm.vue"



const routes = [
    { path: '/', component: HomeComponent, name: 'home' },
    { path: '/login', component: LoginComponent, name: 'login' },
    { path: '/signup', component: SignupComponent, name: 'signup' },
]


const router = new VueRouter({
    routes,
    // mode: 'history',
})



router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('movie_token');
    if (to.name !== 'login' && !token) next({ name: 'login' })
    else next()
})


export default router;