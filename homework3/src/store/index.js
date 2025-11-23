import { createStore } from 'vuex'
import profileImg from '../assets/profile.png';
import moonImg from '../assets/moon.jpeg';
import ratImg from '../assets/rat.jpeg'

export default createStore({
  state: {
    posts: [
      {
        date: "October 20, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "Theres a lot of homework and I dont know where to even start from",
        likes: 0
      },
      {
        date: "October 15, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "I think I failed my math midterm...",
        likes: 0
      },
      {
        date: "October 10, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "Good luck everyone with the midterms!",
        likes: 0
      },
      {
        date: "September 12, 2025",
        authorImage: profileImg,
        postImage: moonImg,
        text: "Moon eclipse",
        likes: 0
      },
      {
        date: "September 11, 2025",
        authorImage: profileImg,
        postImage: ratImg,
        text: "rat.",
        likes: 0
      },
      {
        date: "September 10, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "How is it going everyone?",
        likes: 0
      },
      {
        date: "September 10, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "Can anyone help me with the data analysis HW?",
        likes: 0
      },
      {
        date: "September 8, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "Anyone want to play something?",
        likes: 0
      },
      {
        date: "September 6, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "I need caffeine",
        likes: 0
      },
      {
        date: "September 4, 2025",
        authorImage: profileImg,
        postImage: "",
        text: "This course is fun",
        likes: 0
      }
    ]
  },
  getters: {
  },
  mutations: {
    LIKE_POST(state, index) {
      state.posts[index].likes++
    },
    RESET_LIKES(state) {
      state.posts.forEach(post => post.likes = 0)
    }
  },
  actions: {
  },
  modules: {
  }
})
