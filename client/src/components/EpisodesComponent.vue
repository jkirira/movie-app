<template>
        <div class="container px-5 pb-24 mx-auto">
            <div class="flex flex-col w-full mb-12">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Episodes</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
            </div>

            <div class="flex flex-col component-body overflow-scroll">
                <div class="flex items-center shadow-md rounded-md px-3 py-6 w-7/12">
                    <div class="flex w-1/12"></div>
                    <div class="flex flex-wrap flex-col h-full w-7/12">
                        <p>Comment Name</p>
                        <p>Comment Date</p>
                    </div>
                    <div class="w-4/12 flex items-center space-x-4"></div>
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
</style>