/**
 * Многоязычность для сайта Digital Expert
 * Поддерживаемые языки: русский (ru), эстонский (et), английский (en)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий язык из localStorage или устанавливаем русский по умолчанию
    let currentLanguage = localStorage.getItem('language') || 'ru';

    // Объект с переводами
    const translations = {
        'ru': {
            // Верхняя панель
            'top_address': 'Таллин, Эстония',
            'top_hours': 'Пн-Сб: 9:00-18:00',
            'top_socials': 'Мы в соцсетях:',
            // Кнопка в шапке
            'header_consultation': 'Заказать консультацию',
            // Навигация
            'nav_home': 'Главная',
            'nav_services': 'Услуги',
            'nav_portfolio': 'Портфолио',
            'nav_testimonials': 'Отзывы',
            'nav_contact': 'Контакты',
            // Слайдер
            'slider1_title': 'Привет! Я — digital-специалист',
            'slider1_text': 'Создаю сайты, запускаю рекламу и автоматизирую бизнес-процессы',
            'slider_contact': 'Связаться',
            'slider2_title': 'Профессиональная веб-разработка',
            'slider2_text': 'Создание современных и адаптивных сайтов для вашего бизнеса',
            'slider_services': 'Мои услуги',
            'slider3_title': 'Эффективная реклама',
            'slider3_text': 'Настройка рекламных кампаний с высокой конверсией',
            'slider_portfolio': 'Портфолио',
            // Секция услуг
            'services_title': 'Создание сайтов и реклама в Таллине',
            'services_intro': 'Мы предлагаем профессиональные услуги по созданию сайтов, настройке рекламы и автоматизации бизнеса в Таллине. Наши решения адаптированы под ваш бизнес и оптимизированы для SEO.',
            'service_websites': 'Сайты',
            'service_websites_desc': 'Лендинги, визитки, интернет-магазины',
            'service_websites_details': 'Создаём адаптивные сайты, которые идеально отображаются на любых устройствах. От одностраничных лендингов до интернет-магазинов с интеграцией CRM и платёжных систем.',
            'service_ads': 'Реклама',
            'service_ads_desc': 'Facebook, Instagram, TikTok, Google',
            'service_ads_details': 'Настраиваем таргетированную и контекстную рекламу с высокой конверсией. Помогаем привлекать клиентов в Таллине и за его пределами.',
            'service_automation': 'Автоматизация',
            'service_automation_desc': 'n8n, Telegram-боты, CRM, интеграции',
            'service_automation_details': 'Автоматизируем бизнес-процессы с помощью n8n, Telegram-ботов и интеграций с CRM, чтобы вы экономили время и ресурсы.',
            'see_portfolio': 'Смотреть примеры',
            // Таймлайн
            'timeline_title': 'Как мы работаем',
            'timeline_step1_title': 'Консультация',
            'timeline_step1_text': 'Обсуждаем ваши цели, задачи и ожидания от проекта. Определяем основные требования и функционал.',
            'timeline_step2_title': 'Планирование',
            'timeline_step2_text': 'Составляем детальный план работ, определяем сроки и бюджет. Согласовываем техническое задание.',
            'timeline_step3_title': 'Дизайн',
            'timeline_step3_text': 'Разрабатываем дизайн-концепцию, учитывая ваши предпочтения и современные тренды. Создаем прототипы и макеты.',
            'timeline_step4_title': 'Разработка',
            'timeline_step4_text': 'Реализуем проект с использованием современных технологий. Регулярно предоставляем отчеты о ходе работ.',
            'timeline_step5_title': 'Тестирование',
            'timeline_step5_text': 'Проводим тщательное тестирование на разных устройствах и браузерах. Исправляем все обнаруженные ошибки.',
            'timeline_step6_title': 'Запуск и поддержка',
            'timeline_step6_text': 'Запускаем проект и проводим обучение по его использованию. Обеспечиваем техническую поддержку и развитие проекта.',
            // Секция портфолио
            'portfolio_title': 'Портфолио',
            'portfolio_all': 'Все проекты',
            'portfolio_websites': 'Сайты',
            'portfolio_ads': 'Реклама',
            'portfolio_automation': 'Автоматизация',
            'portfolio_category_website': 'Сайт',
            'portfolio_category_ads': 'Реклама',
            'portfolio_category_automation': 'Автоматизация',
            'portfolio_item1_title': 'Сайт для мастера по ремонту',
            'portfolio_item1_desc': 'Разработка адаптивного лендинга с формой заявки и интеграцией с CRM',
            'portfolio_item2_title': 'Кампания в Instagram Ads',
            'portfolio_item2_desc': 'Настройка таргетированной рекламы с конверсией 12% и ROI 320%',
            'portfolio_item3_title': 'Автоматизация бизнес-процессов',
            'portfolio_item3_desc': 'Разработка системы автоматизации с использованием n8n и Telegram API',
            'portfolio_item4_title': 'Интернет-магазин косметики',
            'portfolio_item4_desc': 'Разработка магазина с интеграцией платежной системы и системой управления заказами',
            'portfolio_item5_title': 'Контекстная реклама в Google',
            'portfolio_item5_desc': 'Настройка поисковой рекламы с высоким CTR и низкой стоимостью клика',
            'portfolio_item6_title': 'Telegram бот для онлайн-школы',
            'portfolio_item6_desc': 'Разработка бота с интеграцией с CRM и системой оплаты',
            // Секция отзывов
            'testimonials_title': 'Отзывы клиентов',
            'testimonial1_text': '"Сайт получился именно таким, как я хотел — чистый, современный и без лишнего. Всё было сделано вовремя, и без лишних вопросов."',
            'testimonial1_author': 'Andres Kallaste',
            'testimonial1_position': 'Владелец студии дизайна, Таллин',
            'testimonial2_text': '"После запуска рекламы в Instagram мы получили поток заявок уже в первые дни. Чёткая работа, понятные отчёты — приятно работать."',
            'testimonial2_author': 'Maria Lepp',
            'testimonial2_position': 'Коуч и консультант, Нарва',
            // Калькулятор
            'calculator_title': 'Калькулятор стоимости',
            'calculator_intro': 'Рассчитайте предварительную стоимость вашего проекта. Мы предлагаем доступные цены ниже рыночных. Всегда можно обсудить индивидуальные условия и найти подходящее решение для вашего бюджета.',
            'calculator_service_type': 'Тип услуги:',
            'calculator_service_landing': 'Лендинг (одностраничный сайт)',
            'calculator_service_business': 'Бизнес-сайт (до 5 страниц)',
            'calculator_service_ecommerce': 'Интернет-магазин',
            'calculator_service_corporate': 'Корпоративный сайт',
            'calculator_service_ads': 'Настройка рекламы',
            'calculator_service_automation': 'Автоматизация бизнес-процессов',
            'calculator_design_type': 'Дизайн:',
            'calculator_design_template': 'Шаблонный',
            'calculator_design_custom': 'Индивидуальный',
            'calculator_design_premium': 'Премиум',
            'calculator_features': 'Дополнительные функции:',
            'calculator_feature_seo': 'SEO-оптимизация',
            'calculator_feature_analytics': 'Аналитика',
            'calculator_feature_content': 'Наполнение контентом',
            'calculator_feature_multilingual': 'Многоязычность',
            'calculator_feature_integration': 'Интеграция с CRM',
            'calculator_deadline': 'Срочность:',
            'calculator_deadline_normal': 'Стандартная (2-3 недели)',
            'calculator_deadline_fast': 'Ускоренная (1-2 недели)',
            'calculator_deadline_urgent': 'Срочная (до 1 недели)',
            'calculator_price': 'Примерная стоимость:',
            'calculator_note': 'Это предварительная оценка. <strong>Свяжитесь со мной, и мы всегда сможем договориться об индивидуальных условиях!</strong> Я готов подобрать решение, которое подойдет именно вам.',
            'calculator_calculate': 'Рассчитать',
            'calculator_request': 'Запросить точную стоимость',
            // Контакты
            'contact_title': 'Связаться со мной',
            'contact_subtitle': 'Готовы обсудить ваш проект? Я предлагаю бесплатную консультацию и индивидуальный подход к каждому клиенту. Выберите удобный способ связи:',
            'contact_name': 'Ваше имя',
            'contact_phone': 'Ваш телефон',
            'contact_email': 'Ваш email',
            'contact_message': 'Ваше сообщение',
            'contact_submit': 'Отправить',
            'contact_telegram': 'Заявка будет отправлена в Telegram',
            'contact_privacy': 'согласен с',
            'contact_privacy_link': 'политикой конфиденциальности',
            // Подписка
            'subscribe_title': 'Подпишитесь на наши новости',
            'subscribe_subtitle': 'Получайте полезные статьи, советы по развитию бизнеса и эксклюзивные предложения',
            'subscribe_placeholder': 'Ваш email',
            'subscribe_button': 'Подписаться',
            // Блог
            'blog_title': 'Блог',
            'blog_subtitle': 'Интересные статьи из мира IT и искусственного интеллекта',
            'blog_loading': 'Загрузка последних статей...',
            'blog_post1_title': 'Как настроить рекламу в Instagram для бизнеса в Таллине',
            'blog_post1_desc': 'В этой статье мы разберём, как запустить эффективную рекламу в Instagram для вашего бизнеса в Эстонии...',
            'blog_read_more': 'Читать далее',
            // Футер
            'footer_copyright': '© 2025 Digital Expert. Все права защищены.',
            'footer_tagline': 'Сделано с умом и руками.',
            // Cookie уведомление
            'cookie_message': 'Мы используем файлы cookie для улучшения вашего опыта на нашем сайте. Нажимая «Принять все», вы соглашаетесь с использованием всех файлов cookie. Подробнее в нашей <a href="cookie-policy.html" target="_blank">политике использования файлов cookie</a> и <a href="privacy-policy.html" target="_blank">политике конфиденциальности</a>.',
            'cookie_settings': 'Настройки',
            'cookie_accept': 'Принять все',
            // Чат-бот
            'chatbot_title': 'Помощник',
            'chatbot_greeting': 'Здравствуйте! Я виртуальный помощник Digital Expert. Чем могу помочь?',
            'chatbot_placeholder': 'Введите ваш вопрос...',
            'chatbot_suggestion1': 'Сколько стоит сайт?',
            'chatbot_suggestion2': 'Сроки разработки',
            'chatbot_suggestion3': 'Какие услуги?',
            'chatbot_suggestion4': 'Контакты'
        },
        'et': {
            // Верхняя панель
            'top_address': 'Tallinn, Eesti',
            'top_hours': 'E-L: 9:00-18:00',
            'top_socials': 'Oleme sotsiaalmeedias:',
            // Кнопка в шапке
            'header_consultation': 'Telli konsultatsioon',
            // Навигация
            'nav_home': 'Avaleht',
            'nav_services': 'Teenused',
            'nav_portfolio': 'Portfoolio',
            'nav_testimonials': 'Arvustused',
            'nav_contact': 'Kontakt',
            // Слайдер
            'slider1_title': 'Tere! Olen digispetsialist',
            'slider1_text': 'Loon veebisaite, käivitan reklaame ja automatiseerin äriprotsesse',
            'slider_contact': 'Võta ühendust',
            'slider2_title': 'Professionaalne veebiarendus',
            'slider2_text': 'Kaasaegsete ja kohanduvate veebisaitide loomine teie ettevõttele',
            'slider_services': 'Minu teenused',
            'slider3_title': 'Tõhus reklaam',
            'slider3_text': 'Kõrge konversiooniga reklaamikampaaniate seadistamine',
            'slider_portfolio': 'Portfoolio',
            // Секция услуг
            'services_title': 'Veebisaitide loomine ja reklaam Tallinnas',
            'services_intro': 'Pakume professionaalseid teenuseid veebisaitide loomiseks, reklaami seadistamiseks ja äriprotsesside automatiseerimiseks Tallinnas. Meie lahendused on kohandatud teie ettevõttele ja optimeeritud SEO jaoks.',
            'service_websites': 'Veebisaidid',
            'service_websites_desc': 'Maandumislehed, visiitkaardid, e-poed',
            'service_websites_details': 'Loome kohanduvaid veebisaite, mis kuvatakse suurepäraselt kõigil seadmetel. Alates üheleheküljelistest maandumislehtedest kuni e-poodideni, mis on integreeritud CRM-i ja maksete süsteemidega.',
            'service_ads': 'Reklaam',
            'service_ads_desc': 'Facebook, Instagram, TikTok, Google',
            'service_ads_details': 'Seadistame siht- ja kontekstreklaame kõrge konversioonimääraga. Aitame meelitada kliente Tallinnas ja mujal.',
            'service_automation': 'Automatiseerimine',
            'service_automation_desc': 'n8n, Telegrami botid, CRM, integratsioonid',
            'service_automation_details': 'Automatiseerime äriprotsesse n8n, Telegrami botide ja CRM-i integratsioonide abil, et säästa teie aega ja ressursse.',
            'see_portfolio': 'Vaata näiteid',
            // Таймлайн
            'timeline_title': 'Kuidas me töötame',
            'timeline_step1_title': 'Konsultatsioon',
            'timeline_step1_text': 'Arutame teie eesmärke, ülesandeid ja ootusi projektile. Määrame kindlaks peamised nõuded ja funktsionaalsuse.',
            'timeline_step2_title': 'Planeerimine',
            'timeline_step2_text': 'Koostame üksikasjaliku tööplaani, määrame tähtajad ja eelarve. Kooskõlastame tehnilise ülesande.',
            'timeline_step3_title': 'Disain',
            'timeline_step3_text': 'Töötame välja disainikontseptsiooni, arvestades teie eelistusi ja kaasaegseid trende. Loome prototüüpe ja makette.',
            'timeline_step4_title': 'Arendus',
            'timeline_step4_text': 'Teostame projekti, kasutades kaasaegseid tehnoloogiaid. Esitame regulaarselt aruandeid töö edenemise kohta.',
            'timeline_step5_title': 'Testimine',
            'timeline_step5_text': 'Teostame põhjaliku testimise erinevatel seadmetel ja brauserites. Parandame kõik avastatud vead.',
            'timeline_step6_title': 'Käivitamine ja tugi',
            'timeline_step6_text': 'Käivitame projekti ja korraldame selle kasutamise koolituse. Pakume tehnilist tuge ja projekti arendamist.',
            // Секция портфолио
            'portfolio_title': 'Portfoolio',
            'portfolio_all': 'Kõik projektid',
            'portfolio_websites': 'Veebisaidid',
            'portfolio_ads': 'Reklaam',
            'portfolio_automation': 'Automatiseerimine',
            'portfolio_category_website': 'Veebileht',
            'portfolio_category_ads': 'Reklaam',
            'portfolio_category_automation': 'Automatiseerimine',
            'portfolio_item1_title': 'Veebileht remondimeistrile',
            'portfolio_item1_desc': 'Kohanduva maandumislehe arendamine taotlusvormi ja CRM integratsiooniga',
            'portfolio_item2_title': 'Kampaania Instagram Ads’is',
            'portfolio_item2_desc': 'Sihtreklaami seadistamine 12% konversiooni ja 320% ROI-ga',
            'portfolio_item3_title': 'Äriprotsesside automatiseerimine',
            'portfolio_item3_desc': 'Automatiseerimissüsteemi arendamine, kasutades n8n ja Telegram API',
            'portfolio_item4_title': 'Kosmeetika veebipood',
            'portfolio_item4_desc': 'Poe arendamine maksete süsteemi ja tellimuste haldussüsteemi integratsiooniga',
            'portfolio_item5_title': 'Kontekstreklaam Google’is',
            'portfolio_item5_desc': 'Otsingureklaami seadistamine kõrge CTR-i ja madala klikihinnaga',
            'portfolio_item6_title': 'Telegrami bot veebikoolile',
            'portfolio_item6_desc': 'Boti arendamine CRM ja maksesüsteemi integratsiooniga',
            // Секция отзывов
            'testimonials_title': 'Klientide arvustused',
            'testimonial1_text': '"Veebileht tuli täpselt selline, nagu soovisin — puhas, kaasaegne ja ilma liigseteta. Kõik tehti õigeaegselt ja ilma tarbetute küsimusteta."',
            'testimonial1_author': 'Andres Kallaste',
            'testimonial1_position': 'Disainistuudio omanik, Tallinn',
            'testimonial2_text': '"Pärast Instagrami reklaami käivitamist saime juba esimestel päevadel palju taotlusi. Selge töö, arusaadavad aruanded — meeldiv koostöö."',
            'testimonial2_author': 'Maria Lepp',
            'testimonial2_position': 'Coach ja konsultant, Narva',
            // Калькулятор
            'calculator_title': 'Hinnakalkulaator',
            'calculator_intro': 'Arvutage oma projekti esialgne maksumus. Pakume taskukohaseid hindu, mis on turuhindadest madalamad. Alati saab arutada individuaalseid tingimusi ja leida teie eelarvele sobiv lahendus.',
            'calculator_service_type': 'Teenuse tüüp:',
            'calculator_service_landing': 'Maandumisleht (üheleheküljeline sait)',
            'calculator_service_business': 'Ärisait (kuni 5 lehekülge)',
            'calculator_service_ecommerce': 'Veebipood',
            'calculator_service_corporate': 'Ettevõtte sait',
            'calculator_service_ads': 'Reklaami seadistamine',
            'calculator_service_automation': 'Äriprotsesside automatiseerimine',
            'calculator_design_type': 'Disain:',
            'calculator_design_template': 'Mallipõhine',
            'calculator_design_custom': 'Individuaalne',
            'calculator_design_premium': 'Premium',
            'calculator_features': 'Lisafunktsioonid:',
            'calculator_feature_seo': 'SEO optimeerimine',
            'calculator_feature_analytics': 'Analüütika',
            'calculator_feature_content': 'Sisu täitmine',
            'calculator_feature_multilingual': 'Mitmekeelsus',
            'calculator_feature_integration': 'CRM integratsioon',
            'calculator_deadline': 'Kiirus:',
            'calculator_deadline_normal': 'Standardne (2-3 nädalat)',
            'calculator_deadline_fast': 'Kiirendatud (1-2 nädalat)',
            'calculator_deadline_urgent': 'Kiire (kuni 1 nädal)',
            'calculator_price': 'Ligikaudne maksumus:',
            'calculator_note': 'See on esialgne hinnang. <strong>Võtke minuga ühendust, ja me leiame alati kokkuleppe individuaalsetel tingimustel!</strong> Olen valmis pakkuma just teile sobivat lahendust.',
            'calculator_calculate': 'Arvuta',
            'calculator_request': 'Küsi täpset hinda',
            // Контакты
            'contact_title': 'Võta minuga ühendust',
            'contact_subtitle': 'Kas olete valmis oma projekti arutama? Pakun tasuta konsultatsiooni ja individuaalset lähenemist igale kliendile. Valige mugav suhtlusviis:',
            'contact_name': 'Teie nimi',
            'contact_phone': 'Teie telefon',
            'contact_email': 'Teie e-post',
            'contact_message': 'Teie sõnum',
            'contact_submit': 'Saada',
            'contact_telegram': 'Taotlus saadetakse Telegrami',
            'contact_privacy': 'Nõustun',
            'contact_privacy_link': 'privaatsuspoliitikaga',
            // Подписка
            'subscribe_title': 'Telli meie uudised',
            'subscribe_subtitle': 'Saate kasulikke artikleid, äriarendamise näpunäiteid ja eksklusiivseid pakkumisi',
            'subscribe_placeholder': 'Teie e-post',
            'subscribe_button': 'Telli',
            // Блог
            'blog_title': 'Blogi',
            'blog_subtitle': 'Huvitavad artiklid IT ja tehisintellekti maailmast',
            'blog_loading': 'Viimaste artiklite laadimine...',
            'blog_post1_title': 'Kuidas seadistada Instagrami reklaami Tallinnas asuvale ettevõttele',
            'blog_post1_desc': 'Selles artiklis uurime, kuidas käivitada tõhus Instagrami reklaam teie Eestis asuvale ettevõttele...',
            'blog_read_more': 'Loe edasi',
            // Футер
            'footer_copyright': '© 2025 Digital Expert. Kõik õigused kaitstud.',
            'footer_tagline': 'Tehtud mõistuse ja kätega.',
            // Cookie уведомление
            'cookie_message': 'Me kasutame küpsiseid, et parandada teie kogemust meie veebisaidil. Klõpsates nuppu „Nõustu kõigega“, nõustute kõigi küpsiste kasutamisega. Lisateavet leiate meie <a href="cookie-policy.html" target="_blank">küpsiste poliitikast</a> ja <a href="privacy-policy.html" target="_blank">privaatsuspoliitikast</a>.',
            'cookie_settings': 'Seaded',
            'cookie_accept': 'Nõustu kõigega',
            // Чат-бот
            'chatbot_title': 'Abiline',
            'chatbot_greeting': 'Tere! Olen Digital Experti virtuaalne assistent. Kuidas saan teid aidata?',
            'chatbot_placeholder': 'Sisestage oma küsimus...',
            'chatbot_suggestion1': 'Kui palju maksab veebisait?',
            'chatbot_suggestion2': 'Arenduse tähtajad',
            'chatbot_suggestion3': 'Millised teenused?',
            'chatbot_suggestion4': 'Kontaktid'
        },
        'en': {
            // Верхняя панель
            'top_address': 'Tallinn, Estonia',
            'top_hours': 'Mon-Sat: 9:00-18:00',
            'top_socials': 'Follow us on social media:',
            // Кнопка в шапке
            'header_consultation': 'Request a Consultation',
            // Навигация
            'nav_home': 'Home',
            'nav_services': 'Services',
            'nav_portfolio': 'Portfolio',
            'nav_testimonials': 'Testimonials',
            'nav_contact': 'Contact',
            // Слайдер
            'slider1_title': 'Hello! I’m a Digital Specialist',
            'slider1_text': 'I create websites, launch advertising campaigns, and automate business processes',
            'slider_contact': 'Get in Touch',
            'slider2_title': 'Professional Web Development',
            'slider2_text': 'Building modern and responsive websites for your business',
            'slider_services': 'My Services',
            'slider3_title': 'Effective Advertising',
            'slider3_text': 'Setting up high-conversion advertising campaigns',
            'slider_portfolio': 'Portfolio',
            // Секция услуг
            'services_title': 'Website Creation and Advertising in Tallinn',
            'services_intro': 'We offer professional services for website creation, advertising setup, and business process automation in Tallinn. Our solutions are tailored to your business and optimized for SEO.',
            'service_websites': 'Websites',
            'service_websites_desc': 'Landing pages, business cards, online stores',
            'service_websites_details': 'We create responsive websites that display perfectly on any device. From single-page landing pages to online stores with CRM and payment system integration.',
            'service_ads': 'Advertising',
            'service_ads_desc': 'Facebook, Instagram, TikTok, Google',
            'service_ads_details': 'We set up targeted and contextual advertising with high conversion rates. We help attract clients in Tallinn and beyond.',
            'service_automation': 'Automation',
            'service_automation_desc': 'n8n, Telegram bots, CRM, integrations',
            'service_automation_details': 'We automate business processes using n8n, Telegram bots, and CRM integrations to save you time and resources.',
            'see_portfolio': 'View Examples',
            // Таймлайн
            'timeline_title': 'How We Work',
            'timeline_step1_title': 'Consultation',
            'timeline_step1_text': 'We discuss your goals, tasks, and expectations for the project. We define the main requirements and functionality.',
            'timeline_step2_title': 'Planning',
            'timeline_step2_text': 'We create a detailed work plan, set deadlines, and budget. We agree on the technical specifications.',
            'timeline_step3_title': 'Design',
            'timeline_step3_text': 'We develop a design concept, considering your preferences and modern trends. We create prototypes and mockups.',
            'timeline_step4_title': 'Development',
            'timeline_step4_text': 'We implement the project using modern technologies. We regularly provide progress reports.',
            'timeline_step5_title': 'Testing',
            'timeline_step5_text': 'We conduct thorough testing on various devices and browsers. We fix all detected errors.',
            'timeline_step6_title': 'Launch and Support',
            'timeline_step6_text': 'We launch the project and provide training on its use. We offer technical support and further development.',
            // Секция портфолио
            'portfolio_title': 'Portfolio',
            'portfolio_all': 'All Projects',
            'portfolio_websites': 'Websites',
            'portfolio_ads': 'Advertising',
            'portfolio_automation': 'Automation',
            'portfolio_category_website': 'Website',
            'portfolio_category_ads': 'Advertising',
            'portfolio_category_automation': 'Automation',
            'portfolio_item1_title': 'Website for a Repair Specialist',
            'portfolio_item1_desc': 'Development of a responsive landing page with a request form and CRM integration',
            'portfolio_item2_title': 'Instagram Ads Campaign',
            'portfolio_item2_desc': 'Setting up targeted advertising with 12% conversion and 320% ROI',
            'portfolio_item3_title': 'Business Process Automation',
            'portfolio_item3_desc': 'Development of an automation system using n8n and Telegram API',
            'portfolio_item4_title': 'Cosmetics Online Store',
            'portfolio_item4_desc': 'Development of a store with payment system integration and order management system',
            'portfolio_item5_title': 'Google Contextual Advertising',
            'portfolio_item5_desc': 'Setting up search advertising with high CTR and low cost per click',
            'portfolio_item6_title': 'Telegram Bot for an Online School',
            'portfolio_item6_desc': 'Bot development with CRM and payment system integration',
            // Секция отзывов
            'testimonials_title': 'Client Testimonials',
            'testimonial1_text': '"The website turned out exactly as I wanted — clean, modern, and without anything extra. Everything was done on time and without unnecessary questions."',
            'testimonial1_author': 'Andres Kallaste',
            'testimonial1_position': 'Owner of a Design Studio, Tallinn',
            'testimonial2_text': '"After launching the Instagram ad campaign, we received a flood of requests in the first days. Clear work, understandable reports — a pleasure to work with."',
            'testimonial2_author': 'Maria Lepp',
            'testimonial2_position': 'Coach and Consultant, Narva',
            // Калькулятор
            'calculator_title': 'Cost Calculator',
            'calculator_intro': 'Calculate the preliminary cost of your project. We offer affordable prices below market rates. We can always discuss individual terms and find a solution that fits your budget.',
            'calculator_service_type': 'Service Type:',
            'calculator_service_landing': 'Landing Page (single-page website)',
            'calculator_service_business': 'Business Website (up to 5 pages)',
            'calculator_service_ecommerce': 'Online Store',
            'calculator_service_corporate': 'Corporate Website',
            'calculator_service_ads': 'Advertising Setup',
            'calculator_service_automation': 'Business Process Automation',
            'calculator_design_type': 'Design:',
            'calculator_design_template': 'Template-Based',
            'calculator_design_custom': 'Custom',
            'calculator_design_premium': 'Premium',
            'calculator_features': 'Additional Features:',
            'calculator_feature_seo': 'SEO Optimization',
            'calculator_feature_analytics': 'Analytics',
            'calculator_feature_content': 'Content Population',
            'calculator_feature_multilingual': 'Multilingual Support',
            'calculator_feature_integration': 'CRM Integration',
            'calculator_deadline': 'Urgency:',
            'calculator_deadline_normal': 'Standard (2-3 weeks)',
            'calculator_deadline_fast': 'Expedited (1-2 weeks)',
            'calculator_deadline_urgent': 'Urgent (up to 1 week)',
            'calculator_price': 'Approximate Cost:',
            'calculator_note': 'This is a preliminary estimate. <strong>Contact me, and we can always agree on individual terms!</strong> I’m ready to find a solution that suits you.',
            'calculator_calculate': 'Calculate',
            'calculator_request': 'Request Exact Price',
            // Контакты
            'contact_title': 'Contact Me',
            'contact_subtitle': 'Ready to discuss your project? I offer a free consultation and an individual approach to each client. Choose a convenient way to connect:',
            'contact_name': 'Your Name',
            'contact_phone': 'Your Phone',
            'contact_email': 'Your Email',
            'contact_message': 'Your Message',
            'contact_submit': 'Submit',
            'contact_telegram': 'The request will be sent via Telegram',
            'contact_privacy': 'I agree with the',
            'contact_privacy_link': 'privacy policy',
            // Подписка
            'subscribe_title': 'Subscribe to Our News',
            'subscribe_subtitle': 'Receive useful articles, business development tips, and exclusive offers',
            'subscribe_placeholder': 'Your Email',
            'subscribe_button': 'Subscribe',
            // Блог
            'blog_title': 'Blog',
            'blog_subtitle': 'Interesting articles from the world of IT and artificial intelligence',
            'blog_loading': 'Loading latest articles...',
            'blog_post1_title': 'How to Set Up Instagram Advertising for Businesses in Tallinn',
            'blog_post1_desc': 'In this article, we’ll explore how to launch effective Instagram ads for your business in Estonia...',
            'blog_read_more': 'Read More',
            // Футер
            'footer_copyright': '© 2025 Digital Expert. All rights reserved.',
            'footer_tagline': 'Made with mind and hands.',
            // Cookie уведомление
            'cookie_message': 'We use cookies to improve your experience on our website. By clicking “Accept All”, you agree to the use of all cookies. Learn more in our <a href="cookie-policy.html" target="_blank">cookie policy</a> and <a href="privacy-policy.html" target="_blank">privacy policy</a>.',
            'cookie_settings': 'Settings',
            'cookie_accept': 'Accept All',
            // Чат-бот
            'chatbot_title': 'Assistant',
            'chatbot_greeting': 'Hello! I’m the Digital Expert virtual assistant. How can I help you?',
            'chatbot_placeholder': 'Enter your question...',
            'chatbot_suggestion1': 'How much does a website cost?',
            'chatbot_suggestion2': 'Development timeline',
            'chatbot_suggestion3': 'What services?',
            'chatbot_suggestion4': 'Contacts'
        }
    };

    // Кэшируем элементы для оптимизации
    const i18nElements = document.querySelectorAll('[data-i18n]');
    const i18nAttrElements = document.querySelectorAll('[data-i18n-attr]');

    // Функция для изменения языка
    function changeLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        // Обновляем URL
        window.history.pushState({}, '', `?lang=${lang}`);
        updatePageLanguage();
        updateLanguageSwitcher();

        // Отправляем событие в Google Analytics
        if (typeof gtag === 'function') {
            gtag('event', 'language_change', {
                'event_category': 'engagement',
                'event_label': lang
            });
        }

        // Вызываем событие для других скриптов
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(event);
    }

    // Функция для обновления содержимого страницы
    function updatePageLanguage() {
        document.documentElement.lang = currentLanguage;
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        document.body.classList.add(`lang-${currentLanguage}`);

        const currentTranslations = translations[currentLanguage];
        if (!currentTranslations) return;

        // Обновляем элементы с data-i18n
        i18nElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (currentTranslations[key]) {
                element.innerHTML = currentTranslations[key];
            }
        });

        // Обновляем элементы с data-i18n-attr
        i18nAttrElements.forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr').split(':');
            if (attrData.length === 2) {
                const attr = attrData[0];
                const key = attrData[1];
                if (currentTranslations[key]) {
                    element.setAttribute(attr, currentTranslations[key]);
                }
            }
        });

        // Обновляем мета-теги
        const metaTranslations = {
            ru: {
                title: 'Digital Expert | Создание сайтов, реклама, автоматизация в Таллине',
                description: 'Digital Expert - профессиональные услуги по созданию сайтов, настройке рекламы и автоматизации бизнес-процессов в Таллине, Эстония.',
                keywords: 'создание сайтов Таллин, реклама Эстония, автоматизация бизнеса, SEO Таллин',
                og_title: 'Digital Expert | Профессиональные digital-услуги в Таллине',
                og_description: 'Создание сайтов, настройка рекламы и автоматизация бизнес-процессов в Таллине, Эстония.',
                twitter_title: 'Digital Expert | Профессиональные digital-услуги в Таллине',
                twitter_description: 'Создание сайтов, настройка рекламы и автоматизация бизнес-процессов в Таллине, Эстония.'
            },
            et: {
                title: 'Digital Expert | Veebisaitide loomine, reklaam, automatiseerimine Tallinnas',
                description: 'Digital Expert - professionaalsed teenused veebisaitide loomiseks, reklaami seadistamiseks ja äriprotsesside automatiseerimiseks Tallinnas, Eestis.',
                keywords: 'veebisaitide loomine Tallinn, reklaam Eesti, äriprotsesside automatiseerimine, SEO Tallinn',
                og_title: 'Digital Expert | Professionaalsed digiteenused Tallinnas',
                og_description: 'Veebisaitide loomine, reklaami seadistamine ja äriprotsesside automatiseerimine Tallinnas, Eestis.',
                twitter_title: 'Digital Expert | Professionaalsed digiteenused Tallinnas',
                twitter_description: 'Veebisaitide loomine, reklaami seadistamine ja äriprotsesside automatiseerimine Tallinnas, Eestis.'
            },
            en: {
                title: 'Digital Expert | Website Creation, Advertising, Automation in Tallinn',
                description: 'Digital Expert - professional services for website creation, advertising setup, and business process automation in Tallinn, Estonia.',
                keywords: 'website creation Tallinn, advertising Estonia, business automation, SEO Tallinn',
                og_title: 'Digital Expert | Professional Digital Services in Tallinn',
                og_description: 'Website creation, advertising setup, and business process automation in Tallinn, Estonia.',
                twitter_title: 'Digital Expert | Professional Digital Services in Tallinn',
                twitter_description: 'Website creation, advertising setup, and business process automation in Tallinn, Estonia.'
            }
        };

        const meta = metaTranslations[currentLanguage];
        if (document.querySelector('title')) document.querySelector('title').textContent = meta.title;
        if (document.querySelector('meta[name="description"]')) document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
        if (document.querySelector('meta[name="keywords"]')) document.querySelector('meta[name="keywords"]').setAttribute('content', meta.keywords);
        if (document.querySelector('meta[property="og:title"]')) document.querySelector('meta[property="og:title"]').setAttribute('content', meta.og_title);
        if (document.querySelector('meta[property="og:description"]')) document.querySelector('meta[property="og:description"]').setAttribute('content', meta.og_description);
        if (document.querySelector('meta[property="twitter:title"]')) document.querySelector('meta[property="twitter:title"]').setAttribute('content', meta.twitter_title);
        if (document.querySelector('meta[property="twitter:description"]')) document.querySelector('meta[property="twitter:description"]').setAttribute('content', meta.twitter_description);
    }

    // Функция для обновления активного класса в переключателе языков
    function updateLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('.language-switcher button');
        languageButtons.forEach(button => {
            if (button.getAttribute('data-lang') === currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Функция для создания переключателя языков
    function createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';

        const languages = [
            { code: 'ru', name: 'RU' },
            { code: 'et', name: 'ET' },
            { code: 'en', name: 'EN' }
        ];

        languages.forEach(lang => {
            const button = document.createElement('button');
            button.setAttribute('data-lang', lang.code);
            button.setAttribute('aria-label', `Switch to ${lang.name} language`);
            button.setAttribute('role', 'button');
            button.textContent = lang.name;
            button.addEventListener('click', () => changeLanguage(lang.code));
            if (lang.code === currentLanguage) {
                button.classList.add('active');
            }
            switcher.appendChild(button);
        });

        const translateElements = document.querySelectorAll('#google_translate_element');
        const topBarContent = document.querySelector('.top-bar-inner-wrap');
        if (translateElements.length > 1) {
            translateElements[1].parentNode.replaceChild(switcher, translateElements[1]);
        } else if (translateElements.length === 1) {
            translateElements[0].parentNode.replaceChild(switcher, translateElements[0]);
        } else if (topBarContent) {
            topBarContent.appendChild(switcher);
        } else {
            console.warn('Cannot find .top-bar-inner-wrap for language switcher');
        }
    }

    // Инициализация
    createLanguageSwitcher();
    updatePageLanguage();
});
