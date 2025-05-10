// Скрипт для фильтрации портфолио
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки фильтров и элементы портфолио
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Добавляем обработчики событий для кнопок фильтров
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем класс active со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс active на нажатую кнопку
            this.classList.add('active');
            
            // Получаем значение фильтра из атрибута data-filter
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтруем элементы портфолио
            filterPortfolioItems(filterValue);
        });
    });
    
    // Функция для фильтрации элементов портфолио
    function filterPortfolioItems(filter) {
        portfolioItems.forEach(item => {
            // Получаем категорию элемента из атрибута data-category
            const category = item.getAttribute('data-category');
            
            // Если фильтр "all" или категория соответствует фильтру
            if (filter === 'all' || filter === category) {
                // Показываем элемент с анимацией
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.classList.add('fade-in');
                    item.classList.remove('fade-out');
                }, 50);
            } else {
                // Скрываем элемент с анимацией
                item.classList.add('fade-out');
                item.classList.remove('fade-in');
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 500);
            }
        });
    }
    
    // Инициализация: показываем все элементы
    filterPortfolioItems('all');
});
