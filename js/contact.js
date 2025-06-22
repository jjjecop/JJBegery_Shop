document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    // แก้ไข placeholder ของ textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('focus', function() {
            if (this.value === 'กรุณาเขียนข้อความของคุณ...'){
                this.value = '';
            }
        });

        messageTextarea.addEventListener('blur', function(){
            if (this.value === ''){
                this.value = 'กรุณาเขียนข้อความของคุณ...';
            }
        });        
    }
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // ดึงข้อมูลจากฟอร์ม
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // ตรวจสอบข้อมูล
        if (!validateForm(data)){
            return;
        }

        // แสดง loading
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่ง...';

        // Simulate sending (ในอนาคตจะเชื่อมกัย backend)
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
            // รีเซ็ต placeholder ของ textarea
            if (messageTextarea) {
                messageTextarea.value = 'กรุณาเขียนข้อความของคุณ...'
            }
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        }, 2000);
    });
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