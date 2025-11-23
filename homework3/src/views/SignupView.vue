<template>
  <div>
    <Header />

    <div class="center-box">
      <div class="form-container" id="signup">
        <form class="login-form" @submit.prevent="handleSignup" novalidate>
          <div class="form-row">
            <label>Email</label>
            <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
            />
          </div>

          <div class="form-row">
            <label>Confirm Email</label>
            <input
                type="email"
                v-model="confirmEmail"
                placeholder="Confirm Email"
                required
            />
          </div>

          <div class="form-row">
            <label>Password</label>
            <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
            />
          </div>

          <div class="form-row">
            <label>Confirm Password</label>
            <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm Password"
                required
            />
          </div>

          <!-- Task 6: error text inside the form -->
          <p v-if="errorMessage" class="error-msg">
            {{ errorMessage }}
          </p>

          <div class="button-center">
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'SignupView',
  components: { Header, Footer },

  data () {
    return {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
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

      // includes "_"
      if (!/_/.test(pw)) {
        errors.push('It should include the character "_"')
      }

      return errors
    },

    validateEmail (email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(email)
    },

    handleSignup () {
      // clear previous error
      this.errorMessage = ''

      // 1) email format
      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Email format is invalid'
        return
      }

      // 2) emails match
      if (this.email !== this.confirmEmail) {
        this.errorMessage = 'Emails do not match'
        return
      }

      // 3) passwords match
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match'
        return
      }

      // 4) password rules
      const passwordErrors = this.validatePassword(this.password)
      if (passwordErrors.length > 0) {
        this.errorMessage =
            'The password is not valid - ' + passwordErrors.join(', ')
        return
      }

      // ✅ all good
      alert('Signup successful!')

      // optional: navigate somewhere (if you use vue-router)
      // this.$router.push('/')

      // clear form
      this.email = ''
      this.confirmEmail = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
}
</script>
