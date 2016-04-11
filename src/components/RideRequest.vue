<script>
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
        notificationMessage: ''
      }
    },

    mixins: [AuthenticatedMixin],

    methods: {
      requestRide() {
        ride.request(this, this.user.id);
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
