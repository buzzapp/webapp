<script>
  import auth from '../services/auth';

  export default {
    name: "Sidebar",

    data: function() {
      return {
        user: auth.user
      }
    },

    methods: {
      logout() {
        auth.logout();
      }
    }
  }
</script>

<template>
  <div id="sidebar">
    <ul class="list-sidebar">
      <li class="title">Buzz<span class="small-title">co</span></li>
      <li v-if="!user.authenticated" class="nav-item"><a v-link="{'name': 'login'}">Login</a></li>

      <!--  LOGGED IN ROUTES-->
      <li v-if="user.role == 'student'" class="nav-item"><a v-link="{name: 'ride-request'}">Ride Request</a></li>
      <li v-if="user.role == 'driver'" class="nav-item"><a v-link="{name: 'ride-requests'}">Ride Request</a></li>
      <li v-if="user.authenticated" class="nav-item"><a @click="logout()">Logout</a></li>
    </ul>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  #sidebar{
    width: 260px;
    left:0;
    position: fixed;
    z-index: 1000;
    background-color: $green;
    height: 100vh;

    ul.list-sidebar{
      margin: 0;
      list-style-type: none;

      li{
          padding: .8em;
          border-bottom: solid 1px #ccc;

          a{
            color: $white;
          }
      }

      li.nav-item:hover{
          background-color: $dark-green;
      }

      li.title{
        height: 60px;
        border-bottom: solid 1px $white;
        font-weight: 600;
        color: $white;
        padding: .5em;
        font-size: 28px;
        span{
          font-size: 15px;
        }
      }
    }
  }
</style>
