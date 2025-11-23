<template>
    <header>
        <nav class="navbar">
            <div class="nav-left">
                <router-link to="/" class="nav-link">Home</router-link>
                <router-link to="/signup" class="nav-link">Signup</router-link>
            </div>
            <div class="profile-wrapper">
                <img 
                    src="@/assets/profile.png" 
                    alt="Profile"
                    class="profile-pic"
                    @click="toggleDropdown"
                    id="profile-btn"
                >
                <div class="dropdown" :class="{ show: showDropdown }" id="profile-dropdown">
                    <div class="dropdown-header">
                        <div class="dropdown-name">User Name</div>
                        <div class="dropdown-email">user@mail.com</div>
                    </div>
                    <button class="dropdown-item" @click="$router.push('/')">Profile</button>
                    <button class="dropdown-item" @click="$router.push('/signup')">Signup</button>
                </div>
            </div>
        </nav>
    </header>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<script>
export default {
    data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  },
  mounted() {
  document.addEventListener('click', e => {
    if (!this.$el.contains(e.target)) this.showDropdown = false;
  });
}
}
</script>
