<template>
  <Header />
  <div class="form">
    <h3>SignUp</h3>
    <label for="email">Email</label>
    <input type="email" name="email" required v-model="email">

    <label for="password">Password</label>
    <input type="password" name="password" required v-model="password">

    <p class="error-msg" v-if="errorMessage">{{ errorMessage }}</p>

    <button @click="SignUp" class="SignUp">SignUp</button>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
name: "SignUp",
components: {
    Header,
    Footer
  },

  data: function() {
    return {
   email: '',
   password: '',
   errorMessage: ''
  }
  },
  methods: {

    validatePassword (pw) {
      const errors = []

      // length 8–14
      if (pw.length < 8 || pw.length >= 15) {
        errors.push('The password should be at least 8 characters and less than 15 characters')
      }

      // starts with uppercase
      if (!/^[A-Z]/.test(pw)) {
        errors.push('It should start with an uppercase alphabet')
      }

      // at least 1 uppercase
      if (!/[A-Z]/.test(pw)) {
        errors.push('Includes at least one uppercase alphabet character')
      }

      // at least 2 lowercase
      const lowers = pw.match(/[a-z]/g) || []
      if (lowers.length < 2) {
        errors.push('Includes at least two lowercase alphabet characters')
      }

      // at least 1 digit
      if (!/\d/.test(pw)) {
        errors.push('Includes at least one numeric value')
      }

    

      return errors
    },

    validateEmail (email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(email)
    },


    SignUp() {
      // clear previous error
      this.errorMessage = ''

      // client-side validation
      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Email format is invalid'
        return
      }

      // no confirm fields — skip matching checks

      const passwordErrors = this.validatePassword(this.password)
      if (passwordErrors.length > 0) {
        this.errorMessage = 'The password is not valid - ' + passwordErrors.join(', ')
        return
      }

      // if client validation passed, call backend
      const data = { email: this.email, password: this.password };
      console.log('SignUp clicked', data);
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then(async (response) => {
        if (!response.ok) {
          // prefer JSON error if present
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const json = await response.json();
            this.errorMessage = json.error || json.message || 'Signup failed';
          } else {
            const text = await response.text();
            this.errorMessage = text || 'Signup failed';
          }
          throw new Error(this.errorMessage);
        }
        return response.json();
      })
      .then((data) => {
        console.log('signup success', data);
        this.errorMessage = '';
        this.$router.push('/');
      })
      .catch((e) => {
        console.error('signup error', e);
        if (!this.errorMessage) this.errorMessage = e.message || 'Signup failed';
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
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
.error-msg {
  color: #c83b3b;
  font-size: 0.95em;
  margin-top: 8px;
  margin-bottom: 6px;
}
</style>