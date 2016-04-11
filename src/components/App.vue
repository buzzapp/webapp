<script>
  import Topbar from './Topbar.vue'
  import Sidebar from './Sidebar.vue'

  export default {
    name: "App",

    components: {
      Sidebar,
      Topbar
    }
  }
</script>

<template>
  <sidebar></sidebar>
  <topbar></topbar>
  <div id="pagewrapper">
    <router-view></router-view>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  #pagewrapper{
    width: 100%;
    margin-left: 0;
    padding-left: 260px;
    padding-top: 60px;
    height: 100%;
  }
</style>
