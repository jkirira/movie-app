<template>
    <div class="lg:w-8-12 m-auto">
        <section class="text-gray-600 body-font">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600">
                </div>
                <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
                        <br class="hidden lg:inline-block">readymade gluten
                    </h1>
                    <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
                    <div class="flex justify-center">
                        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                    </div>
                </div>
            </div>
        </section>

        <div>
            <div class="flex flex-col lg:flex-row lg:items-center shadow-md rounded-md p-4">
                <div class="flex w-1/12"></div>
                <div class="flex flex-wrap w-7/12"> Episode Name </div>
                <div class="w-4/12 flex items-center space-x-4 mt-8">
                    <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
                    <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

</script>

<style>
/*.sidebar{*/
/*    display: none;*/
/*    position: absolute;*/
/*    z-index: 9999;*/
/*    background: #ffffff;*/
/*    border: 1px solid lightgrey;*/
/*}*/

@media screen and (min-width: 1200px){
    .sidebar{
        display: flex;
        position: relative;
    }
    .sidebarToggle{
        display: none;
    }
}
</style>