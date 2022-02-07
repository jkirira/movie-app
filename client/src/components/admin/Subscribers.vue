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
                                <textarea id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div>
            <div class="flex flex-col w-full ">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Subscribers</h1>
            </div>
            <div class="flex flex-col component-body overflow-scroll">
                <div class="flex items-center shadow-md rounded-md p-3">
                    <div class="flex w-1/12"></div>
                    <div class="flex flex-wrap w-10/12"> Subscriber username </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

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