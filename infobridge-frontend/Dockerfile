# --- Stage 1: Build โปรเจกต์ Vue.js ---
FROM node:18-alpine AS build

# กำหนด Working Directory ภายในคอนเทนเนอร์
# ทุกคำสั่งหลังจากนี้จะรันใน /app
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
# ขั้นตอนนี้ทำก่อนเพื่อใช้ประโยชน์จาก Docker Layer Caching
# หาก dependencies ไม่เปลี่ยน Docker จะไม่รัน npm install ใหม่
COPY package*.json ./

# ติดตั้ง dependencies ทั้งหมด
RUN npm install

# คัดลอกไฟล์โปรเจกต์ทั้งหมด (ยกเว้นที่ระบุใน .dockerignore)
COPY . .

# รันคำสั่ง build ของ Vue.js เพื่อสร้างไฟล์สำหรับ Production
# ผลลัพธ์จะอยู่ในโฟลเดอร์ 'dist' (หรือตามที่กำหนดใน vue.config.js)
RUN npm run build

# --- Stage 2: Serve ไฟล์ Static ด้วย Nginx ---
# ใช้ Nginx Alpine Image ซึ่งมีขนาดเล็กและเหมาะสำหรับ Production
FROM nginx:alpine

# คัดลอกไฟล์ที่ build ได้จาก Stage แรก ไปยัง Nginx Web Root
# /app/dist คือโฟลเดอร์ build จาก Stage 'build'
# /usr/share/nginx/html คือโฟลเดอร์ default ของ Nginx สำหรับ serve static files
COPY --from=build /app/dist /usr/share/nginx/html

# (ทางเลือก) คัดลอก Nginx Configuration ที่กำหนดเอง
# ถ้าคุณมีไฟล์ nginx.conf ที่ต้องการปรับแต่ง
# ให้สร้างไฟล์ nginx.conf ใน root directory ของโปรเจกต์คุณ
# และยกเลิกคอมเมนต์บรรทัดด้านล่างนี้
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิดพอร์ต 80 ในคอนเทนเนอร์ (พอร์ต default ของ HTTP)
EXPOSE 80

# คำสั่งที่จะรันเมื่อคอนเทนเนอร์เริ่มต้น
# "nginx -g 'daemon off;'" ทำให้ Nginx ทำงานใน foreground
# ซึ่งจำเป็นเพื่อให้คอนเทนเนอร์ทำงานต่อไปได้
CMD ["nginx", "-g", "daemon off;"]