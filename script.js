let currentSlide = 0;
let slides = [];

function openLoc(folder, title, desc, ytUrl) {
    const url = `location.html?folder=${folder}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}&yt=${encodeURIComponent(ytUrl)}`;
    window.location.href = url;
}

function handleMissingImg(element) {
    element.parentElement.classList.add('error-bg');
    element.style.display = 'none';
}

function filterLand(land) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains('corrupted-card')) {
            card.style.display = (land === 'all') ? 'block' : 'none';
        } else {
            card.style.display = (land === 'all' || card.classList.contains(land)) ? 'block' : 'none';
        }
    });
}

function autoLoadImages() {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder');
    if (!folder) return;

    // Load Text Data
    document.getElementById('locTitle').innerText = params.get('title');
    document.getElementById('locTitle').setAttribute('data-text', params.get('title'));
    document.getElementById('locDesc').innerText = params.get('desc');
    document.getElementById('ytLink').href = params.get('yt');

    const grid = document.getElementById('photoGrid');
    const slider = document.getElementById('slider');

    // Attempt to load up to 25 images
    for (let i = 1; i <= 25; i++) {
        let testImg = new Image();
        let basePath = `images/${folder}/${i}`;
        
        // 1. Try lowercase .jpg
        testImg.src = `${basePath}.jpg`;

        testImg.onload = function() {
            // Success with .jpg
            addToGallery(this.src, grid, slider);
        };

        testImg.onerror = function() {
            // 2. If .jpg fails, try uppercase .JPG
            this.onerror = null; // Prevent infinite loop
            let retryImg = new Image();
            retryImg.src = `${basePath}.JPG`;
            
            retryImg.onload = function() {
                addToGallery(this.src, grid, slider);
            };
            
            // If both fail, the loop just moves on to the next number
        };
    }
}

// Helper function to create DOM elements once an image is confirmed found
function addToGallery(src, grid, slider) {
    // Add to Photo Grid
    let gImg = document.createElement('img');
    gImg.src = src;
    gImg.onclick = () => { 
        currentSlide = slides.indexOf(sImg); 
        updateSlider(); 
    };
    grid.appendChild(gImg);

    // Add to Top Slider
    let sImg = document.createElement('img');
    sImg.src = src;
    sImg.className = 'slider-img';
    if (slides.length === 0) sImg.classList.add('active');
    
    slider.appendChild(sImg);
    slides.push(sImg);
}

function changeSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function updateSlider() {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}
