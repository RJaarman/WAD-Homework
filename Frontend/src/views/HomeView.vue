<template>
  <div class="header">
    <Header />
    <div class="container">
    <button v-if = "authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts"   :key="post.id" @click="goToPost(post.id)">  
      <div class="post">
          <h3 v-if="post.title">  Title:  {{post.title}} </h3>
          <p>  <b> </b> {{post.body}} </p>
          <p class="created" v-if="post.created_at">  <small>Created: {{ formatDate(post.created_at) }}</small> </p>
      </div>
    </div>
    <!-- Bottom action: Add post button -->
    <div class="bottom-actions">
      <router-link v-if="authResult" to="/api/addpost" class="add-btn">Add post</router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// @ is an alias to /src
import auth from "../auth";

export default {
  name: "HomeView",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      posts:[ ],
      authResult: auth.authenticated()
    };
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => {
          console.log("jwt removed");
          this.$router.push("api/login");
        })
        .catch((e) => console.log("logout error", e));
    },
    
    fetchPosts() {
      fetch("http://localhost:3000/api/posts", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.posts = data
        })
        .catch((err) => console.log(err.message));
    },
    formatDate(value) {
      if (!value) return '';
      const d = new Date(value);
      if (isNaN(d)) return value;
      return d.toLocaleString();
    },
    goToPost(postId) {
      this.$router.push(`/api/apost/${postId}`);
    },
  }, 
  mounted() {
        this.fetchPosts();
    },
};
</script>

<style scoped>
body{
  margin: 20px 40px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  background: #fafafa;
  position: relative;
}
.post-list{
  background: rgb(212, 212, 212);
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 10px;
}
h3{
    margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #000000;
  background: gray;
}
p{
  background: rgb(212, 212, 212);
}
h1, h2, h3, h4, ul, li, a, input, label, button, div, footer{
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}
input{
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
label{
  display: block;
  margin: 20px 0 10px;
}
button{
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
nav{
  display: flex;
  align-items: center;
}
.post {
    width: 80%;
    position: relative;
    padding: 10px;
    margin: 10px auto;
    border: 1px solid gray;
    text-align: left;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin: 10px auto;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}

/* Floating action button */
.bottom-actions {
  display: flex;
  justify-content: center;
  margin: 18px 0;
}
.add-btn {
  background: #4ea3ff;
  color: white;
  padding: 8px 20px;
  border-radius: 18px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(78,163,255,0.22);
}
.add-btn:hover {
  background: #358fe0;
}
</style>