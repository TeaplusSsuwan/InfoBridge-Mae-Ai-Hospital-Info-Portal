<template>
  <div class="document-downloads-page">
    <h1 class="page-title">{{ pageTitle }}</h1>
    <p class="page-description">{{ pageDescription }}</p>

    <div v-if="isLoading" class="loading-message">
      <p>กำลังโหลดรายการเอกสาร...</p>
    </div>
    <div v-else-if="error" class="error-message">
      <p>เกิดข้อผิดพลาดในการโหลดเอกสาร: {{ error }}</p>
    </div>
    <div v-else-if="departments.length === 0" class="no-departments-found">
      <p>ยังไม่พบข้อมูลฝ่ายงานหรือเอกสารใดๆ</p>
    </div>
    <div v-else class="department-sections-container">
      <DocumentDepartmentSection
        v-for="department in sortedDepartments"
        :key="department.id"
        :department="department"
      />
    </div>
  </div>
 </template>

 <script>
 import DocumentDepartmentSection from './components/DocumentDepartmentSection.vue'; // ตรวจสอบเส้นทางไฟล์ให้ถูกต้อง

 export default {
  name: 'DocumentDownloadsPage',
  components: {
    DocumentDepartmentSection,
  },
  data() {
    return {
      pageTitle: 'ศูนย์รวมเอกสารดาวน์โหลด',
      pageDescription: 'ค้นหาและดาวน์โหลดเอกสารสำคัญจากฝ่ายงานต่างๆ ขององค์กร',
      departments: [], // ข้อมูลฝ่ายงานและเอกสารจะถูกโหลดเข้ามาที่นี่
      isLoading: true,
      error: null,
    };
  },
  computed: {
    sortedDepartments() {
      // คุณอาจต้องการจัดเรียงฝ่ายงานตามลำดับตัวอักษร หรือลำดับที่กำหนดไว้
      return [...this.departments].sort((a, b) => a.name.localeCompare(b.name, 'th-TH'));
    },
  },
  methods: {
    loadDocumentData() {
      this.isLoading = true;
      this.error = null;

      // จำลองการดึงข้อมูลจาก API หรือ JSON file ด้วย setTimeout
      setTimeout(() => {
        try {
          this.departments = [
            {
              id: 'Admin',
              name: 'งานธุรการ',
              description: '-',
              documents: [
                {
                  id: 1,
                  name: 'ขออนุมัติเดินทางไปราชการ ประชุมและฝึกอบรม68',
                  date: '2025-07-03',
                  description: '-',
                  files: [
                    { type: 'docx', url: 'https://docs.google.com/document/d/1KgJY_drFAODl7y2r-RZhSfHqMrcIKpX2/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true' }
                  ]
                },
                {
                  id: 2,
                  name: 'แบบฟอร์มการขอใช้ห้องประชุม68',
                  date: '2025-07-03',
                  description: '-',
                  files: [
                    { type: 'pdf', url: 'https://drive.google.com/file/d/1jp9rugtNIch9dgmkafR3-h_BpD_FHk4j/view?usp=sharing' }
                  ]
                },
                {
                  id: 3,
                  name: 'ใบอนุญาตใช้รถยนต์ราชการ68',
                  date: '2025-07-03',
                  description: 'เอกสารที่ใช้สำหรับขออนุมัติการใช้ยานพาหนะของทางราชการ',
                  files: [
                    { type: 'pdf', url: 'https://docs.google.com/document/d/13IJUGnn7fhkge8T5rMRn4yDebHM7JMe6/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true' }
                  ]
                }
              ],
            },
            {
              id: 'IT',
              name: 'สุขภาพดิจิทัล',
              description: 'เอกสารและคู่มือสำหรับการใช้งานระบบคอมพิวเตอร์, ซอฟต์แวร์, และเครือข่ายขององค์กร.',
              documents: [
                {
                  id: 10,
                  name: 'คู่มือการเชื่อมต่อ Wi-Fi สำหรับพนักงาน',
                  date: '2025-06-01T11:00:00',
                  description: 'no content',
                  files: [
                    { type: 'pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
                    { type: 'xlsx', url: 'https://docs.google.com/document/d/13IJUGnn7fhkge8T5rMRn4yDebHM7JMe6/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true' }
                  ]
                },
                {
                  id: 11,
                  name: 'นโยบายการใช้งานซอฟต์แวร์ลิขสิทธิ์',
                  date: '2025-05-25T16:00:00',
                  description: 'no content',
                  files: [
                    { type: 'docx', url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx' }
                  ]
                }
              ],
            },
            {
              id: 'HR',
              name: 'งานการเจ้าหน้าที่',
              description: 'เอกสารและแบบฟอร์มที่เกี่ยวข้องกับการบริหารจัดการทรัพยากรบุคคล เช่น ระเบียบพนักงาน, แบบฟอร์มลา, คู่มือสวัสดิการ.',
              documents: [
                {
                  id: 20,
                  name: 'แบบฟอร์ม อวช. ชำนาญการ และ ชำนาญการพิเศษ',
                  date: '2025-07-03',
                  description: 'no content',
                  files: [
                    { type: 'docx', url: 'https://docs.google.com/document/d/1XpF46rJokVwwf8fAVpYenRKF2BD1dTfI/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true' },
                    { type: 'pdf', url: 'https://drive.google.com/file/d/1D2DGiCqcrg0QAwoPiR1__2-XopSCsjK8/view?usp=sharing' }
                  ]
                }
              ]
            },
            {
              id: '-',
              name: 'ฝ่ายบริหาร',
              description: 'เอกสารทั่วไปสำหรับผู้บริหาร และนโยบายองค์กร.',
              documents: [] // ตัวอย่างฝ่ายงานที่ยังไม่มีเอกสาร
            }
          ];
          this.isLoading = false;
        } catch (err) {
          this.error = 'ไม่สามารถโหลดข้อมูลเอกสารได้';
          this.isLoading = false;
          console.error("Error loading document data:", err);
        }
      }, 1500); // จำลองการดีเลย์ 1.5 วินาที
    },
  },
  created() {
    this.loadDocumentData();
  },
 };
 </script>

 <style scoped>
 .document-downloads-page {
  font-family: 'Arial', sans-serif;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f2f5;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
 }

 .page-title {
  color: #1a237e; /* สีน้ำเงินเข้ม */
  font-size: 3em;
  text-align: center;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
 }

 .page-description {
  color: #555;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
 }

 .loading-message,
 .error-message,
 .no-departments-found {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #666;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin-top: 30px;
 }

 .loading-message p {
  color: #007bff;
 }

 .error-message p {
  color: #dc3545;
  font-weight: bold;
 }

 .department-sections-container {
  /* เปลี่ยนจาก display: grid เป็น display: block หรือ display: flex และ flex-direction: column */
  display: block; /* ทำให้แต่ละ DocumentDepartmentSection ขึ้นบรรทัดใหม่ */
  /* gap: 30px; */ /* ไม่จำเป็นสำหรับ display: block */
 }

 /* เพิ่ม margin-bottom ให้แต่ละแผนก เพื่อให้มีระยะห่าง */
 .department-sections-container > * {
  margin-bottom: 30px; /* หรือค่าตามที่คุณต้องการ */
 }

 /* คุณสามารถเพิ่ม media queries สำหรับการปรับแต่ง responsive เพิ่มเติม */
 @media (max-width: 768px) {
  .page-title {
    font-size: 2.5em;
  }
  .page-description {
    font-size: 1em;
  }
  .department-section {
    padding: 20px;
  }
 }
 </style>