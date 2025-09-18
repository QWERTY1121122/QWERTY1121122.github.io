  const btn = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    btn.textContent = '☀️ Светлая тема';
  }

  btn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
      btn.textContent = '☀️ Светлая тема';
      localStorage.setItem('theme', 'dark');
    } else {
      btn.textContent = '🌙 Тёмная тема';
      localStorage.setItem('theme', 'light');
    }
  });

