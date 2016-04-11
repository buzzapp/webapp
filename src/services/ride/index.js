const RIDE_BASE_URL = "http://localhost:8001";

var latitude;
var longitude;
var done = false;

export default {
    request(ctx, userID, fromAddress, toAddress) {
            // url for ride request service
            var url = RIDE_BASE_URL + '/users/' + userID + '/requests';

            var payload = {
                "from_Address": fromAddress,
                "to_address": toAddress
            };

            return ctx.$http.post(url, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(function(resp) {
                return resp;
            }, function(resp) {
                return resp;
            });
        },

        accept(ctx, id) {
            var url = RIDE_BASE_URL + '/requests/' + id + "/accept";

            return ctx.$http.post(url, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(function(resp) {
                return resp;
            }, function(resp) {
                return resp;
            });
        },

        getUnacceptedRequests(ctx) {
            var url = RIDE_BASE_URL + '/requests?accepted=false';

            return ctx.$http.get(url, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(function(resp) {
                return resp;
            }, function(resp) {
                return resp;
            });
        }
}
