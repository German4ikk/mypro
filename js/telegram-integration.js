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
            console.log('[TelegramIntegration] Подготовка к отправке сообщения в Telegram');
            console.log('[TelegramIntegration] API URL:', this.apiUrl);
            console.log('[TelegramIntegration] Chat ID:', this.chatId);
            
            // Проверяем, что токен и chat_id установлены
            if (!this.botToken || !this.chatId) {
                console.error('[TelegramIntegration] Ошибка: не установлен токен бота или ID чата');
                return false;
            }
            
            // Проверяем наличие прокси
            if (window.telegramProxy) {
                console.log('[TelegramIntegration] Используем прокси для обхода CORS');
                
                // Пробуем отправить через прокси
                const success = await window.telegramProxy.sendMessageViaProxy(
                    this.botToken, 
                    this.chatId, 
                    message
                );
                
                return success;
            }
            
            // Если прокси недоступен, пробуем обычный способ
            console.log('[TelegramIntegration] Прокси недоступен, используем прямой запрос');
            
            // Создаем данные для отправки
            const requestData = {
                chat_id: this.chatId,
                text: message,
                parse_mode: 'HTML'
            };
            
            console.log('[TelegramIntegration] Отправка прямого запроса...');
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            // Проверяем статус ответа
            if (!response.ok) {
                console.error(`[TelegramIntegration] Ошибка HTTP: ${response.status} ${response.statusText}`);
                const errorText = await response.text();
                console.error('[TelegramIntegration] Текст ошибки:', errorText);
                return false;
            }

            const data = await response.json();
            console.log('[TelegramIntegration] Ответ от Telegram API:', data);
            return data.ok;
        } catch (error) {
            console.error('[TelegramIntegration] Ошибка при отправке сообщения в Telegram:', error);
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
