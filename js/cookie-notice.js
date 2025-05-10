/**
 * Скрипт для управления уведомлением о файлах cookie
 */
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, принял ли пользователь файлы cookie
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Если пользователь еще не принял файлы cookie, показываем уведомление
        setTimeout(function() {
            document.getElementById('cookie-notice').classList.add('show');
        }, 1000); // Показываем уведомление через 1 секунду после загрузки страницы
    }
    
    // Обработчик нажатия на кнопку "Принять все"
    document.getElementById('accept-cookies').addEventListener('click', function() {
        acceptAllCookies();
    });
    
    // Обработчик нажатия на кнопку "Настройки"
    document.getElementById('cookie-settings').addEventListener('click', function() {
        // Здесь можно добавить открытие модального окна с настройками файлов cookie
        // Для простоты сейчас просто перенаправляем на страницу с политикой cookie
        window.location.href = 'cookie-policy.html';
    });
});

/**
 * Функция для принятия всех файлов cookie
 */
function acceptAllCookies() {
    // Сохраняем информацию о том, что пользователь принял файлы cookie
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    
    // Скрываем уведомление
    document.getElementById('cookie-notice').classList.remove('show');
    
    // Отправляем событие в Google Analytics (если используется)
    if (typeof gtag === 'function') {
        gtag('event', 'cookie_consent', {
            'event_category': 'consent',
            'event_label': 'accepted'
        });
    }
    
    // Активируем все файлы cookie (здесь можно добавить дополнительную логику)
    console.log('Все файлы cookie приняты');
}
