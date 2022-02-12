import Vue from 'vue'
import store from "./client/store";
import VueRouter from "vue-router";
import HomeView from "./client/src/components/Home.vue"
import LoginComponent from "./client/src/components/LoginForm.vue"
import SignupComponent from "./client/src/components/SignupForm.vue"

import AdminView from "./client/src/components/admin/Home.vue"
import Movies from "./client/src/components/admin/Movies.vue"
import AddMovie from "./client/src/components/admin/AddMovie.vue"
import EditMovie from "./client/src/components/admin/EditMovie.vue"
import AdminMovieDetails from "./client/src/components/admin/AdminMovieDetails.vue"
import AdminSearchMovie from "./client/src/components/admin/AdminSearchMovie.vue"
import Mail from "./client/src/components/admin/Subscribers.vue"
import Actors from "./client/src/components/admin/Actors.vue"
import ManageEpisodes from "./client/src/components/admin/ManageEpisodes.vue";

import MovieDetails from "./client/src/components/MovieDetails.vue"
import Subscriptions from "./client/src/components/Subscriptions.vue"
import Search from "./client/src/components/Search.vue"
import Reviews from "./client/src/components/Reviews.vue"
import Comments from "./client/src/components/Comments.vue"
import Favourites from "./client/src/components/Favourites.vue"



const routes = [
    { path: '/shows', component: HomeView, name: 'home' },
    {
        path: '/login',
        component: LoginComponent,
        name: 'login',
        beforeEnter: (to, from, next) => {
            console.log(store.getters.isLoggedIn)
            if ( store.getters.isLoggedIn ) next(false)
            next()
        },
    },

    {
        path: '/signup',
        component: SignupComponent,
        name: 'signup',
        beforeEnter: (to, from, next) => {
            if ( store.getters.isLoggedIn ) next(false)
            next()
        },
    },

    {
        path: '/admin',
        component: AdminView,
        beforeEnter: (to, from, next) => {
            console.log(store.getters.isAdmin)
            if ( store.getters.isAdmin ) next()
            next(false)
        },
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/',
                component: Movies,
                name: 'admin_default',
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'shows',
                component: Movies,
                name: 'admin_home',
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'shows/add',
                component: AddMovie,
                name: 'add_movie'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'shows/:id/edit',
                component: EditMovie,
                name: 'edit_movie'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'shows/search',
                component: AdminSearchMovie,
                name: 'search_movie'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'shows/:id',
                component: AdminMovieDetails,
                name: 'admin_movie_details'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'shows/:id/subscriptions',
                component: Mail,
                name: 'admin_mail'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'shows/:id/episodes',
                component: ManageEpisodes,
                name: 'manage_episodes'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'shows/actors/:ii',
                component: Actors,
                name: 'actors'
            }
        ],
    },

    { path: '/shows/:id',  component: MovieDetails, name: "movie_details" },
    { path: '/shows/search/:search_tag',  component: Search, name: "movie_search" },
    {
        path: '/comments',
        component: Comments,
        name: "comments",
        beforeEnter: (to, from, next) => {
            if ( !store.getters.isLoggedIn ) next({name: 'login'})
            next()
        },
    },
    {
        path: '/user/:user_id/subscriptions',
        component: Subscriptions,
        name: "subscriptions",
        beforeEnter: (to, from, next) => {
            if ( !store.getters.isLoggedIn ) next({name: 'login'})
            next()
        },
    },
    {
        path: '/user/:user_id/reviews',
        component: Reviews,
        name: "reviews",
        beforeEnter: (to, from, next) => {
            if ( !store.getters.isLoggedIn ) next({name: 'login'})
            next()
        },
    },
    {
        path: '/user/:user_id/favourites',
        component: Favourites,
        name: "favourites",
        beforeEnter: (to, from, next) => {
            if ( !store.getters.isLoggedIn ) next({name: 'login'})
            next()
        },
    }

]


const router = new VueRouter({
    routes,
    // mode: 'history',
})

//
// router.beforeEach((to, from, next) => {
//     let token = localStorage.getItem('movie_token');
//     if (to.name !== 'login' && !token) next({ name: 'login' })
//     else if (to.name !== 'register' && !token) next({ name: 'register' })
//     else if (to.name == 'admin_home' && !store.getters.isAdmin) next({ name: 'home' })
//     else next()
// })


export default router;