<template>
  <Header />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "AboutView",
  components: {
    Header,
    Footer
  },
}
</script>
