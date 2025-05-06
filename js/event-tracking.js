// Event tracking for Google Tag Manager
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn');
    if (ctaButtons) {
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Get button text for event label
                const buttonText = this.textContent.trim();
                // Push event to dataLayer
                window.dataLayer.push({
                    'event': 'button_click',
                    'button_text': buttonText,
                    'button_location': getButtonLocation(this)
                });
                console.log('Button click tracked:', buttonText);
            });
        });
    }
    
    // Track contact form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Push event to dataLayer
            window.dataLayer.push({
                'event': 'form_submission',
                'form_id': 'contactForm',
                'form_name': 'Contact Form'
            });
            console.log('Form submission tracked');
        });
    }
    
    // Track social media link clicks
    const socialLinks = document.querySelectorAll('.top-bar-socials a, .contact-item a');
    if (socialLinks) {
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Get link URL and text
                const linkUrl = this.getAttribute('href');
                const linkText = this.textContent.trim() || this.querySelector('i').className;
                
                // Push event to dataLayer
                window.dataLayer.push({
                    'event': 'social_click',
                    'social_platform': getSocialPlatform(linkUrl),
                    'link_url': linkUrl,
                    'link_text': linkText
                });
                console.log('Social link click tracked:', linkUrl);
            });
        });
    }
    
    // Track scroll depth
    let scrollMarks = [25, 50, 75, 100];
    let scrollMarksReached = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercentage = getScrollPercentage();
        
        scrollMarks.forEach(mark => {
            if (scrollPercentage >= mark && !scrollMarksReached.includes(mark)) {
                scrollMarksReached.push(mark);
                window.dataLayer.push({
                    'event': 'scroll_depth',
                    'scroll_percentage': mark
                });
                console.log('Scroll depth tracked:', mark + '%');
            }
        });
    });
    
    // Helper functions
    function getButtonLocation(button) {
        // Find closest section
        const section = button.closest('section');
        return section ? section.id : 'unknown';
    }
    
    function getSocialPlatform(url) {
        if (url.includes('telegram')) return 'Telegram';
        if (url.includes('instagram')) return 'Instagram';
        if (url.includes('whatsapp')) return 'WhatsApp';
        if (url.includes('mailto')) return 'Email';
        return 'Other';
    }
    
    function getScrollPercentage() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        return Math.floor((scrollTop / (documentHeight - windowHeight)) * 100);
    }
});
