<template>

    <div>
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"> Your Favourites</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
            </div>

            <div class="flex flex-col component-body overflow-scroll">
                <template v-if="favourites.length > 0">
                    <div v-for="(favourite, index) in favourites" :key="index" class="flex items-center shadow-md rounded-md px-3 py-6 w-10/12">
                        <div class="flex w-1/12"></div>
                        <div class="flex flex-wrap flex-col h-full w-7/12">
                            <p>{{ favourite.TvShow.name }}</p>
                            <p>Created on: {{ moment(favourite.createdAt).format('ll') }}</p>
                        </div>
                        <div class="w-4/12 flex items-center space-x-4">
                            <button @click="cancel(favourite)" class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-red-500 hover:text-white active:bg-green-200 disabled:opacity-50">Cancel</button>
                        </div>
                    </div>
                </template>

                <template v-else>
                    You have no favourites.
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
    name: "Favourites",
    data(){
        return{
            favourites: ''
        }
    },
    computed : {
        ...mapGetters([
            'userDetails',
            'userFavourites',
        ])
    },
    mounted() {
        axios.get("http://localhost:4000/api/v1/shows/favourite/user/" + this.$store.getters.userDetails.id )
              .then((response) => {
                  this.favourites = response.data
                  console.log(this.favourites)
              }).catch((err) => {
            console.log("error:", err)
        })
    },
    methods: {
        cancel(fav){
            this.$swal.fire({
                title: 'Are you sure?',
                text: "Remove from favourites?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let URL = 'http://laravel-todo.appp/posts/delete/'+p.id;
                    axios.delete("http://localhost:4000/api/v1/shows/favourite/user/" + this.$route.params.user_id + "/" + fav.id )
                          .then((response) => {
                              this.favourites = this.favourites.filter((f) => {
                                  return f.id != fav.id
                              })
                              this.$swal.fire({
                                  text: "Removed from Favourites!",
                                  icon: 'warning',
                              })
                              console.log('deleted')
                          }).catch((err) => {
                        console.log("error:", err)
                        this.$swal.fire({
                            title: "Error",
                            text: "There was an error removing from subscriptions",
                            icon: 'error',
                        })
                    })
                }
            })
        }
    }

}

</script>