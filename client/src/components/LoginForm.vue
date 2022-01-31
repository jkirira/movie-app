<template>
  <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm border border-gray-700">

    <div class="text-center">
      <h1 class="my-3 text-3xl font-semibold text-gray-700">Login</h1>
    </div>

    <div class="m-7">
      <form action="" method="POST" id="form">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm text-gray-600">UserName</label>
          <input type="text" name="name" id="name" placeholder="Username" value="" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <label for="password" class="text-sm text-gray-600">Password</label>
          <input type="text" name="password" id="password" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 " />
        </div>
        <div class="mb-6">
          <button type="submit" class="w-full px-3 py-4 text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none">Login</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>

<style scoped>

</style>