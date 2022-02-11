<template>
    <div id="nav" class="flex bg-green-500 text-white justify-between">

      <div class="flex items-center justify-center  nav-link p-6">
          <router-link :to="{ name : 'home' }">MOVIES AND TV</router-link>
      </div>

      <div class="flex">

          <template v-if="!this.$store.getters.isLoggedIn">
              <div class="nav-link p-6">
                  <router-link to="/login">Login</router-link>
              </div>

              <div class="nav-link p-6">
                  <router-link to="/signup">Sign Up</router-link>
              </div>
          </template>

        <template v-else >
            <div class="nav-link p-6" >
                <router-link :to="{ name: 'subscriptions', params: {user_id: userDetails.id} }">Subscriptions</router-link>
            </div>
            <div class="nav-link p-6">
                <router-link :to="{ name: 'favourites'}">Favourites</router-link>
            </div>
            <div class="nav-link p-6">
                <p>{{ userDetails.username }}</p>
            </div>
            <div class="nav-link p-6">
                <p @click="logout">Logout</p>
            </div>
        </template>


      </div>

  <!--    <router-link >Logout</router-link>-->
    </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import store from "../../store";

export default {
    name: "HeaderComponent",
    data(){
        return{
            logged_in: window.localStorage.getItem('movie_token')
        }
    },
    computed: {

        ...mapGetters([
            'isLoggedIn',
            'userDetails'
        ]),

        ...mapActions([
            'set_user',
            'log_out'
        ])
    },
    methods: {
        logout(){
                window.localStorage.removeItem('movie_token');
                window.localStorage.removeItem('user');
                console.log('Logged out')
                console.log(window.localStorage.getItem('movie_token'))
                store.dispatch("log_out")
                store.dispatch("set_token", null)
                store.dispatch("set_user", null)
                window.location = '/#/login'
        }
    }
}
</script>

<style>
*{
  box-sizing: border-box;
  font-size: 16px;
  padding: 0;
  margin: 0;
}
.nav-link:hover{
   color: #10b981;
    background: white;
}
.nav-link a:focus, .nav-link a:hover  {
    text-decoration: none;
}
</style>