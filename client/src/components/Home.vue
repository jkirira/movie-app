<template>

    <div>
        <!--search-->
        <div class="flex justify-center p-10">
            <div class="mb-3 w-full">
                <div class="input-group relative flex flex-wrap items-stretch mb-4">
                    <input v-model="search_tag" type="search" class="form-control relative flex-auto min-w-0 block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-500 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2">
                    <button @click="search" class="btn inline-block px-6 py-2.5 bg-green-500 max-w-1/5 mt-2 md:my-0 md:mx-4 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="container px-5 py-12 xl:mx-4">
            <div class="flex flex-col w-full mb-6 ">
                <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">TRENDING<i class="fa-solid fa-fire m-2"></i></h1>
            </div>
            <div class="movie-carousel gap-4 my-8 auto-cols-max">
                <template v-if="latest">
                    <movie-card v-for="(movie, index) in latest" :key="index" :movie="movie" v-bind:next="'movie_details'"></movie-card>
                </template>
                <template v-else>
                    <div>No Movies Available</div>
                </template>
            </div>
        </div>

        <div class="container px-5 py-12 xl:mx-4">
            <div class="flex flex-col w-full mb-6">
                <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">LATEST<i class="fa-regular fa-star m-2"></i></h1>
            </div>
            <div class="movie-carousel gap-4 my-8 auto-cols-max">
                <template v-if="latest">
                    <movie-card v-for="(movie, index) in latest" :key="index" :movie="movie" v-bind:next="'movie_details'"></movie-card>
                </template>
                <template v-else>
                    <div>No Movies Available</div>
                </template>
            </div>
        </div>

        <div class="container px-5 py-12 xl:mx-4">
            <div class="flex flex-col w-full mb-6">
                <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">EXPLORE<i class="fa-regular fa-face-surprise m-2"></i></h1>
            </div>
            <div class="movie-carousel gap-4 my-8 auto-cols-max">
                <template v-if="latest">
                    <movie-card v-for="(movie, index) in latest" :key="index" :movie="movie" v-bind:next="'movie_details'"></movie-card>
                </template>
                <template v-else>
                    <div>No Movies Available</div>
                </template>
            </div>
        </div>

    </div>

</template>

<script>
import MovieCard from "./MovieCard.vue";
import axios from "axios";
export default {
    name: "HomeComponent",
    components: {
        MovieCard
    },

    data(){
        return {
            latest: null,
            explore: null,
            base: 'user',
            search_tag: ''
        }
    },

    mounted(){
        console.log('mounted');
        axios.get("http://localhost:4000/api/v1/shows/")
              .then((response) => {
                  console.log(response)
                  this.latest = response.data
              }).catch((err) => {
                console.log("error:", err)
            })


        axios.get("http://localhost:4000/api/v1/shows/")
              .then((response) => {
                  console.log('show')
                  this.explore = response.data
              }).catch((err) => {
                console.log("error:", err)
            })

        // let url_path = Array.split(this.$route.fullPath, '/')
        // if ( url_path.includes('admin') ) {
        //     this.base = "admin"
        // }

    },
    methods: {
        search(){
            if(!this.search_tag){
                this.$swal.fire({
                    title: "Empty Values",
                    text: "Cannot search for empty value",
                    icon: 'error',
                })
                return;
            }
            // this.$router.push({ name: 'search_movie', params: { tag: this.search_tag } })
            this.$router.push({ name: 'movie_search', params: { 'search_tag': this.search_tag } })

        }
    }
}
</script>

<style>
.movie-carousel{
    display:grid;
    grid-auto-flow:column;
    overflow:auto;
    padding: 20px 0;
}

@media screen and (min-width: 1536px){
     .container {
         max-width: 95%;
     }
}

@media screen and (min-width: 1280px){
    .container {
        max-width: 95%;
    }
}
</style>