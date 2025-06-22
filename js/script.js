document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("maincake");
  const bodyImg = document.querySelector(".body-img"); // แก้จาก .img เป็น .body-img
  const gallery = document.getElementById("gallery");

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

  requestAnimationFrame(() => {
    itemWidth = galleryItems[0].offsetWidth + 12;

    setInterval(() => {
      currentIndex++;
      updateMainImage(currentIndex);
      scrollGallery(currentIndex);
    }, 3000);
  });

  function updateMainImage(index) {
    const item = galleryItems[index % baseLength];
    if (!item) return;

    const image = item.querySelector("img"); // ✅ ดึง <img> ที่อยู่ข้างใน .gallery-item

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

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateMainImage(index);
      scrollGallery(index);
    });
  });

  updateMainImage(currentIndex);
  scrollGallery(currentIndex);
});
