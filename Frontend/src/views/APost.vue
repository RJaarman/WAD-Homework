<template>
  <div class="A Post">
    <Header />
    <div id="form">
      <h3>A Post</h3>
      <label for="body">Body: </label>
      <input name="body" type="text" id="body" required v-model="post.body" />
      <p v-if="post.created_at">Created: {{ formatDate(post.created_at) }}</p>
    </div>
    <div class="container">
      <button @click="updatePost" class="updatePost">Update Post</button>
      <button @click="deletePost" class="deletePost">Delete Post</button>
    </div>
    <Footer />
  </div>
</template>


<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import auth from "../auth";
export default {
  name: "APost",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      post: {
        id: "",
        body: "",
        created_at: "",
      },
    };
  },
  mounted() {
    if (!auth.authenticated()) {
      this.$router.push("/api/login");
    }
    this.fetchAPost(this.$route.params.id);
  },
  methods: {
    fetchAPost(id) {
      fetch(`http://localhost:3000/api/posts/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    updatePost() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ body: this.post.body }),
      })
        .then((response) => response.json())
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatDate(value) {
      if (!value) return '';
      const d = new Date(value);
      if (isNaN(d)) return value;
      return d.toLocaleString();
    },
    deletePost() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

};

</script>

<style scoped>
#form {
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
}
.container {
  display: flex;
  justify-content: center;
}
</style>