// Telegram Bot Integration
class TelegramIntegration {
    constructor(botToken, chatId) {
        this.botToken = botToken;
        this.chatId = chatId;
        this.apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    }

    // Отправка сообщения в Telegram
    async sendMessage(message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();
            return data.ok;
        } catch (error) {
            console.error('Ошибка при отправке сообщения в Telegram:', error);
            return false;
        }
    }

    // Форматирование данных заявки в сообщение
    formatRequestMessage(formData) {
        return `
<b>🔔 Новая заявка на ремонт!</b>

<b>👤 Имя:</b> ${formData.name}
<b>📱 Телефон:</b> ${formData.phone}
<b>💬 Сообщение:</b> 
${formData.message}

<i>Отправлено с сайта-визитки в ${new Date().toLocaleString()}</i>
        `;
    }
}

// Экспорт класса для использования в других файлах
if (typeof module !== 'undefined') {
    module.exports = TelegramIntegration;
}
