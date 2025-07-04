<template>
  <div id="app">
    <header class="top-navbar">
      <Appnavbar></Appnavbar>
    </header>
    <!-- Main content area -->
    <div :class="['main-content', { 'main-content-shifted': isSidebarOpen }]">
      <router-view></router-view>
    </div>

    <!-- Footer Component -->
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from './common/components/appfooter.vue';
import Appnavbar from './common/components/์AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    Appnavbar
  },
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style>
/* Global styles for #app */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack children vertically */
  min-height: 100vh; /* Ensure app takes at least full viewport height */
  background-color: #f3f4f6; /* Consistent background */
}

/* Sidebar component styling (from previous updates) */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 256px;
  background-color: #1f2937;
  color: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 50;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.sidebar.is-open {
  transform: translateX(0);
}

.sidebar-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #374151;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  color: #93c5fd;
}

.sidebar-close-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 9999px;
  transition: color 0.2s ease, box-shadow 0.2s ease;
}

.sidebar-close-button:hover {
  color: white;
}

.sidebar-close-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.sidebar-nav {
  margin-top: 32px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 8px; /* Added margin between list items */
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #d1d5db;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 6px;
  margin-left: 8px;
  margin-right: 8px;
}

.sidebar-link:hover {
  background-color: #374151;
  color: white;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  stroke-width: 2;
}

/* Main content area */
.main-content {
  flex-grow: 1; /* Allows main content to take up available vertical space */
  margin-left: 0;
  transition: margin-left 0.3s ease;
  padding: 20px; /* General padding for content */
  padding-top: 68px; /* Space for the fixed button at the top */
  box-sizing: border-box; /* Include padding in element's total width/height */
}

.main-content.main-content-shifted {
  margin-left: 256px; /* Shift when sidebar is open */
}

/* Fixed open sidebar button */
.open-sidebar-button {
  position: fixed; /* Make it stick to the viewport */
  top: 20px; /* Distance from the top of the viewport */
  left: 20px; /* Initial distance from the left */
  z-index: 1000; /* Ensure it's above other content */
  transition: left 0.3s ease-in-out; /* Smooth transition when sidebar opens/closes */

  background-color: #2563eb;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.open-sidebar-button:hover {
  background-color: #1d4ed8;
}

.open-sidebar-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.open-sidebar-button.shifted {
  left: calc(20px + 256px); /* Adjust left position when sidebar is open */
}
</style>
