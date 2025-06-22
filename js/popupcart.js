function showAddToCartPopup(cake, onConfirm) {
    // ... ทั้ง popup logic อยู่ในฟังก์ชันนี้
    // ใช้ cake และ callback onConfirm() ได้
    const popup = document.getElementById("confirm-popup");
    const popupYes = document.getElementById("popup-yes");
    const popupNo = document.getElementById("popup-no");
    const popupSuccess = document.getElementById("popup-success");
    const popupQuestion = document.getElementById("popup-question");
    
    // ✅ ถ้าขาด element ใดไปเลย จะไม่ทำงาน (กัน error)
    if(!popup || !popupYes || !popupNo || !popupSuccess || !popupQuestion) return;

    //แสดง popup และแสดงเฉพาคำถาม
    popup.style.display = "flex";
    popupQuestion.style.display = "block";
    popupSuccess.style.display = "none";

    popupYes.onclick = () => {
        // ซ่อนคำถาม แสดงเช็คมาร์ค
        popupQuestion.style.display = "none";
        popupSuccess.style.display = "block";
        
        // เพิ่มสินค้าใน localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.name === cake.name);

        if (existing) {
            existing.qty += 1;
        }else {
            cart.push({
                name: cake.name,
                price: cake.price,
                image: cake.image,
                qty: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // รอ animation สำเร็จและซ่อน popup
        setTimeout(() => {
            popup.style.display = "none";
            if (typeof onConfirm === "function") onConfirm();
        }, 1500);
    };

    popupNo.onclick = () => {
        popup.style.display = "none";
    }
}