import auth from '../services/auth';

export default {
  data: function() {
    return {
      user: auth.user
    }
  }
}
