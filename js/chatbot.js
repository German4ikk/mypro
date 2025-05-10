// Чат-бот с интеграцией Telegram и n8n для обработки сообщений через ИИ
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем интеграцию с Telegram
    // Используем те же токен и chat_id, что и для формы обратной связи
    const botToken = '7225957181:AAFWeZsWTe9qJRBDf-x2oiU-V8qyqex4JMU';
    const chatId = '1053352386';
    const telegramIntegration = new TelegramIntegration(botToken, chatId);
    
    // Инициализируем интеграцию чат-бота с Telegram
    const chatbotTelegramIntegration = new ChatbotTelegramIntegration(telegramIntegration);
    
    // Инициализируем интеграцию с n8n вебхуком для ИИ
    const n8nWebhookUrl = 'https://creamusai.app.n8n.cloud/webhook/500f248a-cf02-4720-b6a8-4de8d23c5378';
    const n8nWebhookIntegration = new N8nWebhookIntegration(n8nWebhookUrl);
    
    // Создаем уникальный ID сессии для отслеживания истории сообщений
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Ограничение на количество сообщений в диалоге
    const MAX_MESSAGES = 6; // Максимальное количество сообщений от пользователя
    let messageCount = 0; // Счетчик сообщений
    
    // Флаг для определения, используем ли мы локальную базу знаний или ИИ через n8n
    const useAiThroughN8n = true; // Установите в true для использования n8n + ИИ
    // Создаем HTML-структуру для чат-бота
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-notification">1</span>
            </div>
            <div class="chatbot-box">
                <div class="chatbot-header">
                    <h3>Помощник</h3>
                    <button class="chatbot-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="chatbot-messages">
                    <div class="message bot-message">
                        Здравствуйте! Я виртуальный помощник Digital Expert. Чем могу помочь?
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Введите ваш вопрос..." id="chatbot-input-field">
                    <button id="chatbot-send"><i class="fas fa-paper-plane"></i></button>
                </div>
                <div class="chatbot-suggestions">
                    <button class="suggestion-btn">Сколько стоит сайт?</button>
                    <button class="suggestion-btn">Сроки разработки</button>
                    <button class="suggestion-btn">Какие услуги?</button>
                    <button class="suggestion-btn">Контакты</button>
                </div>
                <div class="chatbot-contact-buttons" style="display: none;">
                    <p>Хотите продолжить общение?</p>
                    <button class="contact-btn telegram-btn"><i class="fab fa-telegram"></i> Написать в Telegram</button>
                    <button class="contact-btn form-btn"><i class="fas fa-envelope"></i> Заполнить форму</button>
                    <button class="contact-btn phone-btn"><i class="fas fa-phone"></i> Позвонить</button>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем чат-бот на страницу
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);
    
    // Получаем элементы чат-бота
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    const chatbotNotification = document.querySelector('.chatbot-notification');
    
    // База знаний с ответами на часто задаваемые вопросы
    const knowledgeBase = {
        'привет': 'Здравствуйте! Чем могу помочь?',
        'здравствуйте': 'Здравствуйте! Чем могу помочь?',
        'сколько стоит сайт': 'Стоимость сайта зависит от типа и сложности проекта. Лендинг от 500€, бизнес-сайт от 800€, интернет-магазин от 1500€. Вы можете использовать калькулятор на сайте для предварительной оценки или связаться со мной для точного расчета.',
        'сроки': 'Сроки разработки: лендинг - 1-2 недели, бизнес-сайт - 2-3 недели, интернет-магазин - 3-5 недель. Сроки могут меняться в зависимости от сложности проекта и загруженности.',
        'сроки разработки': 'Сроки разработки: лендинг - 1-2 недели, бизнес-сайт - 2-3 недели, интернет-магазин - 3-5 недель. Сроки могут меняться в зависимости от сложности проекта и загруженности.',
        'какие услуги': 'Я предлагаю следующие услуги: создание сайтов (лендинги, бизнес-сайты, интернет-магазины), настройка рекламы (Google Ads, Facebook/Instagram Ads), автоматизация бизнес-процессов с помощью n8n и других инструментов.',
        'контакты': 'Вы можете связаться со мной по телефону: +372 5637 4348, по email: ads.n8n.dmitri@gmail.com или через Telegram: @bonez_mc187',
        'спасибо': 'Всегда рад помочь! Если у вас возникнут еще вопросы, обращайтесь.',
        'как заказать': 'Чтобы заказать разработку, заполните форму в разделе "Связаться со мной" или напишите мне в Telegram @bonez_mc187. Я свяжусь с вами для обсуждения деталей проекта.',
        'портфолио': 'Вы можете ознакомиться с моими работами в разделе "Портфолио" на сайте. Там представлены примеры различных проектов, которые я реализовал.',
        'гарантии': 'Я предоставляю гарантию на свои услуги в течение 3 месяцев после сдачи проекта. В этот период я бесплатно исправляю любые ошибки и недочеты, связанные с моей работой.'
    };
    
    // Функция для отправки сообщения от бота
    function sendBotMessage(message, useHtml = false) {
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message', 'bot-message');
        
        if (useHtml) {
            // Используем innerHTML для поддержки HTML-форматирования
            botMessageElement.innerHTML = message;
        } else {
            botMessageElement.textContent = message;
        }
        
        chatbotMessages.appendChild(botMessageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Добавляем сообщение в историю, если есть интеграция с Telegram
        if (useAiThroughN8n && chatbotTelegramIntegration) {
            // Удаляем HTML-теги для сохранения в истории
            const plainMessage = useHtml ? message.replace(/<[^>]*>/g, '') : message;
            chatbotTelegramIntegration.addMessageToHistory('assistant', plainMessage);
        }
        
        // Отслеживание события для Google Analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'chatbot_response',
                'chatbot_message': useHtml ? message.replace(/<[^>]*>/g, '') : message
            });
        }
    }
    
    // Функция для отправки сообщения от пользователя
    async function sendUserMessage(message) {
        // Увеличиваем счетчик сообщений
        messageCount++;
        
        // Добавляем сообщение пользователя в чат
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user-message');
        userMessageElement.textContent = message;
        chatbotMessages.appendChild(userMessageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Добавляем индикатор набора текста
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Отслеживание события для Google Analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'chatbot_question',
                'chatbot_message': message
            });
        }
        
        if (useAiThroughN8n) {
            try {
                // Добавляем сообщение в историю, если есть интеграция с Telegram
                if (chatbotTelegramIntegration) {
                    chatbotTelegramIntegration.addMessageToHistory('user', message);
                }
                
                // Отправляем сообщение на вебхук n8n для обработки через ИИ
                const response = await n8nWebhookIntegration.sendMessageToAI(message, sessionId);
                
                // Удаляем индикатор набора текста
                chatbotMessages.removeChild(typingIndicator);
                
                if (response.success) {
                    // Отправляем ответ от ИИ
                    sendBotMessage(response.message, true);
                    
                    // Добавляем ответ в историю, если есть интеграция с Telegram
                    if (chatbotTelegramIntegration) {
                        chatbotTelegramIntegration.addMessageToHistory('assistant', response.message.replace(/<[^>]*>/g, ''));
                    }
                    
                    // Проверяем, достигнут ли лимит сообщений
                    if (messageCount >= MAX_MESSAGES) {
                        // Показываем кнопки связи и скрываем поле ввода
                        document.querySelector('.chatbot-input').style.display = 'none';
                        document.querySelector('.chatbot-suggestions').style.display = 'none';
                        document.querySelector('.chatbot-contact-buttons').style.display = 'block';
                        
                        // Отправляем всю историю диалога в Telegram
                        if (chatbotTelegramIntegration) {
                            const dialogHistory = chatbotTelegramIntegration.getFormattedHistory();
                            const dialogMessage = `Диалог с пользователем (ID: ${sessionId}):\n\n${dialogHistory}`;
                            telegramIntegration.sendMessage(dialogMessage);
                        }
                        
                        // Добавляем финальное сообщение
                        setTimeout(() => {
                            sendBotMessage('Для продолжения общения и получения более детальной консультации, пожалуйста, выберите один из способов связи ниже.', true);
                        }, 1000);
                    }
                } else {
                    // Если не удалось получить ответ от ИИ, используем локальную базу знаний
                    const botResponse = getBotResponse(message) + '\n\n' + 
                                      '<i>Не удалось получить ответ от ИИ. ' + response.message + '</i>';
                    sendBotMessage(botResponse, true);
                    
                    // Попробуем отправить сообщение в Telegram в качестве запасного варианта
                    if (chatbotTelegramIntegration) {
                        chatbotTelegramIntegration.sendUserMessageToTelegram(message)
                            .then(success => {
                                console.log('Message sent to Telegram as fallback:', success);
                            })
                            .catch(error => {
                                console.error('Error sending message to Telegram as fallback:', error);
                            });
                    }
                }
            } catch (error) {
                console.error('Error processing message with AI:', error);
                
                // Удаляем индикатор набора текста
                chatbotMessages.removeChild(typingIndicator);
                
                // В случае ошибки используем локальную базу знаний
                const botResponse = getBotResponse(message) + '\n\n' + 
                                  '<i>Произошла ошибка при обработке сообщения. Используется локальная база знаний.</i>';
                sendBotMessage(botResponse, true);
                
                // Попробуем отправить сообщение в Telegram в качестве запасного варианта
                if (chatbotTelegramIntegration) {
                    chatbotTelegramIntegration.sendUserMessageToTelegram(message)
                        .then(success => {
                            console.log('Message sent to Telegram after error:', success);
                        })
                        .catch(telegramError => {
                            console.error('Error sending message to Telegram after AI error:', telegramError);
                        });
                }
            }
        } else {
            // Используем локальную базу знаний
            setTimeout(() => {
                // Удаляем индикатор набора текста
                chatbotMessages.removeChild(typingIndicator);
                
                const botResponse = getBotResponse(message);
                sendBotMessage(botResponse);
            }, 500);
        }
    }
    
    // Функция для получения ответа от бота
    function getBotResponse(message) {
        // Приводим сообщение к нижнему регистру для поиска
        const normalizedMessage = message.toLowerCase();
        
        // Проверяем наличие ключевых слов в сообщении
        for (const [key, response] of Object.entries(knowledgeBase)) {
            if (normalizedMessage.includes(key)) {
                return response;
            }
        }
        
        // Если не нашли совпадений, возвращаем стандартный ответ
        return 'Извините, я не могу ответить на этот вопрос. Пожалуйста, свяжитесь со мной напрямую через форму контактов или по телефону +372 5637 4348.';
    }
    
    // Обработчик нажатия на кнопку отправки сообщения
    chatbotSend.addEventListener('click', function() {
        const message = chatbotInput.value.trim();
        if (message) {
            sendUserMessage(message);
            chatbotInput.value = '';
        }
    });
    
    // Обработчик нажатия Enter в поле ввода
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) {
                sendUserMessage(message);
                chatbotInput.value = '';
            }
        }
    });
    
    // Обработчики для кнопок с предложенными вопросами
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.textContent.trim();
            sendUserMessage(message);
        });
    });
    
    // Обработчики для кнопок связи
    const telegramBtn = document.querySelector('.telegram-btn');
    const formBtn = document.querySelector('.form-btn');
    const phoneBtn = document.querySelector('.phone-btn');
    
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function() {
            // Открываем Telegram
            window.open('https://t.me/bonez_mc187', '_blank');
            
            // Отправляем уведомление в Telegram
            if (telegramIntegration) {
                telegramIntegration.sendMessage(`Пользователь с сайта перешел в Telegram для продолжения общения (ID сессии: ${sessionId})`);
            }
        });
    }
    
    if (formBtn) {
        formBtn.addEventListener('click', function() {
            // Прокручиваем страницу к форме обратной связи
            const contactSection = document.querySelector('#contacts');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                chatbotBox.classList.remove('active');
                
                // Фокусируемся на первом поле формы
                setTimeout(() => {
                    const nameField = document.querySelector('#name');
                    if (nameField) {
                        nameField.focus();
                    }
                }, 1000);
                
                // Добавляем информацию о сессии в скрытое поле формы
                // Создаем скрытое поле, если его нет
                let sessionIdField = document.querySelector('input[name="session_id"]');
                if (!sessionIdField) {
                    const contactForm = document.querySelector('#contactForm');
                    if (contactForm) {
                        sessionIdField = document.createElement('input');
                        sessionIdField.type = 'hidden';
                        sessionIdField.name = 'session_id';
                        contactForm.appendChild(sessionIdField);
                    }
                }
                
                if (sessionIdField) {
                    sessionIdField.value = sessionId;
                }
                
                // Отправляем уведомление в Telegram
                if (telegramIntegration) {
                    telegramIntegration.sendMessage(`Пользователь с сайта перешел к форме обратной связи (ID сессии: ${sessionId})`);
                }
            }
        });
    }
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            // Открываем ссылку на телефон
            window.location.href = 'tel:+37256374348';
            
            // Отправляем уведомление в Telegram
            if (telegramIntegration) {
                telegramIntegration.sendMessage(`Пользователь с сайта нажал кнопку звонка (ID сессии: ${sessionId})`);
            }
        });
    }
    
    // Обработчик нажатия на кнопку чат-бота
    chatbotToggle.addEventListener('click', function() {
        chatbotBox.classList.toggle('active');
        chatbotNotification.style.display = 'none';
        
        // Отслеживание события для Google Analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'chatbot_opened'
            });
        }
    });
    
    // Обработчик нажатия на кнопку закрытия чат-бота
    chatbotClose.addEventListener('click', function() {
        chatbotBox.classList.remove('active');
        
        // Отслеживание события для Google Analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'chatbot_closed'
            });
        }
    });
    
    // Автоматическое открытие чат-бота через 30 секунд после загрузки страницы
    setTimeout(() => {
        if (!chatbotBox.classList.contains('active')) {
            chatbotNotification.style.display = 'flex';
        }
    }, 30000);
});
