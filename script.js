function openLoc(folder, title, desc, ytUrl) {
    // Encodes the data so it can be sent in the URL to location.html
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

let currentSlide = 0;
let slides = [];

function autoLoadImages() {
    const params = new URLSearchParams(window.location.search);
    const folder = params.get('folder');
    if (!folder) return;

    // Pulls the Title, Description, and YouTube link from the URL
    document.getElementById('locTitle').innerText = params.get('title');
    document.getElementById('locTitle').setAttribute('data-text', params.get('title'));
    document.getElementById('locDesc').innerText = params.get('desc');
    document.getElementById('ytLink').href = params.get('yt');

    const grid = document.getElementById('photoGrid');
    const slider = document.getElementById('slider');

    for (let i = 1; i <= 25; i++) {
        let img = new Image();
        img.src = `images/${folder}/${i}.jpg`;
        img.onload = function() {
            let gImg = document.createElement('img');
            gImg.src = this.src;
            gImg.onclick = () => { currentSlide = slides.indexOf(sImg); updateSlider(); };
            grid.appendChild(gImg);

            let sImg = document.createElement('img');
            sImg.src = this.src;
            sImg.className = 'slider-img';
            if (slides.length === 0) sImg.classList.add('active');
            slider.appendChild(sImg);
            slides.push(sImg);
        };
    }
}

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