// เมื่อโหลดหน้าเสร็จเรียบร้อยแล้ว
document.addEventListener("DOMContentLoaded", () => {

  // ✅ ดึง element ต่าง ๆ ที่เกี่ยวข้องกับตะกร้า
  const cartBtn = document.getElementById("cart-float");           
  // ปุ่มไอคอนตะกร้า 🛒
  const cartPanel = document.getElementById("cart-panel");         
  // แถบด้านขวาที่แสดงตะกร้า
  const closeBtn = document.getElementById("close-cart");          
  // ปุ่มกากบาท (×) สำหรับปิดแถบ
  const cartCount = document.getElementById("cart-count");         
  // ตัวเลขแสดงจำนวนสินค้า (บนปุ่มตะกร้า)
  const cartItemCount = document.getElementById("cart-item-count");
  // ตัวเลขแสดงจำนวนสินค้าในแถบด้านขวา

  // ✅ โหลดจำนวนสินค้าจาก localStorage (ถ้ามี)
  const stored = localStorage.getItem("cartCount") || "0";         
  // ถ้ายังไม่มี ให้ใช้ค่า "0"
  cartCount.textContent = stored;                                  
  // แสดงจำนวนในปุ่มตะกร้า
  cartItemCount.textContent = stored;                              
  // แสดงจำนวนในแถบ cart ด้านขวา

  // ✅ เมื่อคลิกปุ่มตะกร้า → เปิดแถบ cart ด้านขวา
  cartBtn.addEventListener("click", () => {
    cartPanel.classList.add("open");
  });

  // ✅ เมื่อคลิกปุ่มปิด (×) → ปิดแถบ cart ด้านขวา
  closeBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
  });

  // ✅ เรียกแสดงรายการสินค้าในตะกร้า
  renderCart();
});

function renderCart() {
  const cartList = document.getElementById("cart-list");         
  // พื้นที่แสดงรายการสินค้าในตะกร้า
  const cartTotal = document.getElementById("cart-total");       
  // พื้นที่แสดงราคารวมทั้งหมด
  let cart = JSON.parse(localStorage.getItem("cart")) || [];     
  // โหลดข้อมูลตะกร้าจาก localStorage (แปลงจาก JSON เป็น array)

  // ✅ ถ้าตะกร้าว่าง → แสดงข้อความว่า "ตะกร้าว่างเปล่า"
  if (cart.length === 0) {
    cartList.innerHTML = '<p style="text-align:center;color:#888;">ตะกร้าสินค้าว่างเปล่า</p>';
    cartTotal.textContent = '';
    return; // จบการทำงาน
  }

  let total = 0; // สำหรับเก็บราคาสินค้ารวม
  // ✅ สร้าง HTML สำหรับแต่ละรายการในตะกร้า
  cartList.innerHTML = cart.map(item => {
    total += item.price * item.qty; // คำนวณราคารวมทีละรายการ
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div><strong>${item.name}</strong></div>
          <div>
            จำนวน:
            <button class="decrease-btn" data-name="${item.name}">-</button>
            <button class="increase-btn" data-name="${item.name}">+</button>
          </div>   
          <div>จำนวน: ${item.qty}</div>
          <div>ราคา: ${item.price} บาท</div>
        </div>
        <div class="cart-item-actions">
          <button class="remove-btn" data-name="${item.name}">ลบสินค้า</button>
        </div>
      </div>     
    `;
  }).join(""); // รวมเป็น HTML เดียวกัน

  cartTotal.textContent = `รวมทั้งหมด: ${total} บาท`; // แสดงราคารวมทั้งหมด

  // ✅ อัปเดตจำนวนรวมสินค้าบนปุ่มและในแถบ
  const countAll = cart.reduce((sum, item) => sum + item.qty, 0); // รวมจำนวนสินค้า
  document.getElementById("cart-count").textContent = countAll;
  document.getElementById("cart-item-count").textContent = countAll;
  localStorage.setItem("cartCount", countAll); // เก็บจำนวนสินค้าล่าสุดกลับเข้า localStorage

  // ✅ ตำแหน่งที่คุณจะ "เพิ่ม" บล็อกเพิ่ม/ลดด้านล่างนี้ ⬇️⬇️⬇️
  // เพิ่มจำนวน
  // ✅ วนลูปหา element ทุกปุ่มที่มี class 'increase-btn'
cartList.querySelectorAll('.increase-btn').forEach(btn => {
  // เพิ่ม event listener ให้แต่ละปุ่ม เมื่อมีการคลิก
  btn.addEventListener('click', () => {
    // ดึงค่า 'data-name' จากปุ่มนั้น (ใช้เพื่ออ้างอิงชื่อสินค้า)
    const name = btn.getAttribute('data-name');

    // หาสินค้าที่ตรงกับชื่อนี้ใน array cart
    const found = cart.find(item => item.name === name);

    // ถ้าพบสินค้าใน cart
    if (found) {
      found.qty++; // เพิ่มจำนวนสินค้าในตะกร้า (quantity)
    }

    // อัปเดตข้อมูลใหม่กลับเข้า localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // เรียกฟังก์ชัน renderCart() เพื่อรีเฟรชหน้าตะกร้าใหม่
    renderCart();
  });
});

// ✅ วนลูปหา element ทุกปุ่มที่มี class 'decrease-btn'
cartList.querySelectorAll('.decrease-btn').forEach(btn => {
  // เพิ่ม event listener ให้แต่ละปุ่ม เมื่อมีการคลิก
  btn.addEventListener('click', () => {
    // ดึงค่า 'data-name' จากปุ่มนั้น (ใช้เพื่ออ้างอิงชื่อสินค้า)
    const name = btn.getAttribute('data-name');

    // หาสินค้าที่ตรงกับชื่อนี้ใน array cart
    const found = cart.find(item => item.name === name);

    // ถ้าพบสินค้า และจำนวนมากกว่า 1 → ลดจำนวน
    if (found && found.qty > 1) {
      found.qty--; // ลดจำนวนสินค้าในตะกร้า
    } else {
      // ถ้าจำนวนเหลือ 1 หรือน้อยกว่า → ลบออกจากตะกร้า
      cart = cart.filter(item => item.name !== name);
    }

    // อัปเดตข้อมูลใหม่กลับเข้า localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // เรียกฟังก์ชัน renderCart() เพื่อรีเฟรชหน้าตะกร้าใหม่
    renderCart();
  });
});


  // ✅ ใส่ event ให้กับปุ่ม "ลบ" ของแต่ละสินค้า
  cartList.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.getAttribute('data-name'); // ชื่อสินค้าที่จะลบ
      cart = cart.filter(item => item.name !== name); // ลบสินค้าชื่อนั้นออกจาก array
      localStorage.setItem('cart', JSON.stringify(cart)); // อัปเดต localStorage
      renderCart(); // รีเฟรชตะกร้าใหม่
    });
  });
}

