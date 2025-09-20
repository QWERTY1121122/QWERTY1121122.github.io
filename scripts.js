document.addEventListener('DOMContentLoaded', function() {

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('active');
    });
  });

  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  } else {
    const savedTheme = localStorage.getItem('theme');
    body.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageDiv.innerHTML = '';

    const formData = new FormData(form);

    try {
      const response = await fetch('form.php', {
        method: 'POST',
        body: formData
      });

      const text = await response.text();

      if (response.ok) {
        if (text.includes('Спасибо')) {
          messageDiv.style.color = 'green';
          messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Success" width="40" height="40" />
              <span>Ваше сообщение отправлено. Ожидайте звонка 🦁📞📞</span>
            </div>
          `;
          form.reset();
        } else {
          messageDiv.style.color = 'red';
          messageDiv.textContent = text;
        }
      } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Ошибка сервера. Попробуйте позже.';
      }
    } catch (error) {
      messageDiv.style.color = 'red';
      messageDiv.textContent = 'Ошибка сети. Проверьте подключение.';
      console.error('Ошибка отправки формы:', error);
    }
  });
});
