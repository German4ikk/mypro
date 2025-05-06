// Schema.org structured data for better SEO
document.addEventListener('DOMContentLoaded', function() {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Digital Expert",
        "description": "Профессиональные услуги по созданию сайтов, настройке рекламы и автоматизации бизнес-процессов в Таллине, Эстония.",
        "url": "https://digital-specialist-portfolio.windsurf.build/",
        "logo": "https://digital-specialist-portfolio.windsurf.build/images/logo.png",
        "image": "https://digital-specialist-portfolio.windsurf.build/images/slider-1.png",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Таллин",
            "addressRegion": "Харьюмаа",
            "addressCountry": "Эстония"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "59.4370",
            "longitude": "24.7536"
        },
        "telephone": "+37256374348",
        "email": "ads.n8n.dmitri@gmail.com",
        "priceRange": "€€",
        "openingHours": "Mo-Sa 09:00-18:00",
        "sameAs": [
            "https://instagram.com/dimarik107",
            "https://t.me/bonez_mc187"
        ],
        "serviceType": ["Веб-разработка", "Настройка рекламы", "Автоматизация бизнес-процессов"],
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "59.4370",
                "longitude": "24.7536"
            },
            "geoRadius": "100000"
        }
    };
    
    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);
});
