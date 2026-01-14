let currentSlide = 0;
let slides = [];

/**
 * Main loader function triggered on window.onload
 */
function autoLoadImages() {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder');
    if (!folder) return;

    // 1. Populate Text Metadata
    const title = params.get('title') || "UNKNOWN_LOCATION";
    document.getElementById('locTitle').innerText = title;
    document.getElementById('locTitle').setAttribute('data-text', title);
    document.getElementById('locDesc').innerText = params.get('desc') || "No data available for this sector.";
    document.getElementById('ytLink').href = params.get('yt') || "#";

    const grid = document.getElementById('photoGrid');
    const slider = document.getElementById('slider');

    // 2. Loop through potential image sequence (1-25)
    for (let i = 1; i <= 25; i++) {
        const pathBase = `images/${folder}/${i}`;
        tryLoadImage(pathBase, grid, slider);
    }
}

/**
 * Handles the dual-extension check (.jpg vs .JPG)
 */
function tryLoadImage(pathBase, grid, slider) {
    let img = new Image();
    
    // Attempt lowercase first
    img.src = `${pathBase}.jpg`;

    img.onload = function() {
        createGalleryElements(this.src, grid, slider);
    };

    img.onerror = function() {
        // If lowercase fails, try uppercase
        this.onerror = null; // Prevent infinite loops
        this.src = `${pathBase}.JPG`;
        
        // If uppercase also fails, it will just not trigger onload
    };
}

/**
 * Appends images to both the grid and the top slider
 */
function createGalleryElements(src, grid, slider) {
    // Create Grid Item
    let gImg = document.createElement('img');
    gImg.src = src;
    
    // Create Slider Item
    let sImg = document.createElement('img');
    sImg.src = src;
    sImg.className = 'slider-img';
    
    // Set click event to jump to slide
    gImg.onclick = () => { 
        currentSlide = slides.indexOf(sImg); 
        updateSlider(); 
    };
    
    grid.appendChild(gImg);

    // Initial Active State
    if (slides.length === 0) sImg.classList.add('active');
    
    slider.appendChild(sImg);
    slides.push(sImg);
}

/**
 * Slider Navigation Controls
 */
function changeSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function updateSlider() {
    slides.forEach(s => s.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 * Archive Page Helpers (Included for completeness)
 */
function openLoc(folder, title, desc, ytUrl) {
    const url = `location.html?folder=${folder}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}&yt=${encodeURIComponent(ytUrl)}`;
    window.location.href = url;
}

function handleMissingImg(element) {
    element.parentElement.classList.add('error-bg');
    element.style.display = 'none';
}
