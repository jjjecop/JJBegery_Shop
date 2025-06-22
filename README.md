# 🍰 Bake.Bake - Responsive Bakery Website

เว็บไซต์ร้านเบเกอรี่ที่ออกแบบให้รองรับทุกอุปกรณ์ (Responsive Design)

## 🎯 คุณสมบัติหลัก

### 📱 Responsive Design
- **Mobile First Approach** - ออกแบบให้รองรับมือถือเป็นหลัก
- **Cross-Device Compatibility** - ทำงานได้ดีบนทุกอุปกรณ์
- **Touch-Friendly Interface** - ปุ่มและเมนูที่ใช้งานง่ายบนหน้าจอสัมผัส
- **Adaptive Layout** - Layout ที่ปรับตัวตามขนาดหน้าจอ

### 🍰 หน้าต่างๆ
1. **หน้าหลัก (index.html)** - แสดงภาพเค้กหลักและ gallery
2. **หน้าเมนู (menu.html)** - แสดงรายการสินค้าทั้งหมด
3. **หน้าเกี่ยวกับเรา (about.html)** - ข้อมูลร้านค้า
4. **หน้าติดต่อ (contact.html)** - ฟอร์มติดต่อและข้อมูล

### 🛒 ระบบตะกร้าสินค้า
- **Floating Cart Button** - ปุ่มตะกร้าลอยที่เข้าถึงง่าย
- **Slide-out Cart Panel** - แผงตะกร้าที่เลื่อนออกจากขวา
- **Responsive Cart Design** - ตะกร้าที่ปรับตัวตามขนาดหน้าจอ

### 🍔 Hamburger Menu
- **Mobile Navigation** - เมนูแบบ hamburger สำหรับมือถือ
- **Smooth Animations** - การเคลื่อนไหวที่นุ่มนวล
- **Accessibility Features** - รองรับการใช้งานด้วยคีย์บอร์ด

## 📐 Breakpoints ที่รองรับ

### 📱 Mobile (≤ 768px)
- Hamburger menu แทนเมนูปกติ
- Layout แนวตั้ง (single column)
- ปุ่มและข้อความขนาดใหญ่ขึ้น
- Touch-friendly interactions

### 📱 Large Mobile (481px - 768px)
- ปรับขนาดองค์ประกอบให้เหมาะสม
- ระยะห่างที่เหมาะสมสำหรับการสัมผัส

### 📱 Small Mobile (≤ 480px)
- ขนาดองค์ประกอบที่เล็กที่สุด
- ระยะห่างที่กระชับ
- ฟอนต์ขนาดเล็ก

### 📱 Extra Small Mobile (≤ 360px)
- Layout ที่กระชับที่สุด
- องค์ประกอบที่ปรับให้เหมาะสม

### 📱 Landscape Mode
- ปรับ layout สำหรับหน้าจอแนวนอน
- องค์ประกอบที่เหมาะสมกับความสูงที่จำกัด

### 💻 Tablet (769px - 1024px)
- Layout แบบ 2 คอลัมน์
- ขนาดองค์ประกอบที่เหมาะสม
- Touch-friendly แต่ยังคง desktop features

### 🖥️ Desktop (> 1024px)
- Layout แบบเต็มรูปแบบ
- Hover effects
- Desktop-specific interactions

### 🖥️ Large Desktop (> 1400px)
- Layout ที่กว้างขึ้น
- องค์ประกอบขนาดใหญ่
- เพิ่มพื้นที่ว่าง

## 🎨 การออกแบบ

### 🎯 Color Scheme
- **Primary**: #b99760 (สีทอง/น้ำตาลอ่อน)
- **Secondary**: #856d48 (สีน้ำตาลเข้ม)
- **Background**: #eae7b9 (สีครีมอ่อน)
- **Text**: #333 (สีเทาเข้ม)

### 📱 Typography
- **Font Family**: 'Prompt', sans-serif
- **Responsive Font Sizes**: ใช้ clamp() และ rem
- **Line Heights**: ปรับตามขนาดหน้าจอ

### 🎭 Animations
- **Smooth Transitions**: 0.3s ease
- **Hover Effects**: ปรับตามอุปกรณ์
- **Reduced Motion**: รองรับผู้ใช้ที่ต้องการลดการเคลื่อนไหว

## 🛠️ เทคโนโลยีที่ใช้

### 📄 HTML5
- Semantic HTML
- Accessibility features
- Meta viewport tag

### 🎨 CSS3
- Flexbox และ Grid
- Media Queries
- CSS Variables
- Transform และ Transitions

### ⚡ JavaScript
- ES6+ Features
- Event Listeners
- Touch Events
- Responsive Utilities

## 📱 การทดสอบ

### 🧪 Devices ที่ทดสอบ
- iPhone SE (375px)
- iPhone 12 (390px)
- Samsung Galaxy S21 (360px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop (1920px)

### 🌐 Browsers ที่รองรับ
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## 🚀 การติดตั้ง

1. Clone repository
```bash
git clone [repository-url]
```

2. เปิดไฟล์ index.html ในเบราว์เซอร์

3. ทดสอบ responsive design โดย:
   - ใช้ Developer Tools
   - เปลี่ยนขนาดหน้าจอ
   - ทดสอบบนอุปกรณ์จริง

## 📝 การปรับแต่ง

### 🎨 เปลี่ยนสี
แก้ไข CSS variables ในไฟล์ CSS:
```css
:root {
  --primary-color: #b99760;
  --secondary-color: #856d48;
  --background-color: #eae7b9;
}
```

### 📱 เพิ่ม Breakpoint
เพิ่ม media query ในไฟล์ CSS:
```css
@media (max-width: 1200px) {
  /* Your styles here */
}
```

### 🍔 ปรับ Hamburger Menu
แก้ไขในไฟล์ CSS:
```css
.hamburger {
  /* Adjust position and size */
}
```

## 🔧 การบำรุงรักษา

### 📊 Performance
- ใช้ lazy loading สำหรับรูปภาพ
- Optimize CSS และ JavaScript
- Minify files สำหรับ production

### 🐛 Bug Fixes
- ทดสอบบนอุปกรณ์จริง
- ตรวจสอบ console errors
- ใช้ browser dev tools

### 📱 Updates
- อัปเดต media queries ตามอุปกรณ์ใหม่
- เพิ่ม features ใหม่
- ปรับปรุง accessibility

## 📞 การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- ตรวจสอบ console errors
- ทดสอบบนอุปกรณ์อื่น
- ตรวจสอบ browser compatibility

## 📄 License

© 2025 Thawatchai P. | Bake.Bake

---

**หมายเหตุ**: เว็บไซต์นี้ได้รับการออกแบบให้รองรับทุกอุปกรณ์และให้ประสบการณ์การใช้งานที่ดีที่สุดสำหรับผู้ใช้ทุกคน 