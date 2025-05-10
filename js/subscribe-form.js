// Обработка формы подписки
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const email = subscribeForm.querySelector('input[name="email"]').value;
            
            // Проверяем валидность email
            if (!validateEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Проверяем согласие с политикой
            const privacyCheckbox = subscribeForm.querySelector('input[type="checkbox"]');
            if (!privacyCheckbox.checked) {
                showNotification('Необходимо согласиться с политикой конфиденциальности', 'error');
                return;
            }
            
            // Отправляем данные в Telegram
            const success = await sendSubscriptionToTelegram(email);
            
            if (success) {
                // Очищаем форму
                subscribeForm.reset();
                
                // Показываем уведомление об успехе
                showNotification('Спасибо за подписку! Вы будете получать наши новости.', 'success');
            } else {
                // Показываем уведомление об ошибке
                showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.', 'error');
            }
        });
    }
    
    // Функция для отправки данных в Telegram
    async function sendSubscriptionToTelegram(email) {
        try {
            // Используем тот же бот, что и для формы обратной связи
            const botToken = '6443641416:AAHuLALMAVVbM0pDZ7i0wbnSl9EPIyTl4q8';
            const chatId = '1393908924';
            const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            // Форматируем сообщение
            const message = `
<b>📧 Новая подписка на рассылку</b>

<b>Email:</b> ${email}
<b>Дата:</b> ${new Date().toLocaleString()}

<i>Отправлено с сайта Digital Expert</i>
            `;
            
            // Отправляем запрос
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            const data = await response.json();
            return data.ok;
        } catch (error) {
            console.error('Ошибка при отправке подписки в Telegram:', error);
            return false;
        }
    }
    
    // Функция для валидации email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Функция для показа уведомлений
    function showNotification(message, type) {
        // Проверяем, существует ли контейнер для уведомлений
        let notificationContainer = document.querySelector('.notification-container');
        
        // Если контейнера нет, создаем его
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Добавляем уведомление в контейнер
        notificationContainer.appendChild(notification);
        
        // Удаляем уведомление через 5 секунд
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
});
