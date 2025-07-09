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
      <div class="department-filter">
        <label for="department-select">เลือกฝ่ายงาน:</label>
        <select id="department-select" v-model="selectedDepartmentId">
          <option value="">-- แสดงทั้งหมด --</option>
          <option
            v-for="department in sortedDepartments"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
      </div>

      <DocumentDepartmentSection
        v-for="department in filteredDepartments"
        :key="department.id"
        :department="department"
      />
    </div>
  </div>
</template>

<script>
import DocumentDepartmentSection from "./components/DocumentDepartmentSection.vue"; // ตรวจสอบเส้นทางไฟล์ให้ถูกต้อง

export default {
  name: "DocumentDownloadsPage",
  components: {
    DocumentDepartmentSection,
  },
  data() {
    return {
      pageTitle: "ศูนย์รวมเอกสารดาวน์โหลด",
      pageDescription: "ค้นหาและดาวน์โหลดเอกสารสำคัญจากฝ่ายงานต่างๆ ขององค์กร",
      departments: [], // ข้อมูลฝ่ายงานและเอกสารจะถูกโหลดเข้ามาที่นี่
      isLoading: true,
      error: null,
      selectedDepartmentId: "", // เพิ่ม property ใหม่สำหรับเก็บ ID แผนกที่เลือก
    };
  },
  computed: {
    sortedDepartments() {
      // คุณอาจต้องการจัดเรียงฝ่ายงานตามลำดับตัวอักษร หรือลำดับที่กำหนดไว้
      return [...this.departments].sort((a, b) =>
        a.name.localeCompare(b.name, "th-TH")
      );
    },
    filteredDepartments() {
      if (!this.selectedDepartmentId) {
        // ถ้าไม่ได้เลือกแผนกใดๆ (selectedDepartmentId เป็นค่าว่าง) ให้แสดงทั้งหมด
        return this.sortedDepartments;
      } else {
        // กรองเฉพาะแผนกที่ตรงกับ selectedDepartmentId
        return this.sortedDepartments.filter(
          (department) => department.id === this.selectedDepartmentId
        );
      }
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
              id: "Admin",
              name: "งานธุรการ",
              description: "-",
              documents: [
                {
                  id: 101,
                  name: "ขออนุมัติเดินทางไปราชการ ประชุมและฝึกอบรม",
                  date: "2025-07-03",
                  description: "-",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1KgJY_drFAODl7y2r-RZhSfHqMrcIKpX2/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1r-24BTGZlM-hfab5UVuyRRsOlGDIxSny/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 102,
                  name: "ขออนุญาตออกนอกเขตจังหวัด",
                  date: "2025-07-06",
                  description: "-",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1BdS6eMPrfAXoj4-A_oW_5OM_w7LblCrq/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1AcPO64OzKmN_LRhYSCfbRM_UcSumD6aA/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 103,
                  name: "แบบฟอร์มการขอใช้ห้องประชุม68",
                  date: "2025-07-03",
                  description: "-",
                  files: [
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1jp9rugtNIch9dgmkafR3-h_BpD_FHk4j/view?usp=sharing",
                    },
                  ],
                },
                {
                  id: 104,
                  name: "ใบอนุญาตใช้รถยนต์ราชการ68",
                  date: "2025-07-03",
                  description: "-",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1BdS6eMPrfAXoj4-A_oW_5OM_w7LblCrq/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1no7jgR-64h59M-cipNdXF1Ky6L8mrDNK/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 105,
                  name: "ใบลากิจ ลาป่วย ลาคลอดบุตร",
                  date: "2025-07-06",
                  description: "-",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1kLovxl2xeigLCW57K7TTXd52DtFjuxi1/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1SXM2jooEPXs0qFFO421zu4dzCGhEQROF/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 106,
                  name: "ใบลาพักผ่อน",
                  date: "2025-07-06",
                  description: "-",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1KKaFmIYFcqcHEiTGY5_czvuavjHTlSet/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1I0pZAT65_1JVHff1ZIevOC5VWksviUNP/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 107,
                  name: "ใบขอยกเลิกวันลา",
                  date: "2025-07-06",
                  description: "-",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1ThDSYg97gcUqWim0MEIfmk_cRCEQ_6Eg/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1i1rOnYCJXFyrV3Qo1k95OUoHsk6Lj_z6/view?usp=drive_link",
                    },
                  ],
                },
              ],
            },
            {
              id: "HR",
              name: "งานการเจ้าหน้าที่",
              description: "-",
              documents: [
                {
                  id: 201,
                  name: "แบบฟอร์ม อวช. ชำนาญการ และ ชำนาญการพิเศษ",
                  date: "2025-07-03",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1XpF46rJokVwwf8fAVpYenRKF2BD1dTfI/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1D2DGiCqcrg0QAwoPiR1__2-XopSCsjK8/view?usp=sharing",
                    },
                  ],
                },
              ],
            },
            {
              id: "financial",
              name: "งานการเงิน",
              description: "-",
              documents: [
                {
                  id: 301,
                  name: "แบบคำขอสลิป",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1wlahyz1TKTS-Qjru6acXjQZgZGLPP3Qg/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 302,
                  name: "แบบแจ้งข้อมูลการรับเงินโอนผ่านระบบ KTB Corporate Online",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1PHb4M_FUlyBtYQatXrNBTvuJ3L8UvWYH/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 303,
                  name: "ใบเบิกเงินสวัสดิการเกี่ยวกับการศึกษาบุตร",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1lIX2F2BfdLTMYkoYzO7aob6qQpLSr-1P/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 304,
                  name: "ใบเบิกเงินสวัสดิการเกี่ยวกับการรักษาพยาบาล",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1clp9WbEm-D8hk3iPEX8uMZdEdLUjkSe6/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 305,
                  name: "สัญญายืมเงิน 8500",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/15cBafUOLYKyVxAMjcAA4937HUwHpmU6q/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 306,
                  name: "แบบขออนุญาตเบิกใช้ค่าใช้จ่ายในการฝึกอบรม(ค่าลงทะเบียน) กรณียืมเงิน",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/15Wj-Uex4CxAChohYU4SZllkztzupEn1f/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 307,
                  name: "แบบขออนุญาตเบิกใช้ค่าใช้จ่ายในการฝึกอบรม(ค่าลงทะเบียน) กรณีไม่ยืมเงิน",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/10IkcKZifKmiQLr_YAWKM4TCxQ7CxInQr/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 308,
                  name: "ใบเบิกค่าใช้จ่ายในการเดินทางไปราชการ",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1Av_Eo30v0ncOGOiqMr-os3mrBB5jL33D/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 309,
                  name: "แบบพัฒนาตนเอง",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1jDdN0gqTnyTDa23D_vpUBowm9y_6qwVK/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 310,
                  name: "ใบสำคัญรับเงิน",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "pdf",
                      url: "https://drive.google.com/file/d/1IxQHYfnMvnvE7lg3umWqkjhLfvjNCBfw/view?usp=drive_link",
                    },
                  ],
                },
                {
                  id: 311,
                  name: "ใบสำคัญวิทยากร",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "xlsx",
                      url: "https://docs.google.com/spreadsheets/d/1w8riNKhVdsmV3VEt07Xl9QpVr3VvGOsq/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 312,
                  name: "แบบฟอร์มบันทึกข้อความ ชันสูตรพลิกศพ",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1eYmDeyEHIsyQmkybz3fmQYNiPrdmgk4A/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
              ],
            },
            {
              id: "Procurement",
              name: "งานพัสดุ",
              description: "-",
              documents: [
                {
                  id: 401,
                  name: "ใบส่งซ่อม",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "xlsx",
                      url: "https://docs.google.com/spreadsheets/d/1hZRX4ai6cNti0soi4CANAfVi9vA6Z069/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 402,
                  name: "ใบยืมพัสดุ รพ.แม่อาย",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1cirA_814CGXOhv3dcxj8TfXh3_zCXCVQ/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 403,
                  name: "ใบคืนครุภัณฑ์",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1baRg4WMBk25CeKGi9ma34CsbMe1TYdmg/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 404,
                  name: "ใบขออนุมัติ",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/13cu5gpXFr-pxz6VvgjC5gLJrb7oHuhFk/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 405,
                  name: "แบบฟอร์มการขอเคลื่อนย้ายครุภัณฑ์",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1XkWmy1IO1_nW-SEu703Kgi-BQrajQEof/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 406,
                  name: "แบบฟอร์มขอส่งถ่ายเอกสาร",
                  date: "2025-07-06",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://docs.google.com/document/d/1Ix07EXo9g0yrevl7NccbCPS0tHcPVBvp/edit?usp=drive_link&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
              ],
            },
            {
              id: "IT",
              name: "สุขภาพดิจิทัล",
              description:
                "เอกสารและคู่มือสำหรับการใช้งานระบบคอมพิวเตอร์, ซอฟต์แวร์, และเครือข่ายขององค์กร.",
              documents: [
                {
                  id: 501,
                  name: "คู่มือการเชื่อมต่อ Wi-Fi สำหรับพนักงาน",
                  date: "2025-06-01T11:00:00",
                  description: "no content",
                  files: [
                    {
                      type: "pdf",
                      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    },
                    {
                      type: "xlsx",
                      url: "https://docs.google.com/document/d/13IJUGnn7fhkge8T5rMRn4yDebHM7JMe6/edit?usp=sharing&ouid=117111384629584909160&rtpof=true&sd=true",
                    },
                  ],
                },
                {
                  id: 11,
                  name: "นโยบายการใช้งานซอฟต์แวร์ลิขสิทธิ์",
                  date: "2025-05-25T16:00:00",
                  description: "no content",
                  files: [
                    {
                      type: "docx",
                      url: "https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx",
                    },
                  ],
                },
              ],
            },
          ];
          this.isLoading = false;
        } catch (err) {
          this.error = "ไม่สามารถโหลดข้อมูลเอกสารได้";
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
  font-family: "Arial", sans-serif;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
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
  display: block;
}

.department-sections-container > * {
  margin-bottom: 30px;
}

.department-filter {
  margin-bottom: 30px;
  text-align: right; /* จัดให้ชิดขวา */
  display: flex; /* ใช้ flexbox เพื่อจัดวาง label และ select */
  justify-content: flex-end; /* จัดองค์ประกอบไปทางขวา */
  align-items: center; /* จัดให้อยู่กึ่งกลางในแนวตั้ง */
  padding-right: 20px; /* เพิ่ม padding ด้านขวาเล็กน้อย */
}

.department-filter label {
  font-size: 1.1em;
  color: #333;
  margin-right: 10px;
  white-space: nowrap; /* ป้องกันไม่ให้ข้อความขึ้นบรรทัดใหม่ */
}

.department-filter select {
  padding: 8px 12px; /* ลดขนาด padding เล็กน้อย */
  font-size: 0.95em; /* ลดขนาด font เล็กน้อย */
  border: 1px solid #dcdcdc; /* ปรับสีขอบให้อ่อนลงเล็กน้อย */
  border-radius: 6px; /* ปรับความโค้งของขอบ */
  background-color: #ffffff; /* พื้นหลังสีขาว */
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  flex-grow: 0; /* ไม่ให้ select box ขยาย */
  width: auto; /* ให้ select box มีความกว้างตามเนื้อหา */
  max-width: 250px; /* กำหนดความกว้างสูงสุด */
}

.department-filter select:hover {
  border-color: #a0a0a0; /* สีขอบเข้มขึ้นเมื่อ hover */
}

.department-filter select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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
  .department-filter {
    flex-direction: column; /* วาง label และ select ซ้อนกันใน mobile */
    align-items: flex-end; /* จัดให้ชิดขวาใน mobile ด้วย */
    padding-right: 0;
  }
  .department-filter label {
    margin-bottom: 5px; /* เพิ่มระยะห่างระหว่าง label กับ select */
    margin-right: 0;
  }
  .department-filter select {
    width: 100%; /* ให้ select box เต็มความกว้างใน mobile */
    max-width: none; /* ยกเลิก max-width ใน mobile */
  }
}
</style>