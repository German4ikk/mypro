// Скрипт для кнопки "Наверх" и анимаций при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "Наверх"
    const backToTopButton = document.getElementById('back-to-top');
    
    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Вызов функции для анимаций при прокрутке
        animateOnScroll();
    });
    
    // Плавная прокрутка наверх при клике на кнопку
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Отслеживание события для Google Analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'button_click',
                'button_text': 'Наверх',
                'button_location': 'fixed'
            });
        }
    });
    
    // Плавная прокрутка для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем кнопку "Наверх" и пустые якоря
            if (href === '#' || this.id === 'back-to-top') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 100; // Учитываем высоту шапки
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Отслеживание события для Google Analytics
                if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'navigation_click',
                        'navigation_target': href,
                        'navigation_text': this.textContent.trim()
                    });
                }
            }
        });
    });
    
    // Анимации при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Элемент появляется, когда он находится в пределах видимой области
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Добавляем классы анимации к существующим элементам
    function initAnimations() {
        // Заголовки секций
        document.querySelectorAll('section h2').forEach((element, index) => {
            element.classList.add('fade-in');
            // Небольшая задержка для каждого последующего элемента
            element.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Элементы портфолио - чередуем анимации слева и справа
        document.querySelectorAll('.portfolio-item').forEach((element, index) => {
            if (index % 2 === 0) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in-right');
            }
            element.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Отзывы клиентов
        document.querySelectorAll('.testimonial-item').forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Контактная информация
        document.querySelectorAll('.contact-item').forEach((element, index) => {
            element.classList.add('fade-in-left');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Запускаем анимацию при загрузке страницы
        setTimeout(animateOnScroll, 300);
    }
    
    // Инициализация анимаций
    initAnimations();
});
