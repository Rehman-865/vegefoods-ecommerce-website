const ticker = document.getElementById("sale-ticker");

function startTicker(){
    // Text ki apni width (length) pata lagana
    const textWidth = ticker.offsetWidth;
    const containerWidth = ticker.parentElement.offsetWidth;
    
    // Shuru mein position right side par set karna
    let currentPos = containerWidth;
    
    function frame() {
        // Speed ko control karne ke liye minus value (jitna chota number utna smooth)
        currentPos -= 2; 
        
        // Jab text poora left side par nikal jaye
        if (currentPos <= -textWidth) {
            // 1. Text ko wapas right side (starting point) par le aana
            currentPos = containerWidth;
            ticker.style.transform = `translateX(${currentPos}px)`;
            
            // 2. Yahan animation ko rokh dena aur 3 seconds ka wait karna (`setTimeout`)
            setTimeout(function() {
                requestAnimationFrame(frame); // 3 seconds baad dubara chalna shuru karega
            }, 3000);
            
            return; // Yahan current frame ko break kar dena hai taake setTimeout ka wait ho sake
        }
        
        // Text ko move karna DOM mein
        ticker.style.transform = `translateX(${currentPos}px)`;
        requestAnimationFrame(frame);
    }
    
    // Pehli baar animation start karna
    requestAnimationFrame(frame);
}

// Page load hone par ticker start kar dena
window.onload = startTicker;


document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentSlide = 0;
    let slideInterval;

    // Slide change karne ka function
    function showSlide(index) {
        // Purani active slide aur dot ko remove karna
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // Boundary conditions check karna (loop back)
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Nayi active slide aur dot ko show karna
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    // Auto slide function (setInterval use kar ke)
    function startAutoSlide() {
        slideInterval = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 3000); // Har 3 seconds baad chalega
    }

    // Manual interaction par timer reset karna
    function resetTimer() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Next Button Click
    nextBtn.addEventListener("click", function () {
        showSlide(currentSlide + 1);
        resetTimer();
    });

    // Prev Button Click
    prevBtn.addEventListener("click", function () {
        showSlide(currentSlide - 1);
        resetTimer();
    });

    // Dots Click Interaction
    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            showSlide(index);
            resetTimer();
        });
    });

    // Slider Start karna
    startAutoSlide();
});

document.addEventListener("DOMContentLoaded", function () {
    const categoryCards = document.querySelectorAll(".category-item");

    categoryCards.forEach(card => {
        card.addEventListener("click", function () {
            // Future mein aap specific category page par link kar sakte hain
            window.location.href = "shop.html";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    // Navbar me maujood cart link element
    const cartCountElement = document.querySelector(".nav-item.cta .nav-link");

    let cartCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            cartCount++;
            
            // Navbar me updated cart count display karna
            if (cartCountElement) {
                cartCountElement.innerHTML = `<span class="icon-shopping_cart">🛒</span> [${cartCount}]`;
            }

            // Click Feedback Animation
            this.style.transform = "scale(1.3)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 200);
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    // 24 hours aage ka Target Date set karein
    const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerText = days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        } else {
            if (daysEl) daysEl.innerText = "0";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
        }
    }

    // Har 1 second (1000ms) baad update karein
    setInterval(updateTimer, 1000);
    updateTimer();
});

document.addEventListener("DOMContentLoaded", function () {
    const dots = document.querySelectorAll(".testimony-dots .dot");

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            // Sabhi dots se active class hataein
            dots.clicked = index;
            dots.forEach(d => d.classList.remove("active"));
            
            // Jis dot par click hua usay active karein
            this.classList.add("active");
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const partnerLinks = document.querySelectorAll(".partner-link");

    partnerLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            this.style.cursor = "pointer";
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const addTodoBtn = document.getElementById("addTodoBtn");
    const todoList = document.getElementById("todoList");

    // Naya item add karne ka function
    function addTodo() {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            alert("Barah-e-karam koi sabzi ya item ka naam likhein!");
            return;
        }

        // List item create karna
        const li = document.createElement("li");
        li.className = "todo-item";

        li.innerHTML = `
            <span class="item-text">${taskText}</span>
            <button class="delete-btn">×</button>
        `;

        // Click karne par task complete (line-through) ho jaye
        li.querySelector(".item-text").addEventListener("click", function () {
            li.classList.toggle("completed");
        });

        // Delete button par click karne par item remove ho jaye
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.style.opacity = "0";
            setTimeout(() => li.remove(), 300);
        });

        // List mein append karna aur input clear karna
        todoList.appendChild(li);
        todoInput.value = "";
    }

    // Button click event
    addTodoBtn.addEventListener("click", addTodo);

    // Enter key press karne par bhi add ho jaye
    todoInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTodo();
        }
    });

    // Pehle se maujood sample items par bhi click-to-complete enable karna
    document.querySelectorAll(".todo-item").forEach(item => {
        item.querySelector(".item-text").addEventListener("click", function () {
            item.classList.toggle("completed");
        });
        item.querySelector(".delete-btn").addEventListener("click", function () {
            item.remove();
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterMessage = document.getElementById("newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailValue = newsletterEmail.value.trim();

            if (emailValue !== "") {
                // Success message show karna
                newsletterMessage.textContent = "Thank you for subscribing to our newsletter!";
                newsletterMessage.className = "subscription-msg success";
                
                // Input reset karna
                newsletterEmail.value = "";

                // 4 seconds baad message clear karna
                setTimeout(() => {
                    newsletterMessage.textContent = "";
                }, 4000);
            } else {
                newsletterMessage.textContent = "Please enter a valid email address.";
                newsletterMessage.className = "subscription-msg error";
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // 1. Automatic Current Year set karna
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Back to Top Smooth Scroll Logic
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        // Window scroll listener
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // Click karne par top par le kar jana
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll("[data-animate]");

    const observerOptions = {
        root: null,
        threshold: 0.12, // Element 12% visible hone par trigger hoga
        rootMargin: "0px 0px -50px 0px" // Smooth scroll offset
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                // Ek baar render hone ke baad observer remove kar dein performance ke liye
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animationObserver.observe(el));
});