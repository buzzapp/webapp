const RIDE_BASE_URL = "http://localhost:8001";

var latitude;
var longitude;
var done = false;

export default {
    request(ctx, userID) {
            // url for ride request service
            var url = RIDE_BASE_URL + '/users/' + userID + '/requests';

            // get the latitude and longitude
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(function(position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    done = true; // should be a cleaner way to make sure the request finished

                    var cords = {
                        "latitude": latitude,
                        "longitude": longitude
                    };

                    return ctx.$http.post(url, cords).then(function(resp) {
                        // Refactor this I have to figure out how I can return this function
                        // and handle this in the component
                        ctx.$set('notify', true);
                        ctx.$set('notificationType', 'success');
                        ctx.$set('notificationMessage', 'Request was made!');

                        // Remove the alert banner after 3 seconds
                        setTimeout(function() {
                            ctx.$set('alert', false);
                        }, 3000);

                        return;
                    }, function(resp) {
                        ctx.$set('notify', true);
                        ctx.$set('notificationType', 'alert');
                        ctx.$set('notificationMessage', resp.data.message);

                        // Remove the alert banner after 3 seconds
                        setTimeout(function() {
                            ctx.$set('alert', false);
                        }, 3000);

                        return;
                    });
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        },

        accept(ctx, id) {
            var url = RIDE_BASE_URL + '/requests/' + id + "/accept";

            return ctx.$http.post(url).then(function(resp) {
                return resp;
            }, function(resp) {
                return resp;
            });
        },

        getUnacceptedRequests(ctx) {
            var url = RIDE_BASE_URL + '/requests?accepted=false';

            return ctx.$http.get(url).then(function(resp) {
                return resp;
            }, function(resp) {
                return resp;
            });
        }
}
