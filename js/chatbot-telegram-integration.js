// Интеграция чат-бота с Telegram через n8n
class ChatbotTelegramIntegration {
    constructor(telegramIntegration) {
        this.telegramIntegration = telegramIntegration;
        this.sessionId = this.generateSessionId();
        this.messageHistory = [];
    }

    // Генерация уникального ID сессии
    generateSessionId() {
        return 'web_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }

    // Добавление сообщения в историю
    addMessageToHistory(role, content) {
        this.messageHistory.push({
            role: role,
            content: content,
            timestamp: new Date().toISOString()
        });
        
        // Ограничиваем историю 10 последними сообщениями
        if (this.messageHistory.length > 10) {
            this.messageHistory = this.messageHistory.slice(-10);
        }
    }
    
    // Получение отформатированной истории сообщений для отправки в Telegram
    getFormattedHistory() {
        if (!this.messageHistory || this.messageHistory.length === 0) {
            return 'История сообщений пуста';
        }
        
        return this.messageHistory.map(msg => {
            const time = new Date(msg.timestamp).toLocaleTimeString();
            const role = msg.role === 'user' ? 'Пользователь' : 'Ассистент';
            return `[${time}] ${role}: ${msg.content}`;
        }).join('\n\n');
    }

    // Отправка сообщения пользователя в Telegram
    async sendUserMessageToTelegram(message) {
        try {
            console.log('[ChatbotTelegram] Подготовка к отправке сообщения в Telegram');
            
            // Добавляем сообщение пользователя в историю
            this.addMessageToHistory('user', message);
            
            // Сохраняем сообщение в локальное хранилище, если оно доступно
            if (window.localStorageIntegration) {
                console.log('[ChatbotTelegram] Сохранение сообщения в локальное хранилище');
                window.localStorageIntegration.saveMessage(this.sessionId, message, 'user');
                
                // Добавляем историю сообщений
                const historyMessage = this.formatMessageHistory();
                if (historyMessage && historyMessage.length > 0) {
                    window.localStorageIntegration.saveMessage(
                        this.sessionId, 
                        `История сообщений: ${historyMessage}`, 
                        'system'
                    );
                }
            }
            
            // Пробуем отправить через Telegram API
            let success = false;
            
            // Форматируем сообщение для отправки в Telegram
            const formattedMessage = this.formatChatMessage(message);
            
            // Проверяем, что telegramIntegration существует
            if (this.telegramIntegration && typeof this.telegramIntegration.sendMessage === 'function') {
                console.log('[ChatbotTelegram] Попытка отправки сообщения в Telegram...');
                
                try {
                    success = await this.telegramIntegration.sendMessage(formattedMessage);
                    console.log('[ChatbotTelegram] Результат отправки:', success ? 'Успешно' : 'Ошибка');
                } catch (err) {
                    console.error('[ChatbotTelegram] Ошибка при отправке через Telegram API:', err);
                    success = false;
                }
            } else {
                console.log('[ChatbotTelegram] Telegram интеграция недоступна');
                success = false;
            }
            
            // Добавляем кнопку экспорта сообщений, если есть необработанные сообщения
            if (window.localStorageIntegration && !success) {
                const unprocessedMessages = window.localStorageIntegration.getUnprocessedMessages();
                if (unprocessedMessages.length > 0 && !document.getElementById('export-messages-btn')) {
                    const exportBtn = document.createElement('button');
                    exportBtn.id = 'export-messages-btn';
                    exportBtn.className = 'export-messages-btn';
                    exportBtn.textContent = `Экспортировать сообщения (${unprocessedMessages.length})`;
                    exportBtn.onclick = () => window.localStorageIntegration.exportMessagesToJson();
                    
                    // Добавляем кнопку на страницу
                    document.querySelector('.chatbot-container').appendChild(exportBtn);
                }
            }
            
            return success;
        } catch (error) {
            console.error('[ChatbotTelegram] Ошибка при отправке сообщения в Telegram:', error);
            return false;
        }
    }

    // Форматирование сообщения чата для отправки в Telegram
    formatChatMessage(message) {
        return `
<b>💬 Сообщение из чат-бота</b>

<b>ID сессии:</b> ${this.sessionId}
<b>Сообщение:</b> ${message}

<b>История сообщений:</b>
${this.formatMessageHistory()}

<i>Отправлено с сайта в ${new Date().toLocaleString()}</i>
        `;
    }

    // Форматирование истории сообщений
    formatMessageHistory() {
        if (this.messageHistory.length <= 1) {
            return "<i>Это первое сообщение в чате</i>";
        }
        
        // Форматируем все сообщения кроме текущего (последнего)
        return this.messageHistory.slice(0, -1).map((msg, index) => {
            const role = msg.role === 'user' ? '👤 Пользователь' : '🤖 Бот';
            return `${index + 1}. <b>${role}:</b> ${msg.content}`;
        }).join('\n');
    }

    // Обработка ответа от n8n/ИИ (будет вызываться из webhook или другого механизма)
    processAiResponse(response) {
        // Добавляем ответ ИИ в историю
        this.addMessageToHistory('assistant', response);
        
        // Возвращаем ответ для отображения в чат-боте
        return response;
    }
}

// Экспорт класса для использования в других файлах
if (typeof module !== 'undefined') {
    module.exports = ChatbotTelegramIntegration;
}
