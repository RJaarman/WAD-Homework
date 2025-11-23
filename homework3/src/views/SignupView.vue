<template>
  <div>
    <Header />

    <form @submit.prevent="handleSignup">
      <input v-model="password" type="password" placeholder="Password" />

      <button type="submit">Submit</button>

      <p v-if="error">{{ error }}</p>
    </form>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {Header, Footer},
  
  data() {
    return {
      password: "",
      error: ""
    }
  },

  methods: {
    validatePassword(pw) {
            const errors = [];
            
            if (pw.length < 8 || pw.length >= 15) {
                errors.push("The password should be at least 8 characters and less than 15 characters");
            }
            
            if (!/^[A-Z]/.test(pw)) {
                errors.push("It should start with an uppercase alphabet");
            }
            
            if (!/[A-Z]/.test(pw)) {
                errors.push("Includes at least one uppercase alphabet character");
            }
            
            const lowers = pw.match(/[a-z]/g) || [];
            if (lowers.length < 2) {
                errors.push("Includes at least two lowercase alphabet characters");
            }
            
            if (!/\d/.test(pw)) {
                errors.push("Includes at least one numeric value");
            }
            
            if (!/_/.test(pw)) {
                errors.push('It should include the character "_"');
            }
            
            return errors;
        },
        validateEmail(email) {
            // simple but correct email regex
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email);
        },
        handleSignup() {
            // Clear previous errors
            this.errorMessage = '';

            // Email format check
            if (!this.validateEmail(this.email)) {
                this.errorMessage = "Email format is invalid";
                return;
            }
            // Emails match check
            if (this.email !== this.confirmEmail) {
                this.errorMessage = "Emails do not match";
                return;
            }
            
            // Check if passwords match
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match";
                return;
            }
            
            // Validate password
            const passwordErrors = this.validatePassword(this.password);
            if (passwordErrors.length > 0) {
                this.errorMessage = "The password is not valid - " + passwordErrors.join(", ");
                return;
            }
            
            // If everything is valid
            alert('Signup successful!');
            this.$emit('page-change', 'main');
        }
  }
}
</script>
