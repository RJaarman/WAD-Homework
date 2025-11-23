<template>
  <div class="post-card">
    <div class="post-header">
        <img :src="post.authorImage" class="profile-pic">
        <div class="post-date">{{ post.date }}</div>
    </div>
    <img v-if="post.postImage" :src="post.postImage" class="post-img" />
    <p class="post-text">{{ post.text }}</p>

    <button @click="like(index)">Like ({{ post.likes }})</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ["post", "index"],

  methods: {
    ...mapMutations(['LIKE_POST']),
    like(i) {
      this.LIKE_POST(i)
    }
  }
}
</script>