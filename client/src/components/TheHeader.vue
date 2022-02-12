<template>
    <div id="nav" class="nav flex bg-green-500 text-white justify-between">

      <div class="relative flex items-center justify-center  p-6">
          <router-link :to="{ name : 'home' }" class="nav-link h-full px-2">MOVIES AND TV</router-link>
          <div class="hamburger-div" id="NavBarToggle"><i class="fas fa-bars"></i></div>
      </div>

      <div id="nav-links" class="nav-links flex">

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
            <div class="p-6">
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
    mounted(){
        const NavBar = document.getElementById('nav-links')
        const NavBarToggle = document.getElementById('NavBarToggle')
        NavBarToggle.addEventListener('click', () => {
            let nav_display = NavBar.style.display
            if(nav_display != "none"){
                NavBar.style.display = "none"
            } else {
                NavBar.style.display = "flex"
                // NavBar.style.display = "flex"
            }
        })

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
.nav{
    flex-direction: column;
}

.nav-links{
    display: none;
    flex-direction: column;
}

.nav-link:hover{
   color: #10b981;
    background: white;
}
.nav-link a:focus, .nav-link a:hover  {
    text-decoration: none;
}

.hamburger-div {
    cursor: pointer;
    position: absolute;
    width: 50px;
    height: 50px;
    right: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
}

@media screen and (min-width: 1024px) {
    .nav{
        flex-direction: row;
    }

    .hamburger-div{
        display: none;
    }

    .nav-links{
        display: flex;
        flex-direction: row;
    }
}
</style>