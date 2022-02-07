import Vue from 'vue'
import Vuex from 'vuex'
const jwt = require('jsonwebtoken');

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        loggedIn: false,
        loading: false,
        vehicles: []
    },

    getters: {
        isLoggedIn(state) {
            return state.loggedIn;
        },
        isValid(state){
            return jwt.verify(state.token, state.password)
        },
        getVehicles(state){
            return state.vehicles
        }
    },


    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        logIn(state){
            state.loggedIn = true
        },
        logOut(state){
            state.loggedIn = false
        },
        saveVehicles(state, payload){
            state.vehicles = payload
        },
        clearVehicles(state){
            state.vehicles = []
        }

    },


    actions: {
        set_token (context, payload) {
            context.commit('setToken', payload)
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
        }
    }
})

export default store;