<template>
    <section class="text-gray-600 pb-24 body-font relative">
        <div class="container px-5 mx-auto flex sm:flex-nowrap flex-wrap h-96 min-h-full">
            <div class="w-full lg:w-2/3 md:w-1/2  rounded-lg overflow-scroll p-5 lg:p-10 flex items-end justify-start relative">
                <div class="w-full h-full">
                    <div class="flex flex-col w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Reviews</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
                    </div>

                    <div class="flex flex-col component-body overflow-scroll">
                        <template v-if="reviews && reviews.length > 1">
                            <div v-for="(review, index) in reviews" :key="index" class="flex items-center shadow-md rounded-md px-3 py-6">
                                <div class="flex w-1/12"></div>
                                <div class="flex flex-wrap flex-col h-full w-8/12">
                                    <p>{{ moment(review.createdAt).format('ll') }}</p>
                                    <p>{{ review.text }}</p>
                                </div>
                                <div class="w-3/12 flex items-center space-x-4">
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex items-center shadow-md rounded-md px-3 py-6 w-7/12">
                                There are no reviews yet.
                            </div>
                        </template>
                    </div>

                </div>
            </div>
            <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Add a Review</h2>
                <p class="leading-relaxed mb-5 text-gray-600"></p>
                <div class="relative mb-4 flex flex-col">
                    <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                    <textarea v-model="review_text" id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <button @click="addReview" class="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "ReviewComponent",
    props: ["reviews"],
    data(){
        return{
            "review_text": ''
        }
    },

    methods:{
        addReview(){
            let userId;

            if(this.$store.getters.isLoggedIn){
                userId = this.$store.getters.userDetails.id
            } else {
                this.$router.push({name: 'login'})
            }

            if( this.review_text == '' || !this.review_text ){
                alert("cannot send empty review")
                return
            }

            let sendReview = {};

            sendReview['text'] = this.review_text;
            sendReview['user_id'] =  this.$store.getters.userDetails.id;

            // console.log(formData)
            axios.post('http://localhost:4000/api/v1/shows/'+ this.$route.params.show.id +'/reviews', sendReview)
                  .then((response) => {
                      console.log(response)
                      console.log('Review added')
                  }).catch((err) => {
                console.log('something went wrong error', err)
                this.error_message = err;
            })
        }
    }
}

</script>

<style>
.component-body{
    min-height: 150px;
    max-height: 500px;
}
</style>