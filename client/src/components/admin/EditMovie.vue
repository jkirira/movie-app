<template>

    <div class="p-4 mb-24 lg:p-8 xl:m-auto xl:w-8/12 rounded border border-gray-200">
        <h1 class="font-medium text-3xl">Edit Movie</h1>
        <p class="text-gray-600 mt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.
        </p>

        <form>
            <div class="mt-8 space-y-6">
                <div>
                    <label for="name" class="text-sm text-gray-700 block mb-1 font-medium">Movie Name</label>
                    <input type="text" name="name" id="name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Movie name" />
                </div>

                <div>
                    <label for="input1" class="text-sm text-gray-800 block mb-1 font-medium">
                        Description
                    </label>
                    <textarea rows="4" cols="" type="" name="input1" id="input1" class="w-full bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700" placeholder="Description"></textarea>
                </div>

                <div class="flex items-center">
                    <label for="job" class="text-sm text-gray-700 block mb-1 font-medium">Genre</label>
                    <input type="text" name="job" id="job" class="w-full lg:w-1/3 ml-4 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700" placeholder="Genre" />
                </div>

                <div class="flex items-center">
                    <label for="release_date" class="text-sm text-gray-700 block mb-1 font-medium">Date</label>
                    <input type="date" name="release_date" id="release_date" class="w-full lg:w-1/3 ml-4 bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700" />
                </div>

                <div>
                    <label for="poster" class="text-sm text-gray-700 block mb-1 font-medium">Poster</label>
                    <input type="file" name="name" id="poster" class="bg-gray-100 border border-gray-200 rounded py-4 px-6 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </div>

                <div>
                    <label for="trailer" class="text-sm text-gray-700 block mb-1 font-medium">Link to Trailer</label>
                    <input type="text" name="" id="trailer" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"  />
                </div>


            </div>


            <div class="space-x-4 mt-8">
                <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>

                <!-- Secondary -->
                <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
            </div>

        </form>
    </div>

</template>

<script>

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