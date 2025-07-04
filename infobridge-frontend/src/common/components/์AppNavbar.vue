<template>
  <header class="top-navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <!-- Placeholder for Logo/Brand Name -->
        <img src="https://placehold.co/50x50/e67e22/ffffff?text=LOGO" alt="Hospital Logo" class="hospital-logo" />
        <span class="brand-name">MaeAi-Hos:Intar-Portal</span>
      </div>
      <nav class="navbar-nav">
        <ul>
          <li><router-link to="/">หน้าหลัก</router-link></li>
          <li><router-link to="/document">เอกสารและแบบฟอร์ม</router-link></li>
          <li><router-link to="/common">ช่องทางติดต่อภายใน</router-link></li>
          <li class="dropdown">
            <a href="#" class="dropbtn">ข่าวสารประชาสัมพันธ์</a>
            <div class="dropdown-content">
              <router-link to="/news">ข่าวประกาศ</router-link>
              <router-link to="/common">กิจกรรม</router-link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar', // Multi-word component name
  methods: {
    navigateToItaHome() {
      // Use Vue Router to navigate to the /ITA-HOME path
      // Ensure Vue Router is properly set up and available via this.$router
      if (this.$router) {
        this.$router.push('/ITA-HOME');
      } else {
        console.error('Vue Router instance not found. Make sure it is installed and used.');
      }
    }
  }
};
</script>

<style scoped>
.top-navbar {
  position: fixed; /* Make it stick to the top */
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff; /* White background for the navbar */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  z-index: 999; /* Ensure it's above other content but below sidebar if needed */
  padding: 10px 20px; /* Padding inside the navbar */
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content horizontally */
}

.navbar-content {
  display: flex;
  justify-content: space-between; /* Distribute items to edges */
  align-items: center;
  max-width: 1200px; /* Max width for content, similar to footer */
  width: 100%;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.hospital-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 8px; /* Rounded corners for the logo */
}

.brand-name {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
}

.navbar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.navbar-nav li {
  margin-left: 20px; /* Space between nav items */
  position: relative; /* Needed for dropdown positioning */
}

.navbar-nav a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 5px 0;
  transition: color 0.3s ease;
  display: block; /* Make links block for better click area */
}

.navbar-nav a:hover {
  color: #3498db; /* Blue on hover */
}

/* Dropdown specific styles */
.dropdown .dropbtn {
  /* Style for the dropdown trigger text */
  padding: 5px 0;
  cursor: pointer;
}

.dropdown-content {
  display: none; /* Hidden by default */
  position: absolute;
  background-color: #f9f9f9; /* Background for dropdown */
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1; /* Ensure it's above other content */
  border-radius: 5px;
  top: 100%; /* Position below the parent link */
  left: 0;
  padding: 10px 0; /* Padding inside the dropdown box */
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  transition: background-color 0.2s ease;
}

.dropdown-content a:hover {
  background-color: #ddd;
  color: #3498db;
}

.dropdown:hover .dropdown-content {
  display: block; /* Show dropdown on hover */
}

.ita-button {
  background-color: #28a745; /* Green color */
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-left: 20px; /* Space from last nav item */
}

.ita-button:hover {
  background-color: #218838; /* Darker green on hover */
}

/* Responsive adjustments for navbar */
@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar-nav ul {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 10px;
  }
  .navbar-nav li {
    margin-left: 0;
    margin-bottom: 5px;
    width: 100%; /* Ensure full width for stacked items */
  }
  .navbar-nav a {
    padding: 5px 10px; /* Adjust padding for stacked links */
  }
  .dropdown {
    width: 100%; /* Full width for dropdown on mobile */
  }
  .dropdown-content {
    position: static; /* Stack dropdown content on mobile */
    box-shadow: none; /* Remove shadow on mobile */
    border-top: 1px solid #eee; /* Add subtle border */
    padding: 0; /* Remove padding */
    width: 100%;
  }
  .dropdown-content a {
    padding-left: 30px; /* Indent sub-items */
    background-color: #f0f0f0; /* Slightly different background */
  }
  .ita-button {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
