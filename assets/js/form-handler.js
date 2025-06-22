// assets/js/form-handler.js
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Показываем загрузку
  document.body.innerHTML = `
    <div class="form-loading" style="...">
      <div class="loader"></div>
      <p>Отправляем ваш ответ...</p>
    </div>
  `;

  // Отправка формы
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
    alert('Ошибка: ' + error.message);
    window.location.reload();
  });
}

// Назначаем обработчик после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
