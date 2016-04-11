import auth from '../../services/auth';

export default {
  http: {
     headers: {
       Authorization: 'Bearer ' + localStorage.getItem('token')
     }
   },

   data: function() {
     return {
       user: auth.user
     }
   },

   route: {
     canActivate() {
       return auth.user.authenticated;
     }
   }
}
