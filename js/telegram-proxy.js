// Прокси для обхода CORS при отправке сообщений в Telegram
window.telegramProxy = {
    // Отправка сообщения через прокси-сервис
    async sendMessageViaProxy(botToken, chatId, message) {
        try {
            console.log('[TelegramProxy] Отправка сообщения через прокси...');
            
            // Используем сервис cors-anywhere или подобный для обхода CORS
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            const requestData = {
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            };
            
            // Отправляем запрос через прокси
            const response = await fetch(proxyUrl + telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                console.error(`[TelegramProxy] Ошибка HTTP: ${response.status}`);
                return false;
            }
            
            const data = await response.json();
            console.log('[TelegramProxy] Ответ от Telegram API:', data);
            return data.ok;
        } catch (error) {
            console.error('[TelegramProxy] Ошибка при отправке через прокси:', error);
            
            // Если не удалось отправить через прокси, пробуем использовать локальный сервер
            try {
                console.log('[TelegramProxy] Попытка отправки через локальный сервер...');
                
                // Формируем данные для отправки на локальный сервер
                const serverData = {
                    botToken: botToken,
                    chatId: chatId,
                    message: message
                };
                
                // Отправляем на локальный сервер (если он настроен)
                const serverUrl = 'https://mypro-avrormira.vercel.app/telegram-proxy.php';
                const serverResponse = await fetch(serverUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(serverData)
                });
                
                if (!serverResponse.ok) {
                    return false;
                }
                
                const serverResult = await serverResponse.json();
                return serverResult.success;
            } catch (serverError) {
                console.error('[TelegramProxy] Ошибка при отправке через локальный сервер:', serverError);
                return false;
            }
        }
    }
};
