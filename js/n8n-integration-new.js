// n8n Webhook Integration для чат-бота с ИИ
class N8nWebhookIntegration {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    // Отправка сообщения на вебхук n8n и получение ответа от ИИ
    async sendMessageToAI(message, sessionId) {
        try {
            console.log('[N8nWebhookIntegration] Отправка сообщения на вебхук n8n');
            
            // Кодируем параметры для GET-запроса
            const params = new URLSearchParams({
                message: message,
                sessionId: sessionId,
                timestamp: new Date().toISOString()
            });
            
            // Формируем URL с параметрами
            const url = `${this.webhookUrl}?${params.toString()}`;
            console.log('[N8nWebhookIntegration] URL запроса:', url);
            
            // Отправляем GET-запрос на вебхук
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Проверяем статус ответа
            if (!response.ok) {
                console.error(`[N8nWebhookIntegration] Ошибка HTTP: ${response.status} ${response.statusText}`);
                const errorText = await response.text();
                console.error('[N8nWebhookIntegration] Текст ошибки:', errorText);
                return { success: false, message: 'Ошибка при отправке запроса на сервер ИИ' };
            }

            // Получаем ответ от вебхука
            const responseText = await response.text();
            console.log('[N8nWebhookIntegration] Текст ответа:', responseText);
            
            let data;
            
            // Проверяем, является ли ответ JSON
            try {
                if (responseText && responseText.trim()) {
                    data = JSON.parse(responseText);
                } else {
                    return { success: false, message: 'Получен пустой ответ от сервера' };
                }
            } catch (jsonError) {
                console.log('[N8nWebhookIntegration] Ответ не является JSON, используем текст как есть');
                return { success: true, message: responseText };
            }
            
            console.log('[N8nWebhookIntegration] Ответ от n8n вебхука:', data);
            
            // Извлекаем ответ от ИИ из разных возможных форматов
            let aiResponse = '';
            
            if (data && typeof data === 'object') {
                if (data.output && typeof data.output === 'string') {
                    // Формат { "output": "..." }
                    aiResponse = data.output;
                } else if (data.aiResponse) {
                    aiResponse = data.aiResponse;
                } else if (data.message) {
                    aiResponse = data.message;
                } else if (data.response) {
                    aiResponse = data.response;
                } else if (data.result) {
                    if (typeof data.result === 'string') {
                        aiResponse = data.result;
                    } else if (data.result && typeof data.result === 'object') {
                        aiResponse = JSON.stringify(data.result);
                    }
                } else {
                    // Если не нашли известных полей, преобразуем весь объект в строку
                    aiResponse = JSON.stringify(data);
                }
            } else if (typeof data === 'string') {
                aiResponse = data;
            } else {
                aiResponse = 'Получен ответ от ИИ, но в неожиданном формате';
            }
            
            // Возвращаем ответ от ИИ
            return { success: true, message: aiResponse };
        } catch (error) {
            console.error('[N8nWebhookIntegration] Ошибка при отправке сообщения на вебхук n8n:', error);
            return { 
                success: false, 
                message: 'Произошла ошибка при обращении к серверу ИИ'
            };
        }
    }
}

// Экспорт класса для использования в других файлах
if (typeof module !== 'undefined') {
    module.exports = N8nWebhookIntegration;
}
