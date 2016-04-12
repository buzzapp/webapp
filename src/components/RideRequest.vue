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
        toAddr: '',
        results: [],
        selectedToAdd: ''
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

        /**************** CLEAN THIS UP *****************/

        var fromAddr;
        var toAddr;

        // get the lat and long of each address
        // maybe this portion can be moved to the service itself
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': self.fromAddr}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
            fromAddr = {
              'latitude': results[0].geometry.location.lat(),
              'longitude': results[0].geometry.location.lng()
            }
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });

        geocoder.geocode({'address': self.toAddr}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
            toAddr = {
              'latitude': results[0].geometry.location.lat(),
              'longitude': results[0].geometry.location.lng()
            }
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });

        /***********************************************/

        var clear;

        clear = setInterval(function(){
          if(fromAddr != undefined || toAddr != undefined) {
            ride.request(self, self.user.id, fromAddr, toAddr).then(function(resp){
              // check for erros
              if(resp.data.message) {
                self.$set('notify', true);
                self.$set('notificationType', 'alert');
                self.$set('notificationMessage', resp.data.message);
              } else {
                self.$set('notify', true);
                self.$set('notificationType', 'success');
                self.$set('notificationMessage', 'Request was made!');

                // Clear out fields
                self.$set('fromAddr', '');
                self.$set('toAddr', '');
              }

              setTimeout(function(){
                self.$set('notify', false);
              }, 3000);

              clearInterval(clear);
            });
          }
        }, 100);
      },

      getCurrentLocation() {
        var self = this;

        document.getElementById('fromAddress').placeholder = 'Getting current location...';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
                geocoder.geocode({'location': latlng}, function(results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                      self.$set('fromAddr', results[0].formatted_address);
                    } else {
                      window.alert('No results found');
                    }
                  } else {
                    window.alert('Geocoder failed due to: ' + status);
                  }
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
      },

      autoComplete() {
        var self = this;

        var service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: self.toAddr }, function(predictions, status){
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }

          self.$set('results', predictions);
        });
      },

      selectToAddress(result) {
        this.$set('toAddr', result);
        this.$set('results', []);
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
          <input type="text" v-model="fromAddr" id="fromAddress" placeholder="From address" v-on:focus="getCurrentLocation()">
          <input type="text"  v-model="toAddr" placeholder="To address" v-on:keyup="autoComplete()">
          <div class="results" v-if="results.length > 0">
            <p v-for="result in results" @click="selectToAddress(result.description)">
              {{result.description}}
            </p>
          </div>
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
