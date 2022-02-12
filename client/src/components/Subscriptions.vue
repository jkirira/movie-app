<template>

    <div>
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"> Your Subscriptions</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
            </div>

            <div class="flex flex-col component-body overflow-scroll">
                <template v-if="subscriptions.length > 0">
                    <div v-for="(subscription, index) in subscriptions" :key="index" class="flex flex-col lg:flex-row items-center shadow-md rounded-md px-3 py-6 w-10/12">
                        <div class="flex py-2 w-full lg:w-1/12">{{subscription.id}}</div>
                        <div class="flex py-2 flex-wrap flex-col h-full w-full lg:w-7/12">
                            <p>{{ subscription.TvShow.name }}</p>
                            <p>Created on: {{ moment(subscription.createdAt).format('ll') }}</p>
                        </div>
                        <div class="py-2 w-full lg:w-4/12 flex items-center space-x-4">
                            <button @click="cancel(subscription)" class="py-2 px-4 bg-green border border-gray-200 text-gray-600 rounded hover:bg-red-500 hover:text-white active:bg-green-200 disabled:opacity-50">Cancel</button>
                        </div>
                    </div>
                </template>

                <template v-else>
                    You have no subscriptions.
                </template>
            </div>

        </div>
    </div>

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import axios from "axios";
const store = require( "../../store/index.js");

export default {
    name: "Subscriptions",
    data(){
        return{
            subscriptions: ''
        }
    },
    computed : {
        ...mapGetters([
            'userDetails',
            'userSubscriptions',
        ])
    },
    mounted() {
        axios.get("http://localhost:4000/api/v1/shows/subscriptions/user/" + this.$store.getters.userDetails.id )
              .then((response) => {
                  this.subscriptions = response.data
                  console.log(this.subscriptions)
              }).catch((err) => {
            console.log("error:", err)
        })
    },
    methods: {
        cancel(sub){
            axios.delete("http://localhost:4000/api/v1/shows/subscriptions/user/" + this.$route.params.user_id + "/" + sub.id )
                  .then((response) => {
                      this.subscriptions = this.subscriptions.filter((s) => {
                         return s.id != sub.id
                      })
                      this.$swal.fire({
                          text: "Unsubscribed!",
                          icon: 'warning',
                      })
                      console.log('deleted')
                  }).catch((err) => {
                    console.log("error:", err)
                    this.$swal.fire({
                        title: "Error",
                        text: "An Error occurred when unsubscribing!",
                        icon: 'error',
                    })
                })

        }
    }

}

</script>