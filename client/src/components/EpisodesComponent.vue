<template>
        <div class="container px-5 pb-24 mx-auto">
            <div class="flex flex-col w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Episodes</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
            </div>

            <div  class="flex flex-col component-body overflow-scroll">
                <template v-if="episodes">
                    <div v-for="(episode, index) in episodes" :key="index" class="flex items-center shadow-md rounded-md px-3 py-6 w-7/12">
                        <div class="flex w-1/12"></div>
                        <div class="flex flex-wrap flex-col h-full w-full lg:w-11/12">
                            <p>{{ episode.name }}</p>
                            <p>{{ episode.description }}</p>
                            <p>{{ episode.createdAt | convertDate }}</p>
                        </div>
                        <div class="w-4/12 flex items-center space-x-4"></div>
                    </div>
                </template>
                <template v-if="!episodes">
                    <div class="flex items-center shadow-md rounded-md px-3 py-6 w-7/12">
                        There are no episodes yet.
                    </div>
                </template>
            </div>

        </div>
</template>

<script>
export default {
    name: "EpisodesComponent",
    props: ["episodes"],
    data(){
        return{
        }
    },
    mounted() {
        console.log(this.$attrs)
    },
}

</script>

<style>
.component-body{
    min-height: 150px;
    max-height: 500px;
}
</style>