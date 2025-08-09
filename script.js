const buttons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.card-slider');
const themeToggle = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

// Toggle dark mode + đổi icon
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.textContent = isDark ? '🌙' : '🌞';
});

// Tab chuyển nội dung
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Kích hoạt nút
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Tab hiện tại
    const targetId = btn.dataset.tab;
    const targetSection = document.getElementById(targetId);

    sections.forEach(sec => {
      if (sec === targetSection) {
        sec.classList.add('active'); // Bắt đầu fade-in
      } else {
        sec.classList.remove('active'); // Bắt đầu fade-out
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("gJmDldWEobd-uQQBH"); // Thay YOUR_USER_ID bằng userID từ EmailJS

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const status = document.getElementById("form-status");

    if (!name || !email || !message) {
        status.textContent = "❗ Vui lòng điền đầy đủ thông tin.";
        status.style.color = "red";
        return;
    }

    const templateParams = {
      title: "Contact Us:",
      name: name,
      email: email,
      message: message,
      
    };

    emailjs.send("service_eqnbk2d", "template_d6twvit", templateParams)
      .then(function(response) {
          status.textContent = "✅ Đã gửi thông tin của bạn. Tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.";
          status.style.color = "green";
          document.getElementById("contactForm").reset();
      }, function(error) {
          alert("❌ Lỗi chi tiết từ EmailJS:\n" + JSON.stringify(error));
          status.textContent = "❌ Gửi thất bại. Vui lòng thử lại sau.";
          status.style.color = "red";
      });
  });
});