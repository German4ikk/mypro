// Калькулятор стоимости услуг
document.addEventListener('DOMContentLoaded', function() {
    // Базовые цены для различных типов услуг (более доступные)
    const basePrices = {
        landing: 299,
        business: 499,
        ecommerce: 899,
        corporate: 699,
        ads: 199,
        automation: 399
    };
    
    // Коэффициенты для типов дизайна
    const designMultipliers = {
        template: 1,
        custom: 1.5,
        premium: 2
    };
    
    // Дополнительные функции и их стоимость (более доступные)
    const featurePrices = {
        seo: 99,
        analytics: 49,
        content: 149,
        multilingual: 129,
        integration: 179
    };
    
    // Коэффициенты срочности
    const urgencyMultipliers = {
        normal: 1,
        fast: 1.3,
        urgent: 1.6
    };
    
    // Получаем элементы формы
    const calculator = document.getElementById('price-calculator');
    const serviceTypeSelect = document.getElementById('service-type');
    const designTypeSelect = document.getElementById('design-type');
    const featureCheckboxes = document.querySelectorAll('input[name="features"]');
    const urgencySelect = document.getElementById('urgency');
    const calculateButton = document.getElementById('calculate-price');
    const requestQuoteButton = document.getElementById('request-quote');
    const calculatedPriceElement = document.getElementById('calculated-price');
    
    // Функция расчета стоимости
    function calculatePrice() {
        // Получаем базовую цену для выбранного типа услуги
        const basePrice = basePrices[serviceTypeSelect.value];
        
        // Применяем коэффициент дизайна
        const designMultiplier = designMultipliers[designTypeSelect.value];
        
        // Считаем стоимость дополнительных функций
        let featuresPrice = 0;
        featureCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                featuresPrice += featurePrices[checkbox.value];
            }
        });
        
        // Применяем коэффициент срочности
        const urgencyMultiplier = urgencyMultipliers[urgencySelect.value];
        
        // Рассчитываем итоговую стоимость
        const totalPrice = Math.round((basePrice * designMultiplier + featuresPrice) * urgencyMultiplier);
        
        // Отображаем результат
        calculatedPriceElement.textContent = `${totalPrice} €`;
        
        // Анимация изменения цены
        calculatedPriceElement.classList.add('price-updated');
        setTimeout(() => {
            calculatedPriceElement.classList.remove('price-updated');
        }, 500);
        
        // Отслеживание события для Google Analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'price_calculated',
                'calculated_price': totalPrice,
                'service_type': serviceTypeSelect.value,
                'design_type': designTypeSelect.value,
                'urgency': urgencySelect.value
            });
        }
        
        return totalPrice;
    }
    
    // Обработчик нажатия на кнопку "Рассчитать"
    calculateButton.addEventListener('click', function(e) {
        e.preventDefault();
        calculatePrice();
    });
    
    // Обработчик нажатия на кнопку "Запросить точную стоимость"
    requestQuoteButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Рассчитываем цену
        const price = calculatePrice();
        
        // Собираем данные о выбранных опциях
        const serviceType = serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text;
        const designType = designTypeSelect.options[designTypeSelect.selectedIndex].text;
        const urgency = urgencySelect.options[urgencySelect.selectedIndex].text;
        
        // Собираем выбранные дополнительные функции
        let selectedFeatures = [];
        featureCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedFeatures.push(checkbox.parentElement.textContent.trim());
            }
        });
        
        // Формируем сообщение для формы контактов
        const message = `Запрос стоимости: ${serviceType}, ${designType}, срочность: ${urgency}` + 
                        (selectedFeatures.length > 0 ? `, дополнительно: ${selectedFeatures.join(', ')}` : '') +
                        `. Расчетная стоимость: ${price} €`;
        
        // Прокручиваем к форме контактов
        const contactsSection = document.getElementById('contacts');
        const messageTextarea = document.querySelector('#contactForm textarea[name="message"]');
        
        if (contactsSection && messageTextarea) {
            // Заполняем поле сообщения
            messageTextarea.value = message;
            
            // Прокручиваем к форме контактов
            contactsSection.scrollIntoView({ behavior: 'smooth' });
            
            // Фокусируемся на первом поле формы
            const firstInput = document.querySelector('#contactForm input[name="name"]');
            if (firstInput) {
                setTimeout(() => {
                    firstInput.focus();
                }, 1000);
            }
            
            // Отслеживание события для Google Analytics
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'quote_requested',
                    'calculated_price': price,
                    'service_type': serviceTypeSelect.value,
                    'design_type': designTypeSelect.value,
                    'urgency': urgencySelect.value
                });
            }
        }
    });
    
    // Автоматический расчет при изменении любого параметра
    serviceTypeSelect.addEventListener('change', calculatePrice);
    designTypeSelect.addEventListener('change', calculatePrice);
    urgencySelect.addEventListener('change', calculatePrice);
    
    featureCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculatePrice);
    });
    
    // Инициализация с начальным расчетом
    calculatePrice();
});
