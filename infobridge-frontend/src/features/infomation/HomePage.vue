<template>
  <div class="home">
    <header class="hero-section">
      <!-- Image Slider Container -->
      <div class="slider-container">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="'Slide ' + (index + 1)"
          :class="['slider-image', { 'active': index === currentIndex }]"
        />


        <!-- Slider Navigation Buttons -->
        <button @click="prevSlide" class="slider-nav-btn prev">&#10094;</button>
        <button @click="nextSlide" class="slider-nav-btn next">&#10095;</button>

        <!-- Slider Dots Indicators -->
        <div class="slider-dots">
          <span
            v-for="(image, index) in images"
            :key="'dot-' + index"
            :class="['dot', { 'active': index === currentIndex }]"
            @click="goToSlide(index)"
          ></span>
        </div>


        <!-- Image Description at Bottom Right -->
        <div class="image-description">
          <p v-if="images[currentIndex]">{{ images[currentIndex].description }}</p>
        </div>
      </div>
    </header>


    <section class="info-sections">
      <div class="info-card">
        <h2>ข่าวสารและประกาศ</h2>
        <p>อัปเดตข้อมูลล่าสุดจากโรงพยาบาล</p>
        <a href="#" class="link">ดูข่าวสารทั้งหมด &raquo;</a>
      </div>

      <div class="info-card">
        <h2>เอกสารและแบบฟอร์ม</h2>
        <p>บริการเอกสารและแบบฟอร์มอิเล็กทรอนิกส์</p>
        <a href="#" class="link">ดูเอกสารและแบบฟอร์มทั้งหมด &raquo;</a>
      </div>

      <div class="info-card">
        <h2>ช่องทางติดต่อภายใน</h2>
        <p>ข้อมูลช่องทางติดต่อภายในองค์กร</p>
        <a href="#" class="link">ดูช่องทางติดต่อทั้งหมด &raquo;</a>
      </div>

      <div class="info-card">
        <h2>ระบบบริหารจัดการ MaHIP</h2>
        <p>ระบบบริหารจัดการMae Ai Hospital Information Page</p>
        <a href="#" class="link">เข้าใช้งานระบบ MaHIP &raquo;</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage', 
  data() {
    return {
      images: [
        { src: 'https://placehold.co/1920x1080/007bff/ffffff?text=Image+1', description: 'ภาพบรรยากาศโรงพยาบาลแม่อาย 1' },
        { src: 'https://placehold.co/1920x1080/28a745/ffffff?text=Image+2', description: 'กิจกรรมส่งเสริมสุขภาพชุมชน' },
        { src: 'https://placehold.co/1920x1080/ffc107/000000?text=Image+3', description: 'การบริการด้วยใจจากบุคลากรของเรา' },
        { src: 'https://placehold.co/1920x1080/dc3545/ffffff?text=Image+4', description: 'เทคโนโลยีทางการแพทย์ที่ทันสมัย' },
        { src: 'https://placehold.co/1920x1080/6f42c1/ffffff?text=Image+5', description: 'พื้นที่สีเขียวเพื่อการพักผ่อน' },
      ],
      currentIndex: 0,
      intervalId: null,
      currentYear: new Date().getFullYear(), // Example dynamic data
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    startAutoPlay() {
      this.stopAutoPlay(); // Clear any existing interval
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change image every 5 seconds
    },
    stopAutoPlay() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    goToHistory() {
      // Implement navigation to History page if needed
      alert('ไปยังหน้าประวัติความเป็นมา');
      // Example with Vue Router: this.$router.push('/history');
    },
    goToContact() {
      // Implement navigation to Contact page if needed
      alert('ไปยังหน้าติดต่อหน่วยงาน');
      // Example with Vue Router: this.$router.push('/contact-units');
    },
  },
  mounted() {
    this.startAutoPlay();
    console.log('HomePage mounted!');
  },
  beforeUnmount() {
    this.stopAutoPlay(); // Stop autoplay when component is unmounted
  },
};
</script>

<style scoped>
/* CSS ที่มีผลเฉพาะในคอมโพเนนต์นี้เท่านั้น */
.home {
  font-family: 'Prompt', sans-serif; /* แนะนำให้ใช้ Font ที่รองรับภาษาไทย */
  text-align: left;
  color: #2c3e50;
  padding: 0; /* Removed padding to allow slider to fill its parent */
  background-color: #f8f9fa;
}

.hero-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 70vh; /* Adjust as needed for desired height */
  background-color: #007bff; /* Fallback color */
  border-radius: 8px;
  margin-bottom: 40px;
  text-align: left;
}

.slider-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the container */
  opacity: 0; /* Hidden by default */
  transition: opacity 1s ease-in-out; /* Smooth fade */
}

.slider-image.active {
  opacity: 1; /* Show active image */
}

.hospital-name {
  position: absolute;
  bottom: 80px; /* Adjusted to be closer to the buttons (buttons are at 30px, gap 15px, button height ~40px, so 30+15+~35 = ~80px) */
  left: 30px; /* Align with the buttons */
  color: white;
  font-size: 2.5em; /* Adjusted font size */
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 10;
  text-align: left; /* Align text to the left */
  width: auto; /* Allow width to adjust to content */
  transform: none; /* Remove transform as it was used for centering */
}

.hero-buttons {
  position: absolute;
  bottom: 30px;
  left: 30px;
  z-index: 10;
  display: flex;
  gap: 15px;
}

.hero-button {
  background-color: rgba(0, 123, 255, 0.8); /* Blue with transparency */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none; /* For router-link or a */
  display: inline-block; /* For padding */
}

.hero-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.slider-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 11;
  font-size: 2em;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.slider-nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.slider-nav-btn.prev {
  left: 10px;
}

.slider-nav-btn.next {
  right: 10px;
}

.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: white;
}

/* Image Description Styling */
.image-description {
  position: absolute;
  bottom: 30px; /* Align with buttons */
  right: 30px; /* Position at bottom right */
  color: white;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1em;
  z-index: 10;
  max-width: 300px; /* Limit width */
  text-align: right; /* Align text to the right */
}

.image-description p {
  margin: 0; /* Remove default paragraph margin */
  line-height: 1.4;
}

/* New Vision Section Styling */
.vision-section {
  /* Removed background-color, border-radius, box-shadow */
  padding: 30px;
  margin: 40px 20px; /* Top/bottom margin, horizontal padding from .home */
  text-align: center; /* Centered text */
}

.vision-section .section-title {
  color: #007bff; /* Blue color for title */
  font-size: 2em;
  margin-bottom: 15px;
  font-weight: bold;
}

.vision-section .vision-text {
  font-size: 1.1em;
  line-height: 1.6;
  color: #34495e; /* Dark gray text */
  max-width: 800px; /* Limit width for readability */
  margin: 0 auto; /* Center the text block */
}


.info-sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
  margin-bottom: 40px;
  padding: 20px; /* Added padding for info-sections */
}

.info-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 350px;
  text-align: left;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-card h2 {
  color: #007bff;
  font-size: 1.8em;
  margin-bottom: 15px;
}

.info-card p {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
}

.link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    min-height: 50vh; /* Shorter on mobile */
  }
  .hospital-name {
    font-size: 1.5em; /* Smaller font size on mobile */
    bottom: 80px; /* Adjusted position for mobile */
    left: 20px; /* Align with buttons on mobile */
  }
  .hero-buttons {
    flex-direction: column;
    left: 20px;
    bottom: 20px;
    gap: 10px;
  }
  .hero-button {
    width: 100%;
    text-align: center;
    font-size: 1em;
    padding: 10px 20px;
  }
  .slider-nav-btn {
    padding: 5px 10px;
    font-size: 1.5em;
  }
  .dot {
    width: 8px;
    height: 8px;
  }
  .image-description {
    bottom: 20px; /* Adjust for mobile, closer to edge */
    right: 20px;
    padding: 8px 12px;
    font-size: 0.9em;
    max-width: 200px;
  }
  .info-sections {
    flex-direction: column;
    align-items: center; /* Center cards on mobile for better layout */
  }
  .info-card {
    max-width: 90%;
  }
  .vision-section {
    margin: 20px 10px; /* Adjust margin for mobile */
    padding: 20px;
  }
  .vision-section .section-title {
    font-size: 1.5em;
  }
  .vision-section .vision-text {
    font-size: 1em;
  }
}
</style>
