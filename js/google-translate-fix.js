/**
 * Скрипт для исправления проблем с Google Translate
 */
document.addEventListener('DOMContentLoaded', function() {
    // Функция для исправления верхней панели Google Translate
    function fixGoogleTranslate() {
        // Удаляем атрибут style="top: 40px" у body, который добавляет Google Translate
        if (document.body.style.top) {
            document.body.style.top = '';
        }
        
        // Скрываем верхнюю панель Google Translate
        const translateBanner = document.querySelector('.skiptranslate');
        if (translateBanner) {
            translateBanner.style.display = 'none';
        }
        
        // Добавляем класс для скрытия Google атрибуции
        document.body.classList.add('notranslate-fixed');
        
        // Исправляем сдвиг контента
        const goog = document.querySelector('html.translated-ltr');
        if (goog) {
            goog.style.cssText = "position: static !important; top: 0 !important; margin-top: 0 !important;";
        }
        
        // Исправляем скрытие чекбоксов
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.style.opacity = '1';
            checkbox.style.position = 'static';
        });
    }
    
    // Запускаем исправление через небольшую задержку после загрузки страницы
    setTimeout(fixGoogleTranslate, 1000);
    
    // Запускаем исправление еще несколько раз с интервалом
    setTimeout(fixGoogleTranslate, 3000);
    setTimeout(fixGoogleTranslate, 5000);
    
    // Запускаем исправление при изменении языка
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Проверяем, добавлена ли Google панель
                if (document.querySelector('.skiptranslate')) {
                    fixGoogleTranslate();
                }
            }
            
            // Проверяем изменения атрибутов
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                fixGoogleTranslate();
            }
        });
    });
    
    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    observer.observe(document.documentElement, { attributes: true });
    
    // Также исправляем при клике на элемент Google Translate
    document.addEventListener('click', function(e) {
        // Запускаем исправление только при клике на элементы Google Translate
        if (e.target.closest('#google_translate_element') || e.target.closest('.goog-te-menu-frame')) {
            setTimeout(fixGoogleTranslate, 500);
        }
    });
    
    // Исправляем при изменении размера окна
    window.addEventListener('resize', fixGoogleTranslate);
    
    // Добавляем атрибуты hreflang для SEO
    const head = document.querySelector('head');
    const currentUrl = window.location.href.split('?')[0]; // Убираем параметры запроса
    
    // Добавляем hreflang для основных языков
    const languages = ['ru', 'en', 'et'];
    languages.forEach(lang => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = currentUrl + (currentUrl.endsWith('/') ? '' : '/') + (lang === 'ru' ? '' : lang + '/');
        head.appendChild(link);
    });
});
