document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        guests: formData.get('guests'),
        attending: formData.get('attending'),
        message: formData.get('message') || 'нет комментария'
    };

    // Формируем тело для GitHub Issue
    const issueBody = `
        **Имя:** ${data.name}
        **Количество гостей:** ${data.guests}
        **Присутствие:** ${data.attending === 'yes' ? 'Приду' : 'Не смогу'}
        **Комментарий:** ${data.message}
    `;

    try {
        // Отправляем запрос к GitHub API
        const response = await fetch('https://api.github.com/repos/IamBerzilla/wedding/issues', {
            method: 'POST',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `RSVP от ${data.name}`,
                body: issueBody
            })
        });

        if (response.ok) {
            alert('Спасибо! Ваш ответ сохранён.');
            e.target.reset();
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка. Пожалуйста, свяжитесь с нами другим способом.');
    }
});
