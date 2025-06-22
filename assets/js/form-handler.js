// Обработчик формы
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Создаем overlay для загрузки
  const overlay = document.createElement('div');
  overlay.className = 'form-loading-overlay';
  
  overlay.innerHTML = `
    <div class="loader"></div>
    <p>Отправляем ваш ответ...</p>
  `;
  
  // Оптимизация для мобильных
  if (window.innerWidth < 768) {
    const loader = overlay.querySelector('.loader');
    loader.style.width = '35px';
    loader.style.height = '35px';
    loader.style.borderWidth = '3px';
  }
  
  document.body.appendChild(overlay);
  
  // Отправка данных
  const form = event.target;
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      window.location.href = form.querySelector('[name="_next"]').value;
    } else {
      throw new Error('Ошибка сервера');
    }
  })
  .catch(error => {
    alert('Ошибка отправки: ' + error.message);
    document.body.removeChild(overlay);
  });
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  // Автокоррекция пути для GitHub Pages
  if (window.location.host.includes('github.io')) {
    const nextField = document.querySelector('[name="_next"]');
    if (nextField) {
      const repoName = window.location.pathname.split('/')[1];
      nextField.value = `/${repoName}/spasibo.html`;
    }
  }
});
