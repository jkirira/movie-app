import Vue from 'vue'
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

import MovieDetails from "./client/src/components/MovieDetails.vue"
import Subscriptions from "./client/src/components/Subscriptions.vue"
import Reviews from "./client/src/components/Reviews.vue"
import Comments from "./client/src/components/Comments.vue"
import Favourites from "./client/src/components/Favourites.vue"



const routes = [
    { path: '/shows', component: HomeView, name: 'home' },
    { path: '/login', component: LoginComponent, name: 'login' },
    { path: '/signup', component: SignupComponent, name: 'signup' },
    {
        path: '/admin',
        component: AdminView,
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: '/',
                component: Movies,
                name: 'admin_home',
            },
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'add',
                component: AddMovie,
                name: 'add_movie'
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'edit',
                component: EditMovie
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'search',
                component: AdminSearchMovie
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: ':id',
                component: AdminMovieDetails
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: ':id/mail',
                component: Mail
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: ':id/episodes',
                component: Mail
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'actors/:ii',
                component: Actors,
                name: 'actors'
            }
        ]
    },

    { path: '/shows/:id',  component: MovieDetails, name: "movie_details" },
    { path: '/comments', component: Comments, name: "comments" },
    { path: '/subscriptions', component: Subscriptions, name: "subscriptions" },
    { path: '/reviews', component: Reviews, name: "reviews" },
    { path: '/favourites', component: Favourites, name: "favourites" }

]


const router = new VueRouter({
    routes,
    // mode: 'history',
})



// router.beforeEach((to, from, next) => {
//     let token = localStorage.getItem('movie_token');
//     if (to.name !== 'login' && !token) next({ name: 'login' })
//     else next()
// })


export default router;