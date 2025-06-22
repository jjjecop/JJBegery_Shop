document.addEventListener("DOMContentLoaded", () => {
    const cakeMenu = [
        {
            name: "เค้กสตรอเบอรี่",
            description: "เค้กวานิลลาหอมหวานกับสตรอเบอร์รี่สด",
            image: "imgcake/cake1.png",
            price: 89
        },
        {
            name: "เค้กช็อกโกแลต",
            description: "เค้กเนื้อนุ่มเข้มข้น ราดด้วยช็อกโกแลตแท้",
            image: "imgcake/cake2.png",
            price: 89
        },
        {
            name: "ชีสเค้ก",
            description: "ชีสเค้กสไตล์ญี่ปุ่น เนื้อนุ่มฟู เบาเหมือนปุยเมฆ หอมละมุนทุกคำ",
            image: "imgcake/cake3.png",
            price: 89
        },
        {
            name: "เค้กส้ม",
            description: "เค้กเนื้อนุ่มชุ่มฉ่ำ ราดด้วยซอสส้มเปรี้ยวหวาน หอมสดชื่นทุกคำ",
            image: "imgcake/cake4.png",
            price: 89
        },
        {
            name: "เค้กมะพร้าว",
            description: "เค้กวานิลลานุ่มละมุน สอดไส้มะพร้าวอ่อนเต็มคำ เคลือบด้วยครีมหอมมัน หวานน้อยกำลังดี",
            image: "imgcake/cake5.png",
            price: 89
        },
        {
            name: "ชีสเค้กหน้าไหม้",
            description: "ชีสเค้กหน้าไหม้สไตล์บาสก์ เนื้อแน่นนุ่มละลายในปาก หอมกลิ่นคาราเมลจากผิวไหม้พอดี ๆ ทุกคำเข้มข้นด้วยครีมชีสแท้",
            image: "imgcake/cake6.png",
            price: 89
        },
    ];

    const menuContainer = document.querySelector(".body-img")

    cakeMenu.forEach((cake) => {
        const card = document.createElement("div");
        card.className = "card fade-in";

        card.innerHTML = `
            <img src="${cake.image}" alt="${cake.name}" width="280px">
            <h3>${cake.name}</h3>
            <p>${cake.description}</p>
            <p class="cake-price">ราคา: ${cake.price} บาท</p>
            <button>เพิ่มในรายการ</button>
        `;

        menuContainer.appendChild(card);

        // 🔻 โค้ดเพิ่มสินค้าลงตะกร้าอยู่ตรงนี้
        const button = card.querySelector("button");
        //  ดึงปุ่ม สั่งซื้อ จาก card ที่เพิ่งสร้างขึ้น เพื่อให้สามารถเพิ่ม event listener ได้
        
        button.addEventListener("click", () => {
            showAddToCartPopup(cake, () => {
                renderCart();
            })
        })
    });
});