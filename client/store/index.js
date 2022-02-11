import Vue from 'vue'
import Vuex from 'vuex'
const jwt = require('jsonwebtoken');

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: (window.localStorage.getItem('user')) ? window.localStorage.getItem('user') : {} ,
        token: (window.localStorage.getItem('token')) ? window.localStorage.getItem('token') : null ,
        loading: false,
    },

    getters: {
        getToken(state){
            return state.token
        },
        userDetails(state){
           return state.user;
        },
        isLoggedIn(state) {
            return (state.token) ? true : false;
        },
        isValid(state){
            return jwt.verify(state.token, 'secret')
        },
        isAdmin(state){
            return state.user.is_admin
        },
        userSubscriptions(state){
            return state.user.Subscriptions
        },
        userReviews(state){
            return state.user.Reviews
        },
        userComments(state){
            return state.user.Comments
        },
        userFavourites(state){
            return state.user.Favourites
        }
    },


    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        addReview(state, payload) {
            state.user = payload
        },
        addSubscription(state, payload) {
            state.user.Subscriptions.push(payload)
        },
        addComment(state, payload) {
            state.user = payload
        },
        addFavourite(state, payload) {
            state.user = payload
        },
        logIn(state){
            state.loggedIn = true
        },
        logOut(state){
            state.loggedIn = false
        },

    },


    actions: {
        set_token (context, payload) {
            context.commit('setToken', payload)
        },
        set_user (context, payload) {
            context.commit('setUser', payload)
        },
        log_in(context){
            context.commit('logIn')
        },
        log_out(context){
            context.commit('logOut')
        },
        save_vehicles(context, payload){
            context.commit('saveVehicles', payload)
        },
        clear_vehicles(context){
            context.commit('clearVehicles')
        },
        add_review(state, payload) {
            state.user = payload
        },
        add_subscription(state, payload) {
            state.user = payload
        },
        add_comment(state, payload) {
            state.user = payload
        },
        add_favourite(state, payload) {
            state.user = payload
        },
    }
})

export default store;