<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section brand-info">
        <h3>MaHIP (Mae Ai Hospital Information Page)</h3>
        <p>สร้างสรรค์ด้วยความใส่ใจเพื่อประสบการณ์ที่ดีที่สุดของคุณ</p>
      </div>

      <div class="footer-section navigation">
        <h4>ลิงก์ด่วน</h4>
        <ul>
          <li><a href="#">หน้าหลัก</a></li>
          <li><a href="#">เกี่ยวกับเรา</a></li>
          <li><a href="#">บริการ</a></li>
          <li><a href="#">ติดต่อเรา</a></li>
        </ul>
      </div>

      <div class="footer-section contact-info">
        <h4>ติดต่อเรา</h4>
        <p>อีเมล: info@myproject.com</p>
        <p>โทรศัพท์: +66 123 456 789</p>
        <p>ที่อยู่: 191 หมู่ 8 ตำบล มะลิกา, อำเภอ แม่อาย, จังหวัด เชียงใหม่, ประเทศไทย</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} MaHIP. สงวนลิขสิทธิ์.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter', // ชื่อคอมโพเนนต์แบบ multi-word
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.app-footer {
  background-color: #2c3e50; /* Dark blue-gray */
  color: #ecf0f1; /* Light gray text */
  padding: 40px 20px 20px; /* Top, horizontal, bottom padding */
  text-align: center;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.15); /* Stronger shadow for a lifted effect */
  border-top-left-radius: 12px; /* Rounded top corners */
  border-top-right-radius: 12px; /* Rounded top corners */
  margin-top: 40px; /* Space above the footer */
}

.footer-content {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  justify-content: flex-start; /* Aligned to align items to the start (left) */
  align-items: flex-start; /* Align items to the top to make heights consistent */
  gap: 30px; /* Space between sections */
  max-width: 1200px;
  margin: 0 auto 30px; /* Center content and add space below */
  padding: 0 20px; /* Add horizontal padding to ensure content doesn't stick to edges */
}

.footer-section {
  /* flex: 1; Removed flex: 1 to allow more precise width control */
  min-width: 250px; /* Minimum width before wrapping */
  text-align: left;
  /* Distribute width more evenly, especially for the first section */
  flex-basis: 30%; /* Give brand-info more space, adjust as needed */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.footer-section.brand-info {
  flex-basis: 35%; /* Make the first section slightly wider */
}

.footer-section.navigation {
  flex-basis: 20%; /* Give navigation section a specific width */
}

.footer-section.contact-info {
  flex-basis: 35%; /* Give contact info section a specific width */
}


.footer-section h3,
.footer-section h4 {
  color: #3498db; /* Bright blue for headings */
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 1.2em;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #3498db; /* Blue on hover */
  text-decoration: underline;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Subtle top border */
  padding-top: 20px;
  margin-top: 20px;
  font-size: 0.85em;
  color: #bdc3c7; /* Slightly darker gray for copyright */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column; /* Stack sections vertically on small screens */
    align-items: center; /* Center items when stacked */
    text-align: center;
    padding: 0 20px; /* Maintain padding on small screens */
  }

  .footer-section {
    min-width: unset; /* Remove min-width constraint */
    width: 100%; /* Take full width */
    margin-bottom: 20px; /* Add space between stacked sections */
    text-align: center; /* Center text for stacked sections on mobile */
    flex-basis: auto; /* Reset flex-basis for mobile */
  }

  .footer-section.brand-info,
  .footer-section.navigation,
  .footer-section.contact-info {
    flex-basis: auto; /* Reset flex-basis for specific sections on mobile */
  }


  .footer-section:last-child {
    margin-bottom: 0;
  }
}
</style>
