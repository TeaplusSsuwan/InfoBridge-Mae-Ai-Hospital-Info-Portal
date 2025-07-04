<template>
  <div class="under-development-container">
    <div class="content-box">
      <h1 class="title">🚧 กำลังพัฒนา 🚧</h1>
      <p class="message">
        ขออภัยในความไม่สะดวก หน้านี้กำลังอยู่ในระหว่างการพัฒนาและจะพร้อมใช้งานในเร็วๆ นี้
      </p>
      <p class="sub-message">
        โปรดกลับมาตรวจสอบอีกครั้งในภายหลัง!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnderDevelopmentPage', // ชื่อคอมโพเนนต์แบบ multi-word
};
</script>

<style scoped>
.under-development-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px); /* Adjust height to account for header/footer */
  background-color: #f8f9fa; /* Light background */
  font-family: 'Inter', sans-serif;
  color: #34495e; /* Darker text for readability */
  padding: 20px;
  box-sizing: border-box;
}

.content-box {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.title {
  font-size: 2.8em;
  color: #e67e22; /* Orange color for emphasis */
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.message {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 15px;
}

.sub-message {
  font-size: 1em;
  color: #7f8c8d; /* Lighter gray for secondary message */
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .content-box {
    padding: 30px;
  }

  .title {
    font-size: 2em;
  }

  .message {
    font-size: 1em;
  }
}
</style>
