<template>
    <div>
        <section class="text-gray-600 body-font relative">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Movie Name</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Send Mail to subscribers of Movie_name.</p>
                </div>
                <div class="lg:w-1/2 md:w-2/3 mx-auto">
                    <div class="flex flex-wrap -m-2">
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                                <textarea v-model="email_text" id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <button @click="notify" class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Button</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div>
            <div class="flex flex-col w-full ">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Subscribers</h1>
            </div>
            <template v-if="subscriptions.length > 0">
                <div v-for="(subscription, index) in subscriptions" :key="index" class="flex items-center shadow-md rounded-md px-3 py-6 w-10/12">
                    <div class="flex w-1/12"></div>
                    <div class="flex flex-wrap flex-col h-full w-7/12">
                        <p> {{ ( subscription.user ) ? subscription.user.username : "" }} </p>
                        <p>Subscribed on: {{ moment(subscription.createdAt).format('ll') }}</p>
                    </div>
                </div>
            </template>

            <template v-else>
                There are no subscriptions.
            </template>

        </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
            subscriptions: '',
            email_text: ''
        }
    },

    beforeMount(){
        console.log('subsid', this.$route.params.id)
        let URL = "http://localhost:4000/api/v1/shows/" + this.$route.params.id + '/subscriptions'
        axios.get(URL)
            .then((response) => {
                console.log(response)
                this.subscriptions = response.data
            }) .catch((err) => {
                console.log("SUB ERROR", err)
              })
    },

    methods:{
        notify(){
            if( this.subscriptions =='' && this.subscriptions.length < 1){
                this.$swal.fire({
                    title: "Error",
                    text: "There are no Subscriptions",
                    icon: 'error',
                })
                return
            }

            if( this.email_text =='' && this.email_text.length < 1){
                this.$swal.fire({
                    title: "Error",
                    text: "Cannot send empty mail",
                    icon: 'error',
                })
                return
            }

            let fd = {}
            fd['subscribers'] = []
            fd['email_text'] = this.email_text

            this.subscriptions.forEach((sub) => {
                fd.subscribers.push(sub.user.email)
            })

            axios.post("http://localhost:4000/api/v1/shows/" + this.$route.params.id + '/subscriptions/mail', fd)
                  .then((response) => {
                      console.log(response)
                      this.subscsribers = response.data
                  }) .catch((err) => {
                        console.log("SUB ERROR", err)
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