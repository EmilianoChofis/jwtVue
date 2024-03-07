<script setup>

</script>

<template>
<div>
  <h1>Login</h1>
  <form>
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</div>
</template>

<script>
import {jwtDecode} from "jwt-decode";

export default {
  name: 'Login',
  methods:{
    login(role){
      let token;
      switch (role) {
        case 'admin':
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI"
          break;
        case 'viewer':
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidmlld2VyIn0.uoNjQeybe0q6NSVYguZLJCpOg7ftV7b_TW76Cp-3euc"
          break;
        case 'editor':
          token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.O_uqVbz-BOfRRRmyY5bMX0aEg_YmWESE_okCflsM_JA"
          break;
        default:
      }

      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      this.redirect(decoded.role);

    },
    redirectUser(role) {
      if (role === 'admin') {
        this.$router.push('/admin')
      }
      if (role === 'viewer') {
        this.$router.push('/viewer')
      }
      if (role === 'editor') {
        this.$router.push('/editor')
      }
    }
  }
}
</script>