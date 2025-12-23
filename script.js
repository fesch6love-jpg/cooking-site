// Общий JavaScript для всего сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация изображений из локальной папки
    initLocalImages();
    
    // Анимация карточек при загрузке
    const cards = document.querySelectorAll('.category-card, .recipe-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Обработка поиска
    const searchButtons = document.querySelectorAll('.search-bar button');
    const searchInputs = document.querySelectorAll('.search-bar input');
    
    searchButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            performSearch(searchInputs[index]);
        });
    });
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this);
            }
        });
    });
    
    function performSearch(inputElement) {
        const searchTerm = inputElement.value.trim();
        if (searchTerm) {
            alert(`Поиск рецептов по запросу: "${searchTerm}"\nВ реальном сайте здесь будет поиск по базе рецептов.`);
            inputElement.value = '';
        } else {
            alert('Введите поисковый запрос');
        }
    }
    
    // Клик по карточкам категорий
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            window.location.href = 'recipes.html';
        });
    });
    
    // Фильтрация рецептов на странице recipes.html
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убрать активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавить активный класс нажатой кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Показать/скрыть рецепты в зависимости от фильтра
            recipeCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // В реальном сайте здесь будет отправка на сервер
            alert(`Спасибо, ${name}! Ваше сообщение отправлено.\nМы ответим вам на email: ${email}\n\nТема: ${subject}\nСообщение: ${message}`);
            
            // Очистка формы
            contactForm.reset();
        });
    }
    
    // Подсветка активной страницы в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Функция для инициализации локальных изображений
function initLocalImages() {
    // Маппинг ID элементов с именами файлов в папке images
    const imageMap = {
        // Фоновое изображение для героя
        'hero-bg': 'images/hero-bg.jpg',
        
        // Изображения категорий
        'cat-main-dish': 'images/main-dish.jpg',
        'cat-desserts': 'images/desserts.jpg',
        'cat-healthy': 'images/healthy.jpg',
        'cat-baking': 'images/baking.jpg',
        
        // Изображения рецептов
        'recipe-pasta': 'images/pasta.jpg',
        'recipe-tiramisu': 'images/tiramisu.jpg',
        'recipe-chicken': 'images/chicken.jpg'
    };
    
    // Установка фоновых изображений
    for (const [elementId, imagePath] of Object.entries(imageMap)) {
        const element = document.getElementById(elementId);
        if (element) {
            // Проверяем, существует ли изображение
            const img = new Image();
            img.onload = function() {
                element.style.backgroundImage = `url('${imagePath}')`;
            };
            img.onerror = function() {
                console.log(`Изображение не найдено: ${imagePath}`);
                // Можно установить цвет фона по умолчанию
                element.style.backgroundColor = getRandomColor();
            };
            img.src = imagePath;
        }
    }
}

// Вспомогательная функция для случайного цвета (если изображение не загрузилось)
function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fab1a0'];
    return colors[Math.floor(Math.random() * colors.length)];
}