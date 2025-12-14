<template>
  <div class="header">
    <Header />
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center logout">Logout</button>
    </div>
    <div class="post-list">  
      <div class="post" v-for="post in posts"   :key="post.id" @click="goToPost(post.id)">
          <p> {{post.body}} </p>
          <p class="created" v-if="post.created_at">  <small>Created: {{ formatDate(post.created_at) }}</small> </p>
      </div>
    </div>
    <!-- Bottom action: Add post button -->
    <div class="bottom-actions">
      <router-link v-if="authResult" to="/addpost" class="action-btn">Add post</router-link>
      <button v-if="authResult" @click="deleteAllPosts" class="action-btn">Delete All</button>
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
          this.$router.push("/login");
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
      this.$router.push(`/apost/${postId}`);
    },
    deleteAllPosts() {
      if (!confirm("Are you sure you want to delete ALL posts?")) return;

      fetch("http://localhost:3000/api/posts", {
        method: "DELETE",
        credentials: "include",
      })
          .then(() => {
            this.fetchPosts(); // refresh list
          })
          .catch(err => console.log(err));
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
  margin: 0 auto;
}

p{
  background: rgb(212, 212, 212);
}

nav{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}

.logout {
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
  cursor: pointer;
}

nav{
  display: flex;
  align-items: center;
}

.post {
  padding: 10px;
  background: rgb(212, 212, 212);
  border-radius: 10px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
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
  gap: 30px;
  margin: 18px 0;
}

.action-btn {
  background: #4ea3ff;
  color: white;
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  padding: 10px 22px;
  border-radius: 18px;
  border: 0;
  box-shadow: 0 6px 14px rgba(78,163,255,0.22);
  cursor: pointer;
}

.action-btn:hover {
  background: #358fe0;
}

.logout:hover {
  background: #eed881;
}

.post:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>