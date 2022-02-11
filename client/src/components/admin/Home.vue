<template>
    <div>
        <div class="flex flex-col lg:flex-row w-screen h-screen text-gray-700 relative">

            <!-- Component Start -->
            <div id="sidebar" class="sidebar flex-col w-56 border-r border-gray-300">
                <div class="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300">
                </div>
                <div class="flex flex-col flex-grow p-4 overflow-auto">
                    <a class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300" href="#">
                        <router-link :to="{ name: 'admin_home' }"><span class="leading-none">View Movies</span></router-link>
                    </a>
                    <a class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300" href="#">
                        <router-link :to="{ name: 'add_movie' }"><span class="leading-none">Add Movie</span></router-link>
                    </a>
                </div>

            </div>

            <div class="flex flex-col flex-grow">
                <div class="flex items-center justify-between flex-shrink-0 h-16 px-8 border-b border-gray-300">
                    <div>
                        <router-link :to="{ name: 'admin_home' }"><h1 class="text-lg font-medium">Movie Admin</h1></router-link>
                    </div>

                    <div id="sidebarToggle" class="sidebarToggle">
                        <button class="relative ml-2 text-sm focus:outline-none group">
                            <div class="flex items-center justify-between w-10 h-10 rounded hover:bg-gray-300">
                                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                <div class="flex-grow p-6 mt-8 overflow-auto w-full">

                    <router-view></router-view>

                </div>
            </div>
            <!-- Component End  -->

        </div>
    </div>
</template>

<script>
import MovieCard from '../MovieCard.vue'
export default {
    data(){
        return{}
    },
    mounted() {
        const SideBar = document.getElementById('sidebar')
        const SideBarToggle = document.getElementById('sidebarToggle')
        SideBarToggle.addEventListener('click', () => {
            let sidebar_display = SideBar.style.display
            console.log(sidebar_display)
            if(sidebar_display != "none"){
                SideBar.style.display = "none"
            } else {
                SideBar.style.display = "flex"
                // NavBar.style.display = "flex"
            }
        })
    },
    methods: {
        redirectToActors(){

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

