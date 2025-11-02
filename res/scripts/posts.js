
// posts.js — Uses a <template> defined in index.html (no innerHTML, no createElement)

const POSTS_API_URL = "https://api.jsonbin.io/v3/b/69029734ae596e708f36a304";
const MASTER_KEY = "$2a$10$D3uNRrk49ku.x.jU1JVcUeQyHcW7KA6iW7nD4.lmvxAFvh0AB6ef.";

/* 
async function fetchPosts() {
  try {
    const response = await fetch(POSTS_API_URL, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

    const data = await response.json();
    renderPosts(data.record || []);
  } catch (error) {
    console.error("Error fetching posts:", error);
    document.getElementById("posts-container").textContent = "Failed to load posts.";
  }
}

*/

async function fetchPosts() {
  try {
    const response = await fetch("res/data/posts.json");
    if (!response.ok) throw new Error('HTTP error! ${response.status}');

    const data = await response.json();
    renderPosts(data);
  } catch(error) {
    console.error("Error fetching local posts: ", error);
    document.getElementById("posts-container").textContent = "Failed to load local posts.";
  }
}

function renderPosts(posts) {
  const container = document.getElementById("posts-container");
  const template = document.getElementById("post-template");
  container.innerHTML = "";

  if (!posts.length) {
    container.textContent = "No posts found.";
    return;
  }

  posts.forEach((post) => {
    // Clone template content
    const clone = template.content.cloneNode(true);

    // Fill in data
    const profilePic = clone.querySelector(".profile-pic");
    profilePic.src = post.authorImage;

    const date = clone.querySelector(".post-time");
    date.textContent = post.date;

    const text = clone.querySelector(".post-text");
    text.textContent = post.text;

    const postImg = clone.querySelector(".post-img");
    if (post.postImage) {
      postImg.src = post.postImage;
      postImg.style.display = "block";
    }

    // Append the filled template
    container.appendChild(clone);
  });
}

document.addEventListener("DOMContentLoaded", fetchPosts);
