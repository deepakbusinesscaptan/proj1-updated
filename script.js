const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");
const aboutImage = document.querySelector(".about-image");
const uniqueImage = document.querySelector(".unique-image");

if (aboutImage) {
    const showAboutImage = () => aboutImage.classList.add("is-visible");

    if ("IntersectionObserver" in window) {
        const aboutImageObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                showAboutImage();
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        aboutImageObserver.observe(aboutImage);
    } else {
        showAboutImage();
    }
}
if (uniqueImage) {
    const showUniqueImage = () => uniqueImage.classList.add("is-visible");

    if ("IntersectionObserver" in window) {
        const uniqueImageObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                showUniqueImage();
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        uniqueImageObserver.observe(uniqueImage);
    } else {
        showUniqueImage();
    }
}

if (slides.length && dotsContainer) {

let current = 0;
let interval;

slides.forEach((_, index) => {

    const dot = document.createElement("div");
    dot.classList.add("dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");

function updateSlides(){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[current].classList.add("active");
    dots[current].classList.add("active");
}

function goToSlide(index){
    current = index;
    updateSlides();
    restartAuto();
}

function nextSlide(){
    current++;

    if(current >= slides.length){
        current = 0;
    }

    updateSlides();
}

function prevSlide(){
    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    updateSlides();
}

document.querySelector(".next").addEventListener("click",()=>{
    nextSlide();
    restartAuto();
});

document.querySelector(".prev").addEventListener("click",()=>{
    prevSlide();
    restartAuto();
});

function startAuto(){
    interval = setInterval(nextSlide, 5000);
}

function restartAuto(){
    clearInterval(interval);
    startAuto();
}

startAuto();

document.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth/2 - e.clientX)/40;
    const y = (window.innerHeight/2 - e.clientY)/40;

    document.querySelectorAll(".floating").forEach(item=>{
        item.style.transform =
        `translate(${x}px, ${y}px)`;
    });

});

}