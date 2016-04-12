<script>
  import ride from '../services/ride';

  export default {
    name: "Directions",

    data: function(){
      return {
        request: {}
      }
    },

    ready: function() {
      var self = this;
      setTimeout(function(){
        var fromAddr = {lat: self.request.from_address.latitude, lng: self.request.from_address.longitude};
        var toAddr = {lat: self.request.to_address.latitude, lng: self.request.to_address.longitude};

        var map = new google.maps.Map(document.getElementById('map'), {
          center: fromAddr,
          scrollwheel: true,
          zoom: 10
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        // Set destination, origin and travel mode.
        var request = {
          destination: toAddr,
          origin: fromAddr,
          travelMode: google.maps.TravelMode.DRIVING
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });
      }, 300);
    },

    created: function() {
      var self = this;
      ride.getByID(self, self.$route.params.requestID).then(function(resp){
        if(resp.data.message){
          console.log(resp.data.message);
          return
        }
        console.log(resp.data.request);
        self.$set('request', resp.data.request);
      });
    }
  }
</script>

<template>
  <div id="directionsWrapper">
    <div id="map">

    </div>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  #directionsWrapper{
    padding: 30px;

    #map {
      height: 500px;
    }
  }
</style>
