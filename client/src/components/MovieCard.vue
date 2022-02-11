<template>
<div>
    <div v-if="movie" class=" m-card h-full relative mr-2">
        <router-link :to="{ name: next, params: { id: movie.id, show:movie } }">
        <div>
            <p class="p-6 text-xs font-medium leading-3 absolute top-0 right-0">{{ movie.release_date ? moment(movie.release_date).format('ll') : '' }}</p>
            <div class="absolute bottom-0 left-0 p-6">
                <h2 class="text-xl font-semibold 5">{{movie.name}}</h2>
                <a href="#" class="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer hover:text-gray-200 hover:underline">
                    <p class="pr-2 text-sm font-medium leading-none">More Details</p>
                    <svg class="fill-stroke" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.75 12.5L10.25 8L5.75 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
<!--        <img v-if="movie.poster" :src= "'http:localhost:4000/images/' + movie.poster" class="h-full" alt="chair" />-->
        <img src="../assets/img/default-poster.png" class="h-full" alt='chair'>
        </router-link>
    </div>
    <div v-else>
        No Movies Available
    </div>
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
}
.m-card a, .m-card a:hover{
    text-decoration: none;
}
.m-card:hover, .m-card:hover a {
    color: #10b981;
}
</style>