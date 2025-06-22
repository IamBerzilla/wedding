function handleFormSubmit(event) {
  event.preventDefault();
  
  // Показываем загрузку
  const overlay = document.createElement('div');
  overlay.className = 'form-loading-overlay';
  overlay.innerHTML = `
    <div class="loader"></div>
    <p>Отправляем ваш ответ...</p>
  `;
  document.body.appendChild(overlay);

  // Формируем данные для отправки
  const form = event.target;
  const formData = new FormData(form);
  const plainFormData = Object.fromEntries(formData.entries());
  const jsonData = JSON.stringify(plainFormData);

  // Отправка через Formspree API v2
  fetch('https://formspree.io/f/xvgrwgkn', {
    method: 'POST',
    body: jsonData,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      window.location.href = form.querySelector('[name="_next"]').value;
    } else {
      throw new Error('Formspree rejected the submission');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ошибка отправки. Пожалуйста, напишите нам напрямую.');
  })
  .finally(() => {
    document.body.removeChild(overlay);
  });
}

// Инициализация формы
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
});
