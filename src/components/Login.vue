<script>
  import Notification from './Notification.vue';
  import Panel from './Panel.vue';

  import auth from '../services/auth';

  export default {
    name: "Login",

    components: {
      Notification,
      Panel
    },

    data: function() {
      return {
        username: '',
        password: '',
        notify: false,
        notificationType: '',
        notificationMessage: ''
      }
    },

    methods: {
      login() {
        var self = this;

        auth.login(this, this.username, this.password).then(function(body){
          // Check if we have an error message
          if(body.data.message){
            self.$set('notify', true);
            self.$set('notificationType', 'alert');
            self.$set('notificationMessage', body.data.message);

            // Remove the alert banner after 3 seconds
            setTimeout(function(){
              self.$set('alert', false);
            }, 3000)

            return;
          }

          // Redirect to dashboard
          alert("success");
        });
      }
    }
  }
</script>

<template>
  <div id="loginWrapper">
    <div class="row">
      <div class="small-12 medium-6 medium-offset-3 columns">
        <notification :notify="notify" :notification-type="notificationType" :notification-message="notificationMessage"></notification>
        <panel title="Login">
          <input type="text" v-model="username" placeholder="Username">
          <input type="password" v-model="password" placeholder="Password">
          <button type="button" class="button success" name="button" @click="login()">LOGIN</button>
        </panel>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  #loginWrapper{
    padding: 30px;

    button{
      margin: auto;
    }
  }
</style>
