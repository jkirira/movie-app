<template>
    <div v-if="movie" class=" m-card h-full relative mr-2" >
        <router-link :to="{ name: next, params: { id: movie.id, show:movie } }">

            <p class="movie-text p-6 z-50 text-xs font-medium leading-3 absolute top-2 right-2">{{ movie.release_date ? moment(movie.release_date).format('ll') : '' }}</p>
            <div class=" text-hover movie-text z-50 absolute bottom-2 left-2 p-6">
                <h2 class="text-xl font-semibold 5">{{movie.name}}</h2>
                <a href="#" class="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer hover:text-gray-200 hover:underline">
                    <p class="pr-2 text-sm font-medium leading-none">More Details</p>
                    <svg class="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>

            <div class="overlay"></div>
            <img v-if="movie.poster" :src= "movie.poster" class="h-full" />
            <img v-else src="../assets/img/default-poster.png" class="h-full">
        </router-link>
    </div>

</template>



<script>
export default {
    name: "MovieCard",
    props: ["movie", "next"]
}
</script>

<style>
.m-card{
    width: 250px;
    min-width: 250px;
    color: #10b981;
}
.m-card a, .m-card a:hover{
    text-decoration: none;
}
.m-card:hover, .m-card:hover a {
    color: #1fff0f;
}

.m-card:hover h2{
    font-size: 2.0rem;
}

.m-card .overlay {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    opacity: 0;
    background: rgba(0,0,0,.5);
    -moz-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    position: absolute;
    top:0;
}

.m-card:hover .overlay {
    opacity: 1;
}
.m-card:hover .text-hover{
    bottom: 50%;
    right: 0;
    left: 0;
}

.movie-text{
    background: rgba(0, 0, 0, 0.01);
}
</style>