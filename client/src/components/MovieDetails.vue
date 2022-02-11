<template>
    <div>
    <section class="text-gray-600 body-font">
        <div class="relative flex items-center justify-center">
            <span class="absolute inset-0">
                <img class="w-full h-full mb-10 object-cover object-center rounded" alt="hero" src="../assets/img/default-poster.png">
            </span>
            <span class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded z-50">
                <img class="max-h-full max-w-full " alt="hero" src="../assets/img/default-poster.png">
            </span>
        </div>
        <div class=" container px-4 mx-auto flex flex-col sm:flex-row mt-10">
            <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-r border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class="leading-relaxed text-lg mb-4">{{ show.name }}</p>
                <p class="leading-relaxed text-lg mb-4">{{ show.description }}</p>
                <p class="leading-relaxed text-lg mb-4">Release Date: {{ show.release_date ? moment(show.release_date).format('ll') : '' }}</p>
                <p class="leading-relaxed text-lg mb-4">Genre: {{ show.genre }}</p>
                <p class="leading-relaxed text-lg mb-4 flex flex-column md:flex-row">Rating: <star-rating v-model="rating" :read-only="true" :show-rating=false :star-size="20" ></star-rating></p>
            </div>

            <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <button @click="sub(show)" class="flex items-center m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 justify-center w-9/12 focus:outline-none hover:bg-green-500 rounded">
                    Subscribe
                </button>
                <button @click="fave(show)" class="flex items-center m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 justify-center w-9/12 focus:outline-none hover:bg-green-500 rounded">
                    Add To favourites
                </button>
                <button id="modal-btn" class="flex items-center m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 justify-center w-9/12 focus:outline-none hover:bg-green-500 rounded">
                    Watch Trailer
                </button>
            </div>

        </div>

        <div id="my-modal" class="modal">

            <div class="modal-content">
                <div class="modal-header flex items-center justify-between">
                    <h2 class="mx-4">{{show.name}} Trailer</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
<!--                    <iframe width="560" height="315" src="https://youtu.be/6ophW7Ask_0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>-->
<!--                    </iframe>-->
                    <iframe src="https://player.vimeo.com/video/356724117?h=068cbf2d28" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>

                    </iframe>
                </div>
            </div>
        </div>

    </section>

        <div class="container m-auto py-6 px-4">
            <div class="px-4 py-6 text-black">
                <h3>Rate this Movie</h3>
            </div>

            <div class="flex flex-col lg:flex-row">
                <star-rating v-model="rate_amount" :show-rating=false :star-size="35"></star-rating>
                <div class="px-4">
                    <button @click="rate(show)" class="flex items-center lg:m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 w-7/10 focus:outline-none hover:bg-green-500 rounded">
                        Rate
                    </button>
                </div>
            </div>
            <div v-if="rating" class="px-4">
            </div>
        </div>

        <div class="p-8">
            <ul class="grid grid-flow-col text-center text-gray-500  p-1">
                <li v-on:click="tabName='episodes'" :class="['tab-button bg-white flex rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-100 justify-center py-4', { active: tabName === 'episodes' }]" >Episodes</li>
                <li v-on:click="tabName='comments'" :class="['tab-button bg-white flex rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-100 justify-center py-4', { active: tabName === 'comments' }]">Comments</li>
                <li v-on:click="tabName='reviews'" :class="['tab-button bg-white flex rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-100 justify-center py-4', { active: tabName === 'reviews' }]">Reviews</li>
            </ul>
        </div>

        <keep-alive>
            <component :is="currentTabComponent" v-bind="currentProperties" class="tab"></component>
        </keep-alive>
    </div>
</template>

<script>
import EpisodesComponent from "./EpisodesComponent.vue"
import CommentsComponent from "./CommentComponent.vue"
import ReviewComponent from "./ReviewComponent.vue"
import StarRating from 'vue-star-rating'
import axios from "axios";
export default {
    components: {
        EpisodesComponent,
        CommentsComponent,
        ReviewComponent,
        StarRating
    },
    data(){
        return{
            tabs: {"episodes": EpisodesComponent, "comments": CommentsComponent, "reviews": ReviewComponent},
            tabName: "episodes",
            show: '',
            episodes: null,
            comments: null,
            reviews: null,
            rate_amount : 0,
            rating: null,
            prev_rating: null
        }
    },
    computed: {
        currentTabComponent: function() {
            return this.tabs[this.tabName];
        },
        currentProperties: function() {
            return { 'episodes': this.episodes, 'comments': this.comments, 'reviews': this.reviews }

        }
    },
    beforeMount() {
        axios.get("http://localhost:4000/api/v1/shows/" + this.$route.params.id )
              .then((response) => {
                  this.show = response.data
                  this.episodes = this.show.Episodes
                  this.comments = this.show.Comments
                  this.reviews = this.show.Reviews
                  console.log('show')
                  console.log(this.comments)
              }).catch((err) => {
                    console.log("error:", err)
            })

        console.log(this.$route.params)

        axios.get("http://localhost:4000/api/v1/shows/" + this.$route.params.id + '/rating')
              .then((response) => {
                  this.rating = parseInt(response.data)
                  console.log(response.data)
              }).catch((err) => {
                console.log("error:", err)
            })

        axios.get("http://localhost:4000/api/v1/shows/" + this.$route.params.id + "/rating/user/" + this.$store.getters.userDetails.id)
              .then((response) => {
                  this.prev_rating = response.data
                  console.log(response.data)
              }).catch((err) => {
            console.log("error:", err)
        })
    },
    mounted() {
        const modal = document.querySelector('#my-modal');
        const modalBtn = document.querySelector('#modal-btn');
        const closeBtn = document.querySelector('.close');

        modalBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', outsideClick);

        function openModal() {
            modal.style.display = 'flex';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        function outsideClick(e) {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        }

    },

    methods: {
        sub(sh){
            let userId;

            if(this.$store.getters.isLoggedIn){
                userId = this.$store.getters.userDetails.id
            } else {
                this.$router.push({name: 'login'})
            }

            const subForm = {}
            subForm['show_id'] =  sh.id;
            subForm['user_id'] =  userId;

            console.log(subForm)

            axios.post('http://localhost:4000/api/v1/shows/'+ sh.id +'/subscriptions/user/' + userId, subForm)
                  .then((response) => {
                      console.log('sub added')
                      console.log(response)
                  }).catch((err) => {
                    console.log('something went wrong error', err)
                    this.error_message = err;
                })
        },

        fave(sh){
            let userId;

            if(this.$store.getters.isLoggedIn){
                userId = this.$store.getters.userDetails.id
            } else {
                this.$router.push({name: 'login'})
            }

            let formData = new FormData();

            formData.append('show_id', sh.id);
            formData.append('user_id', userId);

            axios.post('http://localhost:4000/api/v1/shows/'+ sh.id +'/favourite/user/' + userId, formData)
                  .then((response) => {
                      console.log('sub added')
                      console.log(response)
                  }).catch((err) => {
                console.log('something went wrong error', err)
                this.error_message = err;
            })
        },

        rate(sh){
            let userId;

            if(this.$store.getters.isLoggedIn){
                userId = this.$store.getters.userDetails.id
            } else {
                this.$router.push({name: 'login'})
            }

            if(this.rate_amount == '' || !this.rate_amount){
                alert("Please pick a rating")
            }

            let rateData = {};

            rateData['amount'] = this.rate_amount
            rateData['show_id'] = sh.id;
            rateData['user_id'] = userId;

            axios.post('http://localhost:4000/api/v1/shows/'+ sh.id +'/ratings/user/' + userId, rateData)
                  .then((response) => {
                      console.log('rate added')
                      console.log(response)
                  }).catch((err) => {
                console.log('something went wrong error', err)
                this.error_message = err;
            })
        }
    }
}

</script>
<style>
.modal {
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    margin: auto;
    width: 60%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    background: #fff;
    min-height: 500px;
}

.modal-header h2,
.modal-footer h3 {
    margin: 0;
}

.modal-header {
    padding: 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.modal-body {
    padding: 10px 20px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-footer {
    background: #cccccc;
    padding: 10px;
    color: #fff;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.close {
    /*color: #ccc;*/
    float: right;
    font-size: 30px;
    padding: 5px 20px;
}

.close:hover,
.close:focus {
    color: #fff;
    background: #ccc;
    text-decoration: none;
    cursor: pointer;
}

.tab-button.active{
    border-top: 3px solid #10b981;
    border-left: 3px solid #10b981;
    border-right: 3px solid #10b981;
}


</style>