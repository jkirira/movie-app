<template>

    <div class="p-4 mb-24 lg:p-8 xl:m-auto xl:w-8/12 rounded border border-gray-200">
        <h1 class="font-medium text-3xl">Add Movie</h1>
        <p class="text-gray-600 mt-6">
        </p>

        <form>
            <div class="mt-8 space-y-6">
                <div>
                    <label for="name" class="text-sm text-gray-700 block mb-1 font-medium">Movie Name</label>
                    <input type="text" name="name" id="name" v-model="form.movie_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Movie name" />
                </div>

                <div>
                    <label for="input1" class="text-sm text-gray-800 block mb-1 font-medium">
                        Description
                    </label>
                    <textarea rows="4" cols="" v-model="form.movie_description" type="" name="input1" id="input1" class="w-full bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700" placeholder="Description"></textarea>
                </div>

                <div class="flex items-center">
                    <label for="job" class="text-sm text-gray-700 block mb-1 font-medium">Genre</label>
                    <input type="text" name="job" id="job" v-model="form.genre" class="w-full lg:w-1/3 ml-4 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700" placeholder="Genre" />
                </div>

                <div class="flex items-center">
                    <label for="release_date" class="text-sm text-gray-700 block mb-1 font-medium">Date</label>
                    <input type="date" name="release_date" id="release_date" v-model="form.release_date" class="w-full lg:w-1/3 ml-4 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700" />
                </div>

                <div>
                    <label for="poster" class="text-sm text-gray-700 block mb-1 font-medium">Poster</label>
                    <input type="file" name="name" id="poster" @change="fileInput" class="bg-gray-100 border border-gray-200 rounded py-4 px-6 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </div>

                <div>
                    <label for="trailer" class="text-sm text-gray-700 block mb-1 font-medium">Link to Trailer</label>
                    <input type="text" name="" id="trailer" v-model="form.trailer" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"  />
                </div>

            </div>

            <div class="space-x-4 mt-8">
                <button type="submit" @click="addMovie" class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50">Save</button>
            </div>

        </form>
    </div>

</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            form: {},
        }
    },
    methods: {
        fileInput: function (e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) { return; }
            this.form.poster = files[0];
        },

        addMovie: function (e) {
            e.preventDefault();
            let formData = new FormData();

            formData.append('name', this.form.movie_name);
            formData.append('description', this.form.movie_description);
            formData.append('release_date', this.form.release_date);
            formData.append('genre', this.form.genre);
            formData.append('trailer_link', this.form.trailer);
            formData.append('poster', this.form.poster);
            // console.log(formData)
            axios.post('http://localhost:4000/api/v1/shows/', formData)
                  .then((response) => {
                      console.log('movie added')
                  }).catch((err) => {
                    console.log('something went wrong error', err)
                    this.error_message = err;
                })
        }
    }

}

</script>

<style>
.sidebar{
    display: none;
    position: absolute;
    z-index: 9999;
    background: #ffffff;
    border: 1px solid lightgrey;
}
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