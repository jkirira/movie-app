<template>
<div>

    <div>
        <div class="flex flex-col w-full ">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Actors</h1>
        </div>
        <div class="flex flex-col component-body overflow-scroll">
            <div class="flex flex-col lg:flex-row lg:items-center shadow-md rounded-md p-3">
                <div class="flex lg:w-1/12"></div>
                <div class="flex flex-wrap my-2 lg:w-8/12">Actor name </div>
                <div class="p-2 lg:w-4/12 flex">
                    <button class="flex max-w-1/2 mx-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                    <button class="flex max-w-1/2 mx-4 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                </div>
            </div>
        </div>
    </div>

    <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-2 lg:px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    <div id="Add" class="p-4 lg:p-8 rounded border border-gray-200">
                        <h1 class="font-medium text-3xl">Add Actor</h1>
                        <p class="text-gray-600 mt-6">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.
                        </p>

                        <form>
                            <div class="mt-8 space-y-6">
                                <div>
                                    <label for="first_name" class="text-sm text-gray-700 block mb-1 font-medium">First Name</label>
                                    <input type="text" name="first_name" id="first_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Movie name" />
                                </div>
                                <div>
                                    <label for="last_name" class="text-sm text-gray-700 block mb-1 font-medium">First Name</label>
                                    <input type="text" name="last_name" id="last_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Movie name" />
                                </div>
                            </div>

                            <div class="space-x-4 mt-8">
                                <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    <div id="Edit" class="p-4 lg:p-8 rounded border border-gray-200">
                        <h1 class="font-medium text-3xl">Edit Actor</h1>
                        <p class="text-gray-600 mt-6">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.
                        </p>

                        <form>
                            <div class="mt-8 space-y-6">
                                <div>
                                    <label for="first_name" class="text-sm text-gray-700 block mb-1 font-medium">First Name</label>
                                    <input type="text" name="first_name" id="edit_first_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Movie name" />
                                </div>
                                <div>
                                    <label for="last_name" class="text-sm text-gray-700 block mb-1 font-medium">First Name</label>
                                    <input type="text" name="last_name" id="edit_last_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Movie name" />
                                </div>
                            </div>

                            <div class="space-x-4 mt-8">
                                <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>


    </div>
</template>

<script>
export default {
    name: "Actors"
}

</script>

<style>
/*.sidebar{*/
/*    display: none;*/
/*    position: absolute;*/
/*    z-index: 9999;*/
/*    background: #ffffff;*/
/*    border: 1px solid lightgrey;*/
/*}*/
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