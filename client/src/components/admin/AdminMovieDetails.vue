<template>
    <div class="lg:w-8-12 m-auto">
        <section class="text-gray-600 body-font">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img v-if="show.poster" class="object-cover object-center rounded" alt="hero" :src="(show.poster) ? show.poster : '../assets/img/default-poster.png'">
                    <img v-else class="object-cover object-center rounded" alt="hero" :src="show.poster">
                </div>
                <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{{ show.name }}
                        <br class="hidden lg:inline-block">
                    </h1>
                    <div class="flex justify-center">
                        <router-link :to="{ name: 'edit_movie', params: {id: show.id } } " ><button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Edit</button></router-link>
                        <button @click="deleteShow" class="ml-4 inline-flex text-gray-700 bg-red-100 border-0 py-2 px-6 focus:outline-none hover:bg-red-200 rounded text-lg">Delete</button>
                        <router-link :to="{ name: 'manage_episodes', params: {id: show.id } }"><button class="ml-4 inline-flex text-gray-700 bg-indigo-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-200 rounded text-lg">Episodes</button></router-link>
                    </div>
                </div>
            </div>
        </section>

        <div class="mb-24">
            <h1 class="title-font sm:text-4xl text-3xl mb-12 font-medium text-gray-900">Movie Description</h1>
            <p>{{ show.description }}</p>
        </div>

        <div class="mb-24">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Episodes</h1>
            <div v-for="(episode, index) in episodes" :key="index" class="flex flex-col lg:flex-row lg:items-center shadow-md rounded-md p-4">
                <div class="flex w-1/12"></div>
                <div class="flex flex-wrap w-7/12">{{ episode.name }} </div>
                <div class="flex flex-wrap w-7/12">{{ moment(episode.createdAt).format('ll') }}</div>
                <div class="w-4/12 flex items-center space-x-4 mt-8">
<!--                    <button type="submit" @click="editEpisode(show.id)" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Edit</button>-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
            'show': '',
            'episodes': ''
        }
    },
    mounted() {
        let URL = "http://localhost:4000/api/v1/shows/" + this.$route.params.id
        axios.get(URL)
              .then((response) => {
                  this.show = response.data
                  this.episodes = this.show.Episodes
                  console.log('show')
                  console.log(this.show)
              }).catch((err) => {
            console.log("error:", err)
        })
    },
    methods: {
        editShow(id){
            window.location = '#/admin/shows/:id/edit'
        },
        deleteShow(e){
            e.preventDefault();
            let URL = "http://localhost:4000/api/v1/shows/" + this.$route.params.id
            axios.delete(URL)
                  .then((response) => {
                      console.log('show')
                      window.location = "#/admin/shows"
                  }).catch((err) => {
                        console.log("error:", err)
                    })
        },
        editEpisode(e){
            window.location = '/episode'
        }
    }
}

</script>

<style>
/*.sidebar{*/
/*    display: none;*/
/*    position: absolute;*/
/*    z-index: 9999;*/
/*    background: #ffffff;*/
/*    border: 1px solid lightgrey;*/
/*}*/

@media screen and (min-width: 1200px){
    .sidebar{
        display: flex;
        position: relative;
    }
    .sidebarToggle{
        display: none;
    }
}
</style>