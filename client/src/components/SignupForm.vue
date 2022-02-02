<template>
  <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm border border-gray-700">

    <div class="text-center">
      <h1 class="my-3 text-3xl font-semibold text-gray-700">Register</h1>
    </div>

      <div v-if="display_message" class="flex justify-center mx-[25%] py-4" :class="message_class">{{ display_message }}</div>

      <div class="m-7">
      <form action="" method="POST" id="form">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm text-gray-600">UserName</label>
          <input type="text" name="name" id="name" v-model="form.username" placeholder="Username" value="" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm text-gray-600">Email Address</label>
          <input type="email" name="email" id="email" v-model="form.email" placeholder="Email" value="" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <label for="password" class="text-sm text-gray-600">Password</label>
          <input type="text" name="password" id="password" v-model="form.password" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <button type="submit" class="w-full px-3 py-4 text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none" @click="signup">Sign Up</button>
        </div>
      </form>
    </div>

  </div>

</template>

<script>
import axios from "axios";
export default {
  name: "SignupForm",
    data(){
        return{
            form: {},
            display_message: null,
            message_class: ''
        }
    },

    methods: {
        validate(){
            if( !this.form.username || !this.form.email || !this.form.password ){
                this.display_message = "Cannot send empty values"
                this.message_class = "bg-red-500 text-white rounded"
                return false;
            }
            return true;
        },

        clear_message(){
            this.display_message = ""
            this.message_class = ""
        },

        signup(e){
            e.preventDefault();
            if( !this.validate() ){
                return;
            }
            this.clear_message();


            let url = "http://localhost:4000/api/v1/user/signup/"
            axios.post(url, this.form)
                  .then((response) => {
                      console.log("success")
                      console.log(response.data)
                      window.location = '/#/login'
                  }).catch((err) => {
                    console.log("error")
                    console.log(err)
                })
        }
    }

}
</script>

<style scoped>

</style>