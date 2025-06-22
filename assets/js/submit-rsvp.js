// assets/js/submit-rsvp.js

// Проверяем, что конфиг загружен
if (typeof CONFIG === 'undefined') {
  console.error('Ошибка: config.js не загружен!');
  alert('Ошибка загрузки формы. Пожалуйста, сообщите организаторам.');
  throw new Error('Config file is missing');
}

document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Получаем данные формы
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    guests: formData.get('guests'),
    attending: formData.get('attending'),
    message: formData.get('message') || 'Нет комментария'
  };

  // Формируем тело для GitHub Issue
  const issueBody = `
    **Имя:** ${data.name}
    **Количество гостей:** ${data.guests}
    **Присутствие:** ${data.attending === 'yes' ? '✅ Приду' : '❌ Не смогу'}
    **Комментарий:** ${data.message}
  `;

  try {
    // Отправляем запрос к GitHub API
    const response = await fetch(`https://api.github.com/repos/${CONFIG.REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `RSVP: ${data.name}`,
        body: issueBody
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка сервера');
    }

    // Успешная отправка
    alert('✅ Ваш ответ сохранён! Спасибо!');
    e.target.reset();

  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    alert('⚠️ Произошла ошибка. Пожалуйста, свяжитесь с нами другим способом.');
  }
});
