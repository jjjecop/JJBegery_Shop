// ✅ Initialize hamburger menu for contact page
document.addEventListener("DOMContentLoaded", function() {
  initHamburgerMenu();
  initContactForm();
});

// ✅ ฟังก์ชัน hamburger menu
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  
  if (hamburger && menu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
      
      // ✅ ป้องกัน scroll ของ body เมื่อ menu เปิด
      if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // ✅ Close menu when clicking on a link
    const menuLinks = menu.querySelectorAll('.text-menu, .text-menu2');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // ✅ Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // ✅ Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // ✅ Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // ✅ Handle orientation change
    window.addEventListener('orientationchange', function() {
      setTimeout(() => {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
          hamburger.classList.remove('active');
          menu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 100);
    });
  }
}

// ✅ ฟังก์ชันสำหรับ contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // ✅ Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // ✅ Validate form
      if (!name || !email || !subject || !message) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      
      // ✅ Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('กรุณากรอกอีเมลให้ถูกต้อง');
        return;
      }
      
      // ✅ Show success message
      alert('ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด');
      
      // ✅ Reset form
      contactForm.reset();
    });
  }
}

// ✅ ฟังก์ชัน utility สำหรับ responsive
function isMobile() {
  return window.innerWidth <= 768;
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
  return window.innerWidth > 1024;
}

// ✅ ฟังก์ชันสำหรับ responsive touch handling
function initTouchHandlers() {
  if (isMobile()) {
    // เพิ่ม touch event handlers สำหรับ mobile
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
  }
}

// ✅ Initialize responsive features
document.addEventListener('DOMContentLoaded', function() {
  initTouchHandlers();
});

function validateForm(data) {
    const errors = [];

    if (!data.name.trim()){
        errors.push('กรุณากรอกชื่อ-นามสกุล');
    }

    if (!data.email.trim()) {
        errors.push('กรุณากรอกอีเมล')
    }else if (!isValidEmail(data.email)){
        errors.push('กรุณากรอกอีเมลให้ถูกต้อง');
    }

    if (!data.phone.trim()) {
        errors.push('กรุณากรอกเบอร์โทรศัพท์');
    }

    if (!data.subject) {
        errors.push('กรุณาเลือกหัวข้อ');
    }

    if (!data.message.trim() || data.message === 'กรุณาเขียนข้อความของคุณ...') {
        errors.push('กรุณากรอกข้อความ');
    }

    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    alert('ส่งข้อความเรียบร้อยเเล้ว! เราจะติดต่อกลับโดยเร็วที่สุด');
}

function showErrorMessage(message) {
    alert('เกิดข้อผิดพลาด:\n' + message);
}