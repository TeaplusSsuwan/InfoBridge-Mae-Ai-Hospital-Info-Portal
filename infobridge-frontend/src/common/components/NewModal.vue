<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button @click="closeModal" class="modal-close-button">&times;</button>
        </div>
        <div class="modal-body">
          <div v-if="imageUrl" class="modal-image-container">
            <img :src="imageUrl" :alt="title" class="modal-image">
          </div>

          <p v-if="newsDate" class="modal-news-date">ประกาศเมื่อ: {{ formatDate(newsDate) }}</p>

          <div class="modal-news-content">
            <p>{{ content }}</p>
          </div>

          <div v-if="attachments && attachments.length > 0" class="modal-attachments">
            <h4>เอกสารแนบ:</h4>
            <ul>
              <li v-for="(attachment, index) in attachments" :key="index">
                <a :href="attachment.url" target="_blank" rel="noopener noreferrer" class="attachment-link">
                  <i class="fa fa-paperclip attachment-icon"></i> {{ attachment.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="modal-footer-button">ปิด</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NewModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'รายละเอียด',
    },
    content: {
      type: String,
      default: '',
    },
    imageUrl: { // Prop ใหม่สำหรับ URL รูปภาพ
      type: String,
      default: '',
    },
    newsDate: { // Prop ใหม่สำหรับวันที่ประกาศ
      type: String, // หรือ Date object ถ้าคุณส่งมาเป็น Date
      default: '',
    },
    attachments: { // Prop ใหม่สำหรับเอกสารแนบ (Array ของ Object { name, url })
      type: Array,
      default: () => [],
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    }
  },
};
</script>

<style scoped>
/* Modal Transition Styles */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of everything */
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 95%; /* ขยายความกว้าง */
  max-width: 800px; /* เพิ่ม Max width สำหรับ Modal ที่ใหญ่ขึ้น */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 95vh; /* เพิ่ม Max height */
}

.modal-header {
  padding: 18px 25px; /* เพิ่ม padding */
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
}

.modal-title {
  margin: 0;
  font-size: 1.8em; /* ขยายขนาดหัวข้อ */
  color: #333;
}

.modal-close-button {
  background: none;
  border: none;
  font-size: 2.2em; /* ขยายขนาดปุ่มปิด */
  cursor: pointer;
  color: #999;
  line-height: 1;
  transition: color 0.2s ease;
}

.modal-close-button:hover {
  color: #333;
}

.modal-body {
  padding: 25px; /* เพิ่ม padding */
  overflow-y: auto;
  flex-grow: 1;
  line-height: 1.7; /* เพิ่มระยะห่างบรรทัด */
  color: #444;
}

/* สไตล์สำหรับรูปภาพประกอบ */
.modal-image-container {
  text-align: center;
  margin-bottom: 20px;
}

.modal-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* สไตล์สำหรับวันที่ประกาศ */
.modal-news-date {
  font-size: 0.95em;
  color: #777;
  text-align: right; /* จัดชิดขวา */
  margin-top: -10px; /* เลื่อนขึ้นใกล้หัวข้อ */
  margin-bottom: 20px;
  border-bottom: 1px solid #eee; /* เพิ่มเส้นแบ่ง */
  padding-bottom: 10px;
}

/* สไตล์สำหรับเนื้อหาข่าว */
.modal-news-content p {
  margin-bottom: 1.5em; /* เพิ่มระยะห่างระหว่างย่อหน้า */
  text-align: justify; /* จัดเนื้อหาให้เต็มบรรทัด */
}

/* สไตล์สำหรับเอกสารแนบ */
.modal-attachments {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #ddd; /* เพิ่มเส้นประแบ่งส่วน */
}

.modal-attachments h4 {
  color: #0056b3;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.modal-attachments ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-attachments li {
  margin-bottom: 10px;
}

.attachment-link {
  display: inline-flex; /* จัดไอคอนและข้อความให้อยู่บรรทัดเดียวกัน */
  align-items: center;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  transition: color 0.2s ease;
}

.attachment-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.attachment-icon {
  margin-right: 8px;
  font-size: 1.2em;
  color: #6c757d; /* สีไอคอน */
}

.modal-footer {
  padding: 15px 25px; /* เพิ่ม padding */
  border-top: 1px solid #eee;
  text-align: right;
  background-color: #f7f7f7;
}

.modal-footer-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 25px; /* เพิ่ม padding */
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.05em;
  transition: background-color 0.3s ease;
}

.modal-footer-button:hover {
  background-color: #0056b3;
}
</style>