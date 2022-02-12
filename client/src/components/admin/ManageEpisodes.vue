<template>
    <div>

        <div>
            <div class="flex flex-col w-full ">
                <h1 class="sm:text-3xl text-2xl flex w-full font-medium title-font mb-4 text-gray-900">Episodes <button @click="stageAdd()" class="flex max-w-1/2 ml-12 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Add</button></h1>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Total Episodes: {{ episodes.length }}</h1>
            </div>
            <div class="flex flex-col component-body overflow-scroll">
                <div v-for="(episode, index) in episodes" :key="index" class="flex flex-col lg:flex-row lg:items-center shadow-md rounded-md p-3">
                    <div class="flex-col mt-4 w-8/12">
                        <div class="flex text-black-900">Ep. {{ index+1 }} </div>
                        <div class="flex flex-wrap my-2">{{ episode.name }} </div>
                        <div class="flex flex-wrap my-2">{{ episode.description }} </div>
                    </div>
                    <div class="p-2 lg:w-4/12 flex justify-end">
                        <button @click="stageEdit(episode)" class="flex max-w-1/2 mx-4 text-white bg-green-400 border-0 py-2 px-4 focus:outline-none hover:bg-green-700 rounded text-lg">Edit</button>
                        <button @click="deleteEpisode(episode)" class="flex max-w-1/2 mx-4 text-white bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-700 rounded text-lg">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <section class="text-gray-600 body-font overflow-hidden">
            <div class="container px-2 lg:px-5 py-24 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <div class="lg:w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <div id="form" class="p-4 lg:p-8 rounded border border-gray-200">
                            <h1 class="font-medium text-3xl"> {{ isEdit ? 'Edit Episodes' : 'Add Episodes' }} </h1>
                            <p class="text-gray-600 mt-6">
                            </p>

                            <form @submit.prevent="isEdit ? editEpisode() : addEpisode()">
                                <div class="mt-8 space-y-6">
                                    <div>
                                        <label for="episode_name" class="text-sm text-gray-700 block mb-1 font-medium">Episode Name</label>
                                        <input v-model="form_data.episode_name" type="text" name="episode_name" id="episode_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Episode name" />
                                    </div>
                                    <div>
                                        <label for="episode_description" class="text-sm text-gray-700 block mb-1 font-medium">Episode Description</label>
                                        <textarea v-model="form_data.episode_description" rows="10" cols="30" name="episode_description" id="episode_description" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                                    </div>
                                </div>

                                <div class="space-x-4 mt-8">
                                    <button type="submit" class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50" > {{ isEdit ? 'Save' : "Create" }}</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>


    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Episodes",
    data(){
        return{
            form_data: {
                episode_name: '',
                episode_description: ''
            },
            episodes: [],
            isEdit: false
        }
    },
    mounted() {
        axios.get('http://localhost:4000/api/v1/shows/' + this.$route.params.id + '/episodes')
        .then((response) => {
            this.episodes = response.data
            console.log(this.episodes)
        }).catch((err) => {
            console.log("Error", err)
        })
    },
    methods: {
        validate(){
            if ( !this.form_data.episode_name){
                return false
            }
            return true
        },

        stageEdit(ep){
            this.isEdit = true
            this.form_data.id = ep.id,
            this.form_data.episode_name = ep.name,
            this.form_data.episode_description = ep.description
            window.location = "#form"
        },

        stageAdd(){
            this.isEdit = false
            this.form_data.episode_name = '',
            this.form_data.episode_description = ''
            window.location = "#form"
        },

        addEpisode(){
            if ( !this.validate() ){
                this.$swal.fire({
                    title: "Error",
                    text: "Cannot add empty episode data ",
                    icon: 'error',
                })
                return
            }

            let ep = {}
            ep['name'] = this.form_data.episode_name
            ep['description'] = this.form_data.episode_description
            axios.post('http://localhost:4000/api/v1/shows/' + this.$route.params.id + '/episodes', this.form_data )
                  .then((response) => {
                      this.episodes.unshift(ep)
                      this.$swal.fire({
                          text: "Episode Added",
                          icon: 'success',
                      })
                  }).catch((err) => {
                    console.log("Error", err)
                    this.$swal.fire({
                        title: "Error",
                        text: "There was an problem adding this episode",
                        icon: 'error',
                    })
                })
            this.form_data = {}
        },

        editEpisode(){
            if ( !this.validate() ){
                this.$swal.fire({
                    title: "Error",
                    text: "Cannot edit empty episode name ",
                    icon: 'error',
                })
                return
            }

            axios.put('http://localhost:4000/api/v1/shows/' + this.$route.params.id + '/episodes/' + this.form_data.id, this.form_data)
                  .then((response) => {
                      console.log(response)
                      let episode = this.episodes.find((ep) => {
                          ep.id == this.form_data.id
                      })
                      delete this.form_data.id
                      episode = this.form_data.id
                      this.$swal.fire({
                          text: "Edited episode ",
                          icon: 'success',
                      })
                  }).catch((err) => {
                        console.log("Error", err)
                  })

            this.form_data = {}
        },
        deleteEpisode(ep){
            axios.delete('http://localhost:4000/api/v1/shows/' + this.$route.params.id + '/episodes/' + ep.id)
                  .then((response) => {
                      console.log(this.episodes)
                      this.episodes = this.episodes.filter((episode) => {
                          return episode.id != ep.id
                          this.$swal.fire({
                              text: "Deleted episode ",
                              icon: 'warning',
                          })
                      })
                  }).catch((err) => {
                        console.log("Error", err)
                        this.$swal.fire({
                            title: "Error",
                            text: "There was an error deleting this episode ",
                            icon: 'error',
                        })
                    })
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
@media screen and (min-width: 1024px){
    .sidebar{
        display: flex;
        position: relative;
    }
    .sidebarToggle{
        display: none;
    }
}
</style>