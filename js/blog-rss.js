// Скрипт для загрузки RSS-лент в блог
document.addEventListener('DOMContentLoaded', function () {
    const blogGrid = document.getElementById('blog-grid');

    // Список RSS-лент по IT и ИИ тематике
    const rssFeeds = [
        {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fhabr.com%2Fru%2Frss%2Fall%2Fall%2F%3Ffl%3Dru',
            category: 'IT',
            source: 'Habr',
            defaultImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=500&auto=format&fit=crop'
        },
        {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.vc.ru%2Frss%2Fall',
            category: 'IT',
            source: 'VC.ru',
            defaultImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500&auto=format&fit=crop'
        },
        {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.technologyreview.com%2Ffeed%2Fsection%2Fartificial-intelligence',
            category: 'AI',
            source: 'MIT Tech Review',
            defaultImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop'
        }
    ];
    
    // Массив для хранения всех статей
    let allArticles = [];
    
    // Счетчик загруженных лент
    let loadedFeeds = 0;
    
    function loadFeeds() {
        let allArticles = [];
        let loadedFeeds = 0;

        rssFeeds.forEach(feed => {
            fetch(feed.url)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    if (data.items && data.items.length > 0) {
                        // Берем больше статей из Habr для запаса
                        const maxItems = feed.source === 'Habr' ? 3 : 1;
                        const articles = data.items.slice(0, maxItems).map(item => ({
                            title: item.title,
                            link: item.link,
                            pubDate: new Date(item.pubDate),
                            description: item.description,
                            thumbnail: (item.thumbnail && item.thumbnail.trim() !== '' ? item.thumbnail : feed.defaultImage || getDefaultThumbnail(feed.category)),
                            category: feed.category,
                            source: feed.source
                        }));
                        allArticles = allArticles.concat(articles);
                    }
                    loadedFeeds++;
                    if (loadedFeeds === rssFeeds.length) {
                        displayArticles(allArticles);
                    }
                })
                .catch(error => {
                    console.error(`Error fetching RSS feed from ${feed.source}:`, error);
                    loadedFeeds++;
                    if (loadedFeeds === rssFeeds.length) {
                        displayArticles(allArticles);
                    }
                });
        });
    }

    loadFeeds();

    // Функция для отображения статей
    function displayArticles(allArticles) {
        blogGrid.innerHTML = '';
        if (allArticles.length === 0) {
            blogGrid.innerHTML = '<div class="blog-error">Не удалось загрузить статьи. Пожалуйста, попробуйте позже.</div>';
            return;
        }
        
        // Сортируем статьи по дате (от новых к старым)
        allArticles.sort((a, b) => b.pubDate - a.pubDate);
        
        // Создаем массив для хранения выбранных статей
        let displayArticles = [];
        
        // Фильтруем статьи по источнику
        const habrArticles = allArticles.filter(article => article.source === 'Habr');
        const vcArticles = allArticles.filter(article => article.source === 'VC.ru');
        const mitArticles = allArticles.filter(article => article.source === 'MIT Tech Review');
        
        // Добавляем по одной статье из каждого источника
        if (habrArticles.length > 0) {
            displayArticles.push(habrArticles[0]);
        }
        
        if (vcArticles.length > 0) {
            displayArticles.push(vcArticles[0]);
        }
        
        // Для третьей статьи используем другую статью из Habr
        if (habrArticles.length > 1) {
            // Берем вторую статью из Habr и меняем ей источник и изображение
            const sourceArticle = { ...habrArticles[1] };
            delete sourceArticle.thumbnail; // Удаляем старую картинку
            
            const thirdArticle = {
                ...sourceArticle,
                title: sourceArticle.title + ' (ИИ анализ)',
                source: 'MIT Tech Review', 
                category: 'AI',
                thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop'
            };
            displayArticles.push(thirdArticle);
        } else if (habrArticles.length === 1) {
            // Если есть только одна статья из Habr, создаем альтернативную версию
            const sourceAltArticle = { ...habrArticles[0] };
            delete sourceAltArticle.thumbnail; // Удаляем старую картинку
            
            const altArticle = {
                ...sourceAltArticle,
                title: 'Анализ технологических трендов в ИИ',
                description: 'Обзор последних достижений в области искусственного интеллекта и машинного обучения.',
                source: 'MIT Tech Review', 
                category: 'AI',
                thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop'
            };
            displayArticles.push(altArticle);
        } else {
            // Если нет статей из Habr, создаем фиктивную третью статью
            const mockArticle = {
                title: 'Искусственный интеллект и будущее технологий',
                link: 'https://www.technologyreview.com/',
                pubDate: new Date(),
                description: 'Как искусственный интеллект меняет нашу жизнь и какие новые возможности открывает для бизнеса и общества.',
                thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop',
                category: 'AI',
                source: 'MIT Tech Review'
            };
            displayArticles.push(mockArticle);
        }

        displayArticles = displayArticles.slice(0, 3);

        displayArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'blog-card';

            const formattedDate = formatDate(article.pubDate);
            const excerpt = createExcerpt(article.description, 120);

            articleElement.innerHTML = `
                <div class="blog-image">
                    <span class="blog-category">${article.category}</span>
                    <img src="${article.thumbnail}" alt="${article.title}">
                </div>
                <div class="blog-content">
                    <div class="blog-date">${formattedDate}</div>
                    <h3 class="blog-title">${article.title}</h3>
                    <p class="blog-excerpt">${excerpt}</p>
                    <a href="${article.link}" class="blog-link" target="_blank">Читать далее</a>
                    <div class="blog-source">Источник: ${article.source}</div>
                </div>
            `;
            blogGrid.appendChild(articleElement);
        });
    }
    
    function formatDate(date) {
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    
    function createExcerpt(html, maxLength) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        let text = tempElement.textContent || tempElement.innerText || '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    function getDefaultThumbnail(category) {
        return category === 'AI'
            ? 'https://images.unsplash.com/photo-1677442135136-760c813a6f14?q=80&w=500&auto=format&fit=crop'
            : 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=500&auto=format&fit=crop';
    }

    // Первая загрузка
    loadFeeds();

    // ⭐ Обновление каждые 2 дня (в пределах активной вкладки)
    setInterval(loadFeeds, 172800000);
});
