document.addEventListener('DOMContentLoaded', function () {
    // Navigation Targets
    const navigationGroups = {
        'brandMatch.html': ['wheel', 'brand', 'match'],
        'autocross.html': ['shifter', 'auto', 'autocross'],
        'trivia.html': ['radio', 'autoTrivia', 'trivia'],
        'readme.txt': ['readMe']
    };
    
    // SVG Hover Effects
    const svgPaths = ['wheel', 'shifter', 'radio', 'brand', 'auto', 'autoTrivia'];
    svgPaths.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // Set initial opacity
            element.style.opacity = '0';
            
            // Add hover effects
            element.addEventListener('mouseover', () => element.style.opacity = '.15');
            element.addEventListener('mouseout', () => element.style.opacity = '0');
        }
    });
    
    // Element navigation clicks
    for (const [url, elementIds] of Object.entries(navigationGroups)) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', () => window.location.href = url);
            }
        });
    }
});