<script>

  var apiKey = 'AIzaSyB6JE1PeWH7P74oHeJXhQY5anWgH33Pwyk';

  import Notification from './Notification.vue';
  import Panel from './Panel.vue';

  import ride from '../services/ride';

  import AuthenticatedMixin from '../mixins/authenticated';

  export default {
    name: "RideRequest",

    components: {
      Notification,
      Panel
    },

    data: function() {
      return {
        notify: false,
        notificationType: '',
        notificationMessage: '',
        fromAddr: '',
        toAddr: ''
      }
    },

    mixins: [AuthenticatedMixin],

    methods: {
      requestRide() {
        var self = this;

        // do some validation
        if (self.fromAddr == '' || self.toAddr == '') {
          self.$set('notify', true);
          self.$set('notificationType', 'alert');
          self.$set('notificationMessage', 'Please fill out all required fields');

          setTimeout(function(){
            self.$set('notify', false);
          }, 3000);

          return
        }

        ride.request(this, self.user.id, self.fromAddr, self.toAddr).then(function(resp){
          // check for erros
          if(resp.data.message) {
            self.$set('notify', true);
            self.$set('notificationType', 'alert');
            self.$set('notificationMessage', resp.data.message);
          } else {
            self.$set('notify', true);
            self.$set('notificationType', 'success');
            self.$set('notificationMessage', 'Request was made!');
          }

          setTimeout(function(){
            self.$set('notify', false);
          }, 3000);
        });
      },

      getCurrentLocation() {
        var self = this;

        self.$set('fromAddr', 'Getting current location...');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              self.$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&key=' + apiKey).then(function(resp){
                self.$set('fromAddr', resp.data.results[0].formatted_address);
              }, function(resp){
                console.log(resp);
              });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
      }
    }
  }
</script>

<template>
  <div id="rideRequestWrapper">
    <div class="row">
      <div class="small-12 medium-6  medium-offset-3 columns">
        <notification :notify="notify" :notification-type="notificationType" :notification-message="notificationMessage"></notification>
        <panel title="Ride Request">
          <input type="text" v-model="fromAddr" placeholder="From address" v-on:focus="getCurrentLocation()">
          <input type="text" v-model="toAddr" placeholder="To address">
          <button type="button"  class="button success" name="button" @click="requestRide()">REQUEST RIDE</button>
        </panel>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  #rideRequestWrapper{
    padding: 30px;

    button {
    margin: auto;
    }
  }
</style>
