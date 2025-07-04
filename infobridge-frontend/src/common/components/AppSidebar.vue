<template>
  <aside :class="['sidebar', { 'is-open': isOpen }]">
    <div class="sidebar-header">
      <h2 class="sidebar-title">
        โปรเจกต์ของฉัน
      </h2>
      <!-- Close button for the sidebar (visible when open) -->
      <!-- This button is now the only toggle inside the sidebar -->
      <button
        @click="toggleSidebar"
        class="sidebar-close-button"
        aria-label="ปิด sidebar"
      >
        <svg
          class="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
    <!-- Sidebar Navigation -->
    <nav class="sidebar-nav">
      <ul>
        <li>
          <a
            href="#"
            class="sidebar-link"
          >
            <!-- Home Icon -->
            <svg
              class="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h3v-3m0 0h3v3m0 0h3v-3m0 0h3v3"
              ></path>
            </svg>
            หน้าหลัก
          </a>
        </li>
        <li>
          <a
            href="#"
            class="sidebar-link"
          >
            <!-- Dashboard Icon -->
            <svg
              class="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9.75 12L7.5 12L7.5 17L9.75 17ZM14.25 17L14.25 12L12 12L12 17L14.25 17ZM18.75 17L18.75 12L16.5 12L16.5 17L18.75 17Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4C3.44772 5 3 5.44772 3 6Z"
              />
            </svg>
            แดชบอร์ด
          </a>
        </li>
        <li>
          <a
            href="#"
            class="sidebar-link"
          >
            <!-- Settings Icon -->
            <svg
              class="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.515-1.042 1.574-1.782 2.766-1.782h.002c1.192 0 2.251.74 2.766 1.782L19.5 7h1.5a2 2 0 012 2v6a2 2 0 01-2 2h-1.5l-4.409 2.683c-.515 1.042-1.574 1.782-2.766 1.782h-.002c-1.192 0-2.251-.74-2.766-1.782L4.5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1.5l4.409-2.683z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            ตั้งค่า
          </a>
        </li>
        <li>
          <a
            href="#"
            class="sidebar-link"
          >
            <!-- Profile Icon -->
            <svg
              class="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            โปรไฟล์
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle');
    }
  }
};
</script>

<style scoped>
/* Sidebar styling */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0; /* inset-y-0 */
  left: 0;
  width: 256px; /* w-64 */
  background-color: #1f2937; /* bg-gray-800 */
  color: white;
  transform: translateX(-100%); /* -translate-x-full */
  transition: transform 0.3s ease-in-out; /* transition-transform duration-300 ease-in-out */
  z-index: 50; /* z-50 */
  border-top-right-radius: 8px; /* rounded-r-lg */
  border-bottom-right-radius: 8px; /* rounded-r-lg */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
}

.sidebar.is-open {
  transform: translateX(0); /* translate-x-0 */
}

.sidebar-header {
  padding: 24px; /* p-6 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #374151; /* border-b border-gray-700 */
}

.sidebar-title {
  font-size: 20px; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: #93c5fd; /* text-blue-300 */
}

.sidebar-close-button {
  background: none;
  border: none;
  color: #9ca3af; /* text-gray-400 */
  cursor: pointer;
  padding: 4px; /* p-1 */
  border-radius: 9999px; /* rounded-full */
  transition: color 0.2s ease, box-shadow 0.2s ease; /* transition-colors */
}

.sidebar-close-button:hover {
  color: white; /* hover:text-white */
}

.sidebar-close-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
}

.sidebar-nav {
  margin-top: 32px; /* mt-8 */
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
  padding: 12px 24px; /* px-6 py-3 */
  color: #d1d5db; /* text-gray-300 */
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease; /* transition-colors duration-200 */
  border-radius: 6px; /* rounded-md */
  margin-left: 8px; /* mx-2 */
  margin-right: 8px; /* mx-2 */
}

.sidebar-link:hover {
  background-color: #374151; /* hover:bg-gray-700 */
  color: white; /* hover:text-white */
}

/* Icons */
.icon {
  width: 20px; /* w-5 */
  height: 20px; /* h-5 */
  margin-right: 12px; /* mr-3 */
  stroke-width: 2; /* stroke-width-2 */
}
</style>
