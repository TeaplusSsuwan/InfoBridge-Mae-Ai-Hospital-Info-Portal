<template>
  <div class="news-announcement-list">
    <h2 class="list-title">{{ title }}</h2>
    <div v-if="isLoading" class="loading-message">
      <p>กำลังโหลดข่าวสาร...</p>
    </div>
    <div v-else-if="error" class="error-message">
      <p>เกิดข้อผิดพลาดในการโหลดข่าวสาร: {{ error }}</p>
    </div>
    <div v-else-if="announcements.length === 0" class="no-announcements">
      <p>{{ emptyMessage }}</p>
    </div>
    <ul v-else class="announcement-items">
      <li v-for="announcement in sortedAnnouncements" :key="announcement.id" class="announcement-item">
        <h3 class="announcement-title">{{ announcement.title }}</h3>
        <p class="announcement-date">{{ formatDate(announcement.date) }}</p>
        <p class="announcement-description">{{ truncateDescription(announcement.description) }}</p>
        <span @click="openModal(announcement)" class="announcement-link-button">อ่านเพิ่มเติม</span>
      </li>
    </ul>

    <NewModal
      :isOpen="isModalOpen"
      :title="selectedNews.title"
      :content="selectedNews.description"
      :imageUrl="selectedNews.imageUrl"   :newsDate="selectedNews.date"        :attachments="selectedNews.attachments" @close="closeModal"
    />
  </div>
</template>

<script>
import NewModal from '../../common/components/NewModal.vue'; // ตรวจสอบเส้นทางไฟล์ NewModal.vue ให้ถูกต้อง

export default {
  name: 'NewsListPage',
  components: {
    NewModal
  },
  props: {
    title: {
      type: String,
      default: 'ประกาศข่าวสารล่าสุด'
    },
    emptyMessage: {
      type: String,
      default: 'ขณะนี้ยังไม่มีประกาศข่าวสารใหม่'
    }
  },
  data() {
    return {
      announcements: [],
      isLoading: true,
      error: null,
      isModalOpen: false,
      selectedNews: { // เพิ่ม props ใหม่ใน selectedNews
        title: '',
        description: '',
        imageUrl: '',
        date: '',
        attachments: []
      }
    };
  },
  computed: {
    sortedAnnouncements() {
      return [...this.announcements].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
      return new Date(dateString).toLocaleDateString('th-TH', options);
    },
    truncateDescription(description) {
      const maxLength = 150;
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
      }
      return description;
    },
    loadSampleData() {
      this.isLoading = true;
      this.error = null;

      setTimeout(() => {
        try {
          this.announcements = [
            {
              id: 1,
              title: 'พิธีเปิดสำนักงานใหญ่แห่งใหม่',
              date: '2025-07-01T10:00:00',
              description: 'บริษัทขอเรียนเชิญลูกค้าและพันธมิตรทุกท่านเข้าร่วมพิธีเปิดสำนักงานใหญ่แห่งใหม่ ณ ใจกลางเมืองเชียงใหม่ ซึ่งเป็นก้าวสำคัญในการขยายธุรกิจและให้บริการที่ดียิ่งขึ้นแก่ทุกท่าน. สำนักงานแห่งใหม่นี้ออกแบบมาเพื่อรองรับการเติบโตและสร้างสภาพแวดล้อมการทำงานที่ทันสมัยและยืดหยุ่น การย้ายสำนักงานครั้งนี้เป็นส่วนหนึ่งของกลยุทธ์การขยายตัวของเราเพื่อเข้าถึงลูกค้าได้กว้างขวางขึ้นและเสริมสร้างความสัมพันธ์กับชุมชนท้องถิ่น. เราหวังเป็นอย่างยิ่งว่าทุกท่านจะมาร่วมเป็นส่วนหนึ่งในวันสำคัญของเรา.',
              imageUrl: 'https://via.placeholder.com/600x300/007bff/ffffff?text=New+Office+Opening', // ตัวอย่างรูปภาพ
              attachments: [ // ตัวอย่างเอกสารแนบ
                { name: 'กำหนดการพิธีเปิด.pdf', url: 'https://www.africau.edu/images/default/sample.pdf' },
                { name: 'แผนที่สำนักงานใหม่.png', url: 'https://via.placeholder.com/300x200?text=Map' }
              ]
            },
            {
              id: 2,
              title: 'ประกาศผลการคัดเลือกพนักงานดีเด่นประจำปี 2568',
              date: '2025-06-28T14:30:00',
              description: 'ขอแสดงความยินดีกับพนักงานผู้ได้รับรางวัลพนักงานดีเด่นประจำปี 2568 ที่ได้แสดงผลงานและทุ่มเทอย่างเต็มที่ตลอดปีที่ผ่านมา. การประกาศผลครั้งนี้จัดขึ้นที่ห้องประชุมใหญ่ โดยมีผู้บริหารระดับสูงร่วมมอบรางวัลและกล่าวแสดงความยินดีกับพนักงานทุกท่าน. เราภูมิใจในความมุ่งมั่นและความสามารถของพนักงานของเรา และจะสนับสนุนให้ทุกคนพัฒนาศักยภาพอย่างต่อเนื่อง.',
              // ไม่มี imageUrl และ attachments สำหรับข่าวนี้ (ตัวอย่าง)
            },
            {
              id: 3,
              title: 'โครงการจิตอาสา "คืนความเขียวให้ป่า" ประจำปี',
              date: '2025-06-25T09:00:00',
              description: 'เชิญชวนพนักงานและครอบครัวเข้าร่วมกิจกรรมปลูกป่า ณ ดอยสุเทพ-ปุย ในวันเสาร์ที่ 19 กรกฎาคมนี้ เพื่อฟื้นฟูธรรมชาติและสร้างอากาศบริสุทธิ์ให้กับชุมชน. กิจกรรมนี้เป็นส่วนหนึ่งของความรับผิดชอบต่อสังคมและสิ่งแวดล้อมที่เรายึดมั่น โดยคาดว่าจะมีผู้เข้าร่วมมากกว่า 100 คน. ทางบริษัทจะจัดเตรียมอุปกรณ์และอาหารกลางวันให้แก่ผู้เข้าร่วมทุกท่าน.',
              imageUrl: 'https://via.placeholder.com/600x300/28a745/ffffff?text=Green+Project',
              attachments: [
                { name: 'รายละเอียดโครงการ.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
              ]
            },
            {
              id: 4,
              title: 'แจ้งเตือนการบำรุงรักษาระบบฐานข้อมูลครั้งใหญ่',
              date: '2025-06-20T23:00:00',
              description: 'เพื่อเพิ่มประสิทธิภาพและเสถียรภาพของระบบ จะมีการบำรุงรักษาในคืนวันที่ 5 กรกฎาคม 2568 เวลา 23:00 น. ถึง 03:00 น. ของวันถัดไป ซึ่งอาจทำให้ระบบไม่สามารถใช้งานได้ชั่วคราวในช่วงเวลาดังกล่าว. ทางทีมงานจะพยายามดำเนินการให้แล้วเสร็จโดยเร็วที่สุด และขออภัยในความไม่สะดวกมา ณ ที่นี้. หากมีข้อสงสัยหรือปัญหาเร่งด่วน โปรดติดต่อฝ่ายเทคนิค.',
              attachments: [
                { name: 'แผนการบำรุงรักษา.docx', url: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx' }
              ]
            }
          ];
          this.isLoading = false;
        } catch (err) {
          this.error = 'ไม่สามารถโหลดข้อมูลตัวอย่างได้';
          this.isLoading = false;
          console.error("Error loading sample data:", err);
        }
      }, 1000);
    },
    openModal(announcement) {
      this.selectedNews = { // กำหนดค่าทั้งหมดจาก announcement object
        title: announcement.title,
        description: announcement.description,
        imageUrl: announcement.imageUrl || '', // ใช้ค่าว่างถ้าไม่มี
        date: announcement.date,
        attachments: announcement.attachments || [] // ใช้ Array ว่างถ้าไม่มี
      };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      // ล้างข้อมูลที่เลือกไว้หลังจากปิด Modal
      this.selectedNews = {
        title: '',
        description: '',
        imageUrl: '',
        date: '',
        attachments: []
      };
    }
  },
  created() {
    this.loadSampleData();
  }
};
</script>

<style scoped>
/* สไตล์ NewsListPage ยังคงเหมือนเดิม */
.news-announcement-list {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-title {
  color: #333;
  text-align: center;
  margin-bottom: 25px;
  font-size: 2em;
}

.no-announcements {
  text-align: center;
  color: #666;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}

.announcement-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.announcement-item {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out;
}

.announcement-item:hover {
  transform: translateY(-3px);
}

.announcement-title {
  color: #0056b3;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.announcement-date {
  color: #777;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.announcement-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.announcement-link-button {
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: text-decoration 0.2s ease;
}

.announcement-link-button:hover {
  text-decoration: underline;
}

.loading-message, .error-message {
  text-align: center;
  padding: 20px;
  font-size: 1.1em;
  margin-top: 30px;
}
.loading-message p {
  color: #007bff;
}
.error-message p {
  color: #dc3545;
  font-weight: bold;
}
</style>