const SUBMIT_DELAY = 5000; // 5 секунд между отправками
let lastSubmitTime = 0;

// Функция для логирования
function logError(error, context = {}) {
  console.error('Ошибка:', {
    timestamp: new Date().toISOString(),
    error: error.message || error,
    stack: error.stack,
    ...context
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Проверка частоты отправки
  const now = Date.now();
  if (now - lastSubmitTime < SUBMIT_DELAY) {
    const secLeft = Math.ceil((SUBMIT_DELAY - (now - lastSubmitTime)) / 1000);
    logError(new Error(`Частые отправки: попытка через ${secLeft} сек`), { 
      formData: Object.fromEntries(new FormData(event.target)) 
    });
    alert(`Подождите ${secLeft} секунд`);
    return;
  }
  lastSubmitTime = now;

  // Анимация загрузки
  const overlay = document.createElement('div');
  overlay.className = 'form-loading-overlay';
  overlay.innerHTML = '<div class="loader"></div><p>Отправляем...</p>';
  document.body.appendChild(overlay);

  // Данные формы
  const form = event.target;
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);

  // Отправка
  fetch(form.action, {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(formProps)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json().catch(() => ({})); // На случай пустого ответа
  })
  .then(data => {
    console.log('Успешная отправка:', data);
    window.location.href = form.querySelector('[name="_next"]').value;
  })
  .catch(error => {
    logError(error, { 
      formData: formProps,
      endpoint: form.action 
    });
    alert('Ошибка отправки. Мы уже работаем над этим!');
  })
  .finally(() => {
    document.body.removeChild(overlay);
  });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
});
