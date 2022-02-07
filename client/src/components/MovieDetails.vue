<template>
    <div>
    <section class="text-gray-600 body-font">
        <div class="relative flex items-center justify-center">
            <span class="absolute inset-0">
                <img class="w-full h-full mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600">
            </span>
            <span class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded z-50">
                <img class="max-h-full max-w-full " alt="hero" src="https://dummyimage.com/720x600">
            </span>
        </div>
        <div class=" container px-4 mx-auto flex flex-col sm:flex-row mt-10">
            <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class="leading-relaxed text-lg mb-4">Meggings portland fingerstache lyft, post-ironic fixie man bun banh mi umami everyday carry hexagon locavore direct trade art party. Locavore small batch listicle gastropub farm-to-table lumbersexual salvia messenger bag. Coloring book flannel truffaut craft beer drinking vinegar sartorial, disrupt fashion axe normcore meh butcher. Portland 90's scenester vexillologist forage post-ironic asymmetrical, chartreuse disrupt butcher paleo intelligentsia pabst before they sold out four loko. 3 wolf moon brooklyn.</p>
                <a class="text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>

            <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <button class="flex items-center m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 w-7/10 focus:outline-none hover:bg-gray-500 rounded">
                    Subscribe
                </button>
                <button class="flex items-center m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 w-7/10 focus:outline-none hover:bg-gray-500 rounded">
                    Add To favourites
                </button>
                <button class="flex items-center m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 w-7/10 focus:outline-none hover:bg-gray-500 rounded">
                    Button
                </button>
            </div>

        </div>
    </section>

        <div class="container m-auto py-6 px-4">
            <div class="px-4 py-6 text-black">
                <h3>Rate this Movie</h3>
            </div>

            <div class="flex flex-col lg:flex-row">
                <div class="px-4">
                    <input type="radio" id="one" name="rating" value="1">
                    <label class="mx-2" for="one">1</label><br>
                </div>
                <div class="px-4">
                    <input type="radio" id="two" name="rating" value="2">
                    <label class="mx-2" for="two">2</label><br>
                </div>
                <div class="px-4">
                    <input type="radio" id="three" name="rating" value="3">
                    <label class="mx-2" for="three">3</label><br>
                </div>
                <div class="px-4">
                    <input type="radio" id="four" name="rating" value="4">
                    <label class="mx-2" for="four">4</label><br>
                </div>
                <div class="px-4">
                    <input type="radio" id="five" name="rating" value="5">
                    <label class="mx-2" for="five">5</label><br>
                </div>
                <div class="px-4">
                    <button class="flex items-center lg:m-auto md:mt-auto text-white bg-gray-400 border-0 py-2 px-4 my-4 w-7/10 focus:outline-none hover:bg-gray-500 rounded">
                        Subscribe
                    </button>
                </div>
            </div>
            <div class="px-4">
                <p>You have previously rated this movie</p>
                <p>Previously rating: </p>
            </div>
        </div>

        <div class="p-8">
            <ul class="grid grid-flow-col text-center text-gray-500  p-1">
                <li v-on:click="tabName='episodes'" class="flex justify-center py-4">Episodes</li>
                <li v-on:click="tabName='comments'" class="flex justify-center bg-white rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-100 py-4">Comments</li>
                <li v-on:click="tabName='reviews'" class="flex justify-center py-4">Reviews</li>
            </ul>
        </div>

        <component v-bind:is="currentTabComponent" class="tab"></component>

    </div>
</template>

<script>
import EpisodesComponent from "./EpisodesComponent.vue"
import CommentsComponent from "./CommentComponent.vue"
import ReviewComponent from "./ReviewComponent.vue"
export default {
    components: {
        EpisodesComponent,
        CommentsComponent,
        ReviewComponent
    },
    data(){
        return{
            tabs: {"episodes": EpisodesComponent, "comments": CommentsComponent, "reviews": ReviewComponent},
            tabName: "episodes"
        }
    },
    computed: {
        currentTabComponent: function() {
            return this.tabs[this.tabName];
        }
    }
}

</script>