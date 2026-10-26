// --- MOBİL MENÜ TETİKLEYİCİLERİ ---
const hamburger = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-navigation');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        // Hamburger ikonunu aktif/pasif yapar (X işareti animasyonu için)
        hamburger.classList.toggle('active');
        // Menü listesini ekrana kaydırır/gizler
        mainNav.classList.toggle('active');
    });
}

// Menü linklerinden birine tıklandığında menüyü otomatik kapat
const navLinks = document.querySelectorAll('.nav-link, .cta-btn');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && mainNav) {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});

// SEKME GEÇİŞLERİNİ YÖNETEN FONKSİYON
function openProduct(evt, productName) {
    // Tüm sekme içeriklerini gizle
    const tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }

    // Tüm sekme butonlarından "active" sınıfını kaldır
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    // Seçilen sekme içeriğini ve butonunu aktif et
    const targetProduct = document.getElementById(productName);
    if (targetProduct) {
        targetProduct.classList.add("active");
    }
    evt.currentTarget.classList.add("active");
}

// SLIDER KONTROL SİSTEMİ (Birden fazla slaytı aynı anda yönetebilir)
function getSliderElements(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return null;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');

    // Mevcut aktif indeksi bul
    let activeIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
        }
    });

    return { slides, dots, activeIndex };
}

// Ok butonlarına basıldığında çalışır
function moveSlide(sliderId, direction) {
    const elements = getSliderElements(sliderId);
    if (!elements) return;

    const { slides, dots, activeIndex } = elements;
    let newIndex = activeIndex + direction;

    // Sınır kontrolleri (Sonsuz döngü)
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    updateSlider(slides, dots, newIndex);
}

// Alt noktalara (dots) basıldığında çalışır
function setSlide(sliderId, index) {
    const elements = getSliderElements(sliderId);
    if (!elements) return;

    updateSlider(elements.slides, elements.dots, index);
}

// Slayt görsellerini ve noktaları güncelleyen yardımcı fonksiyon
function updateSlider(slides, dots, index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// Dil Menüsü Güvenli Açılış Kodu
const langDropdown = document.querySelector('.lang-dropdown');
const langOptions = document.querySelector('.lang-options');

if (langDropdown && langOptions) {
    langDropdown.addEventListener('mouseenter', () => {
        langOptions.style.display = 'block';
    });

    langDropdown.addEventListener('mouseleave', (e) => {
        // Eğer fare alt seçenekler kutusuna doğru gidiyorsa hemen kapatma
        if (!e.relatedTarget || !langDropdown.contains(e.relatedTarget)) {
            langOptions.style.display = 'none';
        }
    });
}