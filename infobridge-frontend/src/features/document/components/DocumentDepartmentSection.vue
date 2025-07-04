<template>
  <div class="department-section">
    <h3 class="department-title">{{ department.name }}</h3>
    <p v-if="department.description" class="department-description">{{ department.description }}</p>

    <div v-if="department.documents && department.documents.length > 0" class="document-list">
      <div v-for="doc in department.documents" :key="doc.id" class="document-item">
        <div class="document-info">
          <p class="document-name">{{ doc.name }}</p>
          <p class="document-date">อัปโหลดเมื่อ: {{ formatDate(doc.date) }}</p>
          <p v-if="doc.description" class="document-item-description">{{ doc.description }}</p>
        </div>
        <div class="document-files">
          <a
            v-for="(file, fileIndex) in doc.files"
            :key="fileIndex"
            :href="file.url"
            target="_blank"
            rel="noopener noreferrer"
            class="download-button"
            :class="getFileTypeClass(file.type)"
            @click="trackDownload(file.name)"
          >
            <i :class="getFileIcon(file.type)"></i>
            {{ file.type.toUpperCase() }}
          </a>
        </div>
      </div>
    </div>
    <p v-else class="no-documents">ยังไม่มีเอกสารสำหรับฝ่ายงานนี้</p>
  </div>
</template>

<script>
export default {
  name: 'DocumentDepartmentSection',
  props: {
    department: {
      type: Object,
      required: true,
      validator: (value) =>
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value &&
        'documents' in value
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'ไม่มีข้อมูลวันที่';
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    },
    getFileIcon(fileType) {
      // ต้องมี Font Awesome ในโปรเจกต์
      switch (fileType) {
        case 'pdf':
          return 'fas fa-file-pdf';
        case 'doc':
        case 'docx':
          return 'fas fa-file-word';
        case 'xls':
        case 'xlsx':
          return 'fas fa-file-excel';
        case 'ppt':
        case 'pptx':
          return 'fas fa-file-powerpoint';
        default:
          return 'fas fa-file'; // ไอคอนไฟล์ทั่วไป
      }
    },
    getFileTypeClass(fileType) {
      // สำหรับใส่ class เพื่อปรับแต่งสีปุ่ม
      switch (fileType) {
        case 'pdf':
          return 'pdf-button';
        case 'doc':
        case 'docx':
          return 'doc-button';
        case 'xls':
        case 'xlsx':
          return 'xls-button';
        case 'ppt':
        case 'pptx':
          return 'ppt-button';
        default:
          return '';
      }
    },
    trackDownload(fileName) {
      console.log(`ดาวน์โหลด: ${fileName}`);
      // คุณสามารถเพิ่ม logic สำหรับการติดตามการดาวน์โหลดที่นี่
      // เช่น ส่งข้อมูลไปที่ Google Analytics หรือบันทึกลงฐานข้อมูล
    },
  },
};
</script>

<style scoped>
.department-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
}

.department-title {
  color: #0056b3;
  font-size: 2em;
  margin-top: 0;
  margin-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.department-description {
  color: #666;
  font-size: 1.1em;
  margin-bottom: 25px;
  line-height: 1.6;
}

.document-list {
  display: grid;
  gap: 20px;
}

.document-item {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 15px 20px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.document-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.document-info {
  flex-grow: 1;
}

.document-name {
  font-size: 1.3em;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.document-date {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 10px;
}

.document-item-description {
  font-size: 1em;
  color: #555;
  line-height: 1.5;
  margin-bottom: 10px;
}

.document-files {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.download-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 0.95em;
  transition: background-color 0.2s ease, transform 0.1s ease;
  min-width: 90px; /* ทำให้ปุ่มมีขนาดใกล้เคียงกัน */
  justify-content: center;
}

.download-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.download-button i {
  font-size: 1.1em;
}

/* สีของปุ่มตามประเภทไฟล์ */
.pdf-button {
  background-color: #dc3545; /* แดงสำหรับ PDF */
}
.pdf-button:hover {
  background-color: #c82333;
}

.doc-button {
  background-color: #007bff; /* น้ำเงินสำหรับ Word */
}
.doc-button:hover {
  background-color: #0056b3;
}

.xls-button {
  background-color: #28a745; /* เขียวสำหรับ Excel */
}
.xls-button:hover {
  background-color: #218838;
}

.ppt-button {
  background-color: #ffc107; /* ส้มสำหรับ PowerPoint */
  color: #343a40; /* เปลี่ยนสีตัวอักษรเป็นดำเพื่อให้ตัดกับสีส้ม */
}
.ppt-button:hover {
  background-color: #e0a800;
}

.no-documents {
  text-align: center;
  color: #999;
  padding: 30px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  margin-top: 20px;
}
</style>