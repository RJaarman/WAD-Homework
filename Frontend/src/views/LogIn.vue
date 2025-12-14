<template>
  <Header />
  <div class="form">
    <h3>Log in</h3>
    <label for="email">Email</label>
    <input type="email" name="email"  required v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" required v-model="password">
    <p class="error-msg" v-if="error">{{ error }}</p>
    <div class="container">
      <button @click="LogIn"  class="center">LogIn</button>
      <button @click="this.$router.push('/signup')" class="center">Signup</button>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
name: "LogIn", 
components: {
    Header,
    Footer
  },
data: function() {
    return {
   email: '',
   password: '',
   error: ''
  }
  },
  methods: {


LogIn() {
      // clear previous error
      this.error = '';

      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then(async (response) => {
        // On any non-OK response show a generic message to avoid exposing details
        if (!response.ok) {
          this.error = 'Incorrect email or password';
          throw new Error(this.error);
        }
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) return response.json();
        return {};
      })
      .then((data) => {
        console.log(data);
        this.error = '';
        this.$router.push("/");
      })
      .catch((e) => {
        console.log('login error', e);
        if (!this.error) this.error = e.message || 'Login failed';
      });
    },
  }, 
  }

</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: blue;
}
button {
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin: 20px 20px 20px 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
.center {
  margin: auto;
  margin-top: 30px;
  width: 30%;
}
.container {
  display: flex;
  justify-content: center;
}
</style>