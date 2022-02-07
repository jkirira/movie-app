<template>

    <div>
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Comments</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
            </div>

            <div class="flex flex-col component-body overflow-scroll">
                <div class="flex flex-col lg:flex-row lg:items-center shadow-md rounded-md px-3 py-6">
                    <div class="flex w-1/12"></div>
                    <div class="flex flex-wrap flex-col h-full w-7/12">
                        <p>Comment Text</p>
                        <p>Comment Date</p>
                    </div>
                    <div class="w-4/12 flex items-center space-x-4 my-2">
                        <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
                        <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
                    </div>
                </div>
            </div>

        </div>

        <section class="text-gray-600 body-font relative">
            <div class="container px-5 pb-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Edit Comment</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
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

    </div>
</template>

<script>

</script>

<style>
.component-body{
    min-height: 200px;
    max-height: 500px;
}
</style>