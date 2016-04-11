<script>
  import auth from '../services/auth';

  export default {
    name: "Topbar",

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
  <div id="navbar">
    <ul class="list-right-navbar">
      <!-- LOGGED OUT ROUTES -->
      <li v-if="!user.authenticated"><a v-link="{name: 'login'}">Login</a></li>

      <!-- LOGGED IN ROUTES -->
      <li v-if="user.authenticated"><a>{{user.username}}</a></li>
      <li v-if="user.authenticated"><a @click="logout()">Logout</a></li>
    </ul>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  #navbar{
    width: 100%;
    position: fixed;
    height: 60px;
    background: $white;
    color: $grey3;
    margin-left: 260px;
    z-index: 999;
    padding: 1em;

    ul{
      list-style-type: none;
      li{
        margin-top: .6em;
        display: inline-block;
        a{
          color: $grey3;
          font-size: 18px;
        }
      }
    }

    ul.list-right-navbar{
      float: right;
      margin-right: 260px;
    }
  }
</style>
