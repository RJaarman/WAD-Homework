<template>
  <header>
    <nav class="navbar">
      <div class="nav-center">
        <router-link to="/" class="nav-link">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/about" class="nav-link">Contacts</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 6px;
  border: 1px solid rgba(0,0,0,0.04);
}
.nav-center {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav-link {
  color: #111;
  text-decoration: none;
  font-weight: 600;
  padding: 6px 8px;
}
.nav-link:hover {
  color: #0a66a3;
}
.divider {
  color: #888;
}

@media (max-width: 600px) {
  .nav-link { font-size: 14px; }
  .navbar { padding: 6px; border-radius: 6px; }
}
</style>
