<template>
  <div>
    <Header />

    <div class="posts">
      <Post 
      v-for="(p, i) in posts" 
      :key="i" 
      :post="p"
      :index="i"
    />
    </div>
    

    <button @click="RESET_LIKES">Reset all likes</button>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Post from '../components/Post.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { Header, Footer, Post },

  computed: {
    ...mapState(['posts'])
  },

  methods: {
    ...mapMutations(['RESET_LIKES'])
  }
}
</script>
