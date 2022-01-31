<template>
    <div id="app">

      <header-component></header-component>

      <router-view></router-view>

    </div>
</template>


<script>
import HeaderComponent from './src/components/TheHeader.vue'

export default {
  name: "App",
  components: {
    HeaderComponent
  },

}


</script>

<style>

</style>
