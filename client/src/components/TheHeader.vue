<template>
    <div id="nav" class="flex bg-green-500 text-white justify-between">

      <div class="flex items-center justify-center p-6">
          <router-link to="/">MOVIES AND TV</router-link>
      </div>

      <div class="flex">

        <div class="p-6">
          <router-link to="/login">Login</router-link>
        </div>

        <div class="p-6">
          <router-link to="/signup">Sign Up</router-link>
        </div>

          <div class="p-6" v-if="loggedIn">
              <p @click="logout">Logout</p>
          </div>

      </div>

  <!--    <router-link >Logout</router-link>-->
    </div>

</template>

<script>
export default {
    name: "HeaderComponent",
    data(){
        return{
            logged_in: window.localStorage.getItem('movie_token')
        }
    },
    computed: {
        loggedIn(){
            return this.logged_in
        }
    },
    methods: {
        logout(){
            if(window.localStorage.getItem('movie_token') ){
                window.localStorage.removeItem('movie_token');
                console.log('Logged out')
                console.log(window.localStorage.getItem('movie_token'))
                window.location = '/#/login'
                return true;
            } else {
                console.log("Error Logging Out")
                return false;
            }
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
</style>