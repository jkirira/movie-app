<template>
  <div class="mx-5 max-w-md my-10 lg:mx-auto  bg-white p-5 rounded-md shadow-sm border border-gray-700">

    <div class="text-center">
      <h1 class="my-3 text-3xl font-semibold text-gray-700">Login</h1>
    </div>

    <div v-if="display_message" class="flex justify-center mx-[25%] py-4 mt-4" :class="message_class">{{ display_message }}</div>

      <div class="m-7">
      <form id="form">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm text-gray-600">Email</label>
          <input type="email" name="name" id="name" v-model="form.email" placeholder="email" value="" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <label for="password" class="text-sm text-gray-600">Password</label>
          <input type="password" name="password" id="password" v-model="form.password" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <button type="submit" class="w-full px-3 py-4 text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none" @click="login">Login</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapGetters} from "vuex";
import store from "../../store/index.js";
export default {
    name: "LoginForm",
    data(){
        return{
            form: {},
            display_message: null,
            message_class: '',
        }
    },
    computed: {
        ...mapGetters([
              'isLoggedIn'
        ]),

        ...mapActions([
              'set_user',
              'log_in'
        ])
    },
    methods: {
        validate(){
            this.message_class = "bg-red-500 text-white rounded"

            if( !this.form.email || !this.form.password ){
                this.display_message = "Cannot send empty values"
                return false;
            }
            if( this.isLoggedIn ){
                this.display_message = "Already Logged in"
                return false;
            }
            return true;
        },

        clear_message(){
            this.display_message = ""
            this.message_class = ""
        },

      login(e){
            e.preventDefault();
            // this.$swal.fire('Hello Vue world!!!');
            if( !this.validate() ){
                return;
            }

            this.clear_message();

          let url = "http://localhost:4000/api/v1/user/login/"
          // console.log(this.form)

          axios.post(url, { 'email': this.form.email, 'password': this.form.password } )
            .then((response) => {
                console.log("success")
                console.log("user", response.data.user)
                window.localStorage.setItem( 'user', JSON.stringify(response.data.user) );
                window.localStorage.setItem( 'movie_token', response.data.token.toString() );
                store.dispatch("set_user", response.data.user)
                store.dispatch("set_token", response.data.token.toString())
                store.dispatch("log_in")
                this.$swal.fire({
                    title: "Success",
                    text: "Logged In!",
                    icon: 'success',
                })
                window.location = '/#/shows'
            }).catch((err) => {
              console.log("error")
              console.log(err.response.data)
              this.$swal.fire({
                  title: "Error",
                  text: "There was an error loggin in",
                  icon: 'error',
              })
            })
        }
    }
}
</script>

<style scoped>

</style>