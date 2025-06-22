// Файл: assets/js/submit-rsvp.js
document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  // Формируем текст Issue
  const issueBody = `
    **Имя:** ${data.name}     
    **Гостей:** ${data.guests}  
    **Присутствие:** ${data.attending}  
    **Комментарий:** ${data.message || 'нет'}
  `;

  // Отправляем данные в Issues GitHub
  const response = await fetch('https://api.github.com/repos/iamberzilla/wedding/issues', {
    method: 'POST',
    headers: {
      'Authorization': 'token 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',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `Новый RSVP от ${data.name}`,
      body: issueBody,
    }),
  });

  if (response.ok) {
    alert('Спасибо! Ваш ответ сохранён.');
    e.target.reset();
  } else {
    alert('Ошибка. Попробуйте позже.');
  }
});
