document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper slider
    const mainSlider = new Swiper('.main-slider', {
        // Optional parameters
        loop: true,
        speed: 1000,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        on: {
            slideChangeTransitionStart: function() {
                // Remove animation classes when slide changes
                document.querySelectorAll('.animated').forEach(element => {
                    element.classList.remove('fadeInDown', 'fadeInUp');
                    void element.offsetWidth; // Trigger reflow to restart animation
                });
            },
            slideChangeTransitionEnd: function() {
                // Add animation classes when slide transition ends
                const activeSlide = document.querySelector('.swiper-slide-active');
                if (activeSlide) {
                    activeSlide.querySelectorAll('.animated').forEach(element => {
                        const animation = element.getAttribute('data-animation');
                        if (animation) {
                            element.classList.add(animation);
                        }
                    });
                }
            },
            init: function() {
                // Initialize animations on first slide
                setTimeout(() => {
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) {
                        activeSlide.querySelectorAll('.animated').forEach(element => {
                            const animation = element.getAttribute('data-animation');
                            if (animation) {
                                element.classList.add(animation);
                            }
                        });
                    }
                }, 100);
            }
        }
    });
    
    // Mobile menu toggle
    const mobileButton = document.querySelector('.mobile-button');
    const mainNav = document.querySelector('#main-nav');
    
    if (mobileButton && mainNav) {
        mobileButton.addEventListener('click', function() {
            mobileButton.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('#main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileButton.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const siteHeader = document.querySelector('#site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            siteHeader.classList.add('fixed');
        } else {
            siteHeader.classList.remove('fixed');
        }
    });
    
    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightMenuItem() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('#menu a[href*=' + sectionId + ']').parentElement.classList.add('current-menu-item');
            } else {
                document.querySelector('#menu a[href*=' + sectionId + ']').parentElement.classList.remove('current-menu-item');
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenuItem);
    
    // Функция для отображения статуса формы
    function showFormStatus(status, message) {
        const formStatus = document.getElementById('formStatus');
        if (!formStatus) return;
        
        // Удаляем все классы статуса
        formStatus.classList.remove('loading', 'success', 'error');
        
        // Добавляем нужный класс и сообщение
        formStatus.classList.add(status);
        formStatus.textContent = message;
        
        // Скроллим к сообщению
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const sendToTelegram = document.getElementById('telegram')?.checked || false;
            
            // Form validation
            if (!name || !phone || !email || !message) {
                showFormStatus('error', 'Пожалуйста, заполните все поля формы');
                return;
            }
            
            // Show loading state
            showFormStatus('loading', 'Отправка сообщения...');
            
            if (sendToTelegram) {
                // Telegram Bot API settings
                const botToken = '6443641416:AAHuLALMAVVbM0pDZ7i0wbnSl9EPIyTl4q8'; // Ваш бот токен
                const chatId = '1393908924'; // Ваш ID чата
                
                // Создаем экземпляр класса TelegramIntegration
                const telegramBot = new TelegramIntegration(botToken, chatId);
                
                // Формируем данные для отправки
                const formData = {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                };
                
                // Форматируем и отправляем сообщение
                const formattedMessage = telegramBot.formatRequestMessage(formData);
                
                telegramBot.sendMessage(formattedMessage)
                    .then(success => {
                        if (success) {
                            // Успешная отправка
                            showFormStatus('success', 'Спасибо! Ваше сообщение успешно отправлено.');
                            contactForm.reset();
                        } else {
                            // Ошибка отправки
                            showFormStatus('error', 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
                        }
                    })
                    .catch(error => {
                        console.error('Ошибка при отправке формы:', error);
                        showFormStatus('error', 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
                    });
            } else {
                // Если отправка в Telegram отключена, просто показываем успешное сообщение
                showFormStatus('success', 'Спасибо! Ваше сообщение успешно отправлено.');
                contactForm.reset();
            }
        });
    }
});
