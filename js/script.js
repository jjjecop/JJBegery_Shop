document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("maincake");
  const bodyImg = document.querySelector(".body-img");
  const gallery = document.getElementById("gallery");

  // ✅ ตรวจสอบว่ามี gallery หรือไม่ (สำหรับหน้า menu, about, contact)
  if (!gallery) {
    initHamburgerMenu();
    return;
  }

  const originals = [...gallery.children];
  const cloneCount = 2;

  // ✅ โคลนรูป cake ทั้งหมดเพิ่มอีก 2 ชุด
  for (let i = 0; i < cloneCount; i++) {
    originals.forEach(item => {
      const clone = item.cloneNode(true);
      gallery.appendChild(clone);
    });
  }

  const galleryItems = gallery.querySelectorAll(".gallery-item");
  const baseLength = originals.length;
  let currentIndex = 0;
  let itemWidth = 0;
  let isAutoScrolling = true;
  let autoScrollInterval;

  // ✅ ฟังก์ชันเริ่มต้น auto scroll
  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      if (isAutoScrolling) {
        currentIndex++;
        updateMainImage(currentIndex);
        scrollGallery(currentIndex);
      }
    }, 3000);
  }

  // ✅ ฟังก์ชันหยุด auto scroll
  function stopAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollInterval) clearInterval(autoScrollInterval);
  }

  // ✅ ฟังก์ชันเริ่ม auto scroll อีกครั้ง
  function resumeAutoScroll() {
    isAutoScrolling = true;
    startAutoScroll();
  }

  requestAnimationFrame(() => {
    itemWidth = galleryItems[0].offsetWidth + 12;
    startAutoScroll();
  });

  function updateMainImage(index) {
    const item = galleryItems[index % baseLength];
    if (!item) return;

    const image = item.querySelector("img");

    mainImage.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    mainImage.style.transform = "translateX(-100%)";
    mainImage.style.opacity = 0;

    galleryItems.forEach(el => el.classList.remove("active"));
    galleryItems[index % galleryItems.length].classList.add("active");

    setTimeout(() => {
      mainImage.src = image.src;
      bodyImg.style.backgroundColor = item.style.backgroundColor;

      mainImage.style.transition = "none";
      mainImage.style.transform = "translateX(100%)";
      void mainImage.offsetWidth;

      mainImage.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      mainImage.style.transform = "translateX(0)";
      mainImage.style.opacity = 1;
    }, 300);
  }

  function scrollGallery(index) {
    requestAnimationFrame(() => {
      const scrollTarget = itemWidth * index;
      const centerOffset = (gallery.clientWidth - itemWidth) / 2;
      const scrollLeft = scrollTarget - centerOffset;

      gallery.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
      });

      const resetIndex = baseLength;
      if (index >= galleryItems.length - baseLength) {
        setTimeout(() => {
          currentIndex = resetIndex;
          const resetScroll = itemWidth * currentIndex - centerOffset;
          gallery.scrollTo({ left: resetScroll, behavior: "auto" });
        }, 400);
      }
    });
  }

  // ✅ Touch events สำหรับ mobile
  let touchStartX = 0;
  let touchEndX = 0;

  gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoScroll();
  }, { passive: true });

  gallery.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    setTimeout(resumeAutoScroll, 2000);
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        currentIndex++;
      } else {
        // Swipe right - previous
        currentIndex--;
        if (currentIndex < 0) currentIndex = baseLength - 1;
      }
      updateMainImage(currentIndex);
      scrollGallery(currentIndex);
    }
  }

  // ✅ Mouse events สำหรับ desktop
  gallery.addEventListener('mouseenter', stopAutoScroll);
  gallery.addEventListener('mouseleave', resumeAutoScroll);

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateMainImage(index);
      scrollGallery(index);
      stopAutoScroll();
      setTimeout(resumeAutoScroll, 3000);
    });
  });

  // ✅ Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex--;
      if (currentIndex < 0) currentIndex = baseLength - 1;
      updateMainImage(currentIndex);
      scrollGallery(currentIndex);
    } else if (e.key === 'ArrowRight') {
      currentIndex++;
      updateMainImage(currentIndex);
      scrollGallery(currentIndex);
    }
  });

  // ✅ Pause auto-scroll when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      resumeAutoScroll();
    }
  });

  updateMainImage(currentIndex);
  scrollGallery(currentIndex);

  // ✅ Initialize hamburger menu
  initHamburgerMenu();
});

// ✅ ฟังก์ชัน hamburger menu ที่แยกออกมา
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

// ✅ ฟังก์ชันสำหรับ smooth scroll
function smoothScrollTo(element, duration = 300) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// ✅ ฟังก์ชันสำหรับ responsive image loading
function loadResponsiveImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
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
  loadResponsiveImages();
  initTouchHandlers();
});
