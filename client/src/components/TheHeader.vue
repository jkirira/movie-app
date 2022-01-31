<template>
    <div id="nav" class="flex bg-green-500 text-white justify-between">

      <div class="flex items-center justify-center p-6">
          <router-link to="/">MOVIES AND TV</router-link>
      </div>

      <div class="flex">

        <div class="p-6">
          <router-link to="/login">Login</router-link>
        </div>

        <div class="p-6">
          <router-link to="/signup">Sign Up</router-link>
        </div>

      </div>

  <!--    <router-link >Logout</router-link>-->
    </div>

</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style>
*{
  box-sizing: border-box;
  font-size: 16px;
  padding: 0;
  margin: 0;
}
</style>