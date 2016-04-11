<script>
  import Pusher from 'pusher-js';

  import Panel from './Panel.vue';

  import ride from '../services/ride';

  export default {
    name: "RideRequests",

    data: function() {
      return {
        requests: []
      }
    },

    methods: {
      accept(id) {
        ride.accept(this, id).then(function(resp){
          // check for error messages
          if(resp.data.message) {
            console.log(resp.data.message);
          } else {
            console.log(resp.data.message);
          }
        });
      }
    },

    ready: function() {
      var self = this;

      var pusher = new Pusher('524d992dcbb206bbae9a', {
        encrypted: true
      });

      var channel = pusher.subscribe('request_channel');
      channel.bind('ride-requested', function(data) {
        self.requests.push(data);
      });

      channel.bind('ride-accepted', function(data) {
        self.$set('requests', data);
      });
    },

    created: function() {
      var self = this;

      ride.getUnacceptedRequests(this).then(function(resp){
        // check for error messages
        if(resp.data.message) {
          console.log(resp.data.message);
        } else {
          if(resp.data.requests != null) {
            self.$set('requests', resp.data.requests);
          }
        }
      });
    }
  }
</script>

<template>
  <div id="rideRequestsWrapper">
    <div class="row">
      <div class="small-12 columns">
        <table class="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Request ID</th>
              <th>From</th>
              <th>To</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in requests">
              <td>{{request.user.username}}</td>
              <td>{{request.id}}</td>
              <td>{{request.from_address}}</td>
              <td>{{request.to_address}}</td>
              <td>{{request.created_at}}</td>
              <td>
                <button type="button" class="button success" name="button" @click="accept(request.id)">ACCEPT</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles

</style>
