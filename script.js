/* Mobile Navigation */
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('#navbar');

// Toggle mobile menu
mobileToggle.addEventListener('click', () => {
  // Simple toggle for standard nav links div if we used that method
  // OR create/toggle the overlay if using the overlay CSS method
  
  // Checking how I structured HTML:
  // <div class="nav-links" id="navLinks"> is inline on desktop, hidden on mobile
  
  // Let's create a mobile overlay logic or toggle a class
  if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
      if(window.innerWidth >= 768) navLinks.style.display = 'flex';
      navLinks.classList.remove('active');
  } else {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = 'white';
      navLinks.style.padding = '2rem';
      navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      navLinks.classList.add('active');
  }
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'static';
        navLinks.style.flexDirection = 'row';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
    } else {
        navLinks.style.display = 'none';
        navLinks.classList.remove('active');
    }
});

// Sticky Navbar Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* Testimonial Slider */
const track = document.getElementById('sliderTrack');
const slides = Array.from(document.querySelectorAll('.testimonial-card'));
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentSlideIndex = 0;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
  dotsContainer.appendChild(dot);
});

const dots = Array.from(document.querySelectorAll('.dot'));

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function goToSlide(index) {
  // Update classes
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  
  currentSlideIndex = index;
  updateDots(index);
}

nextBtn.addEventListener('click', () => {
  let nextIndex = currentSlideIndex + 1;
  if (nextIndex >= slides.length) nextIndex = 0;
  goToSlide(nextIndex);
});

prevBtn.addEventListener('click', () => {
  let prevIndex = currentSlideIndex - 1;
  if (prevIndex < 0) prevIndex = slides.length - 1;
  goToSlide(prevIndex);
});

// Auto slide
setInterval(() => {
   // Optional: Auto slide every 5s
   // let nextIndex = currentSlideIndex + 1;
   // if (nextIndex >= slides.length) nextIndex = 0;
   // goToSlide(nextIndex);
}, 5000);


/* Form Validation */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;
  
  // Name
  const nameInput = document.getElementById('name');
  if (nameInput.value.trim() === '') {
    setError(nameInput, 'Name is required');
    isValid = false;
  } else {
    setSuccess(nameInput);
  }
  
  // Email
  const emailInput = document.getElementById('email');
  if (emailInput.value.trim() === '') {
    setError(emailInput, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    setError(emailInput, 'Please enter a valid email');
    isValid = false;
  } else {
    setSuccess(emailInput);
  }
  
  // Message
  const msgInput = document.getElementById('message');
  if (msgInput.value.trim() === '') {
    setError(msgInput, 'Message is required');
    isValid = false;
  } else {
    setSuccess(msgInput);
  }
  
  if (isValid) {
    // Simulate submission
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerText = 'Message Sent!';
      btn.style.backgroundColor = '#22c55e'; // Green
      contactForm.reset();
      
      // Reset after 3 seconds
      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.style.backgroundColor = '';
        // Clear success states
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('success'));
      }, 3000);
    }, 1500);
  }
});

function setError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  formGroup.className = 'form-group error';
  small.innerText = message;
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

function isValidEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

/* Scroll Reveal Animation (Simple) */
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
  // Add base style for animation
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Add class for visible state in CSS dynamically or update style
document.head.insertAdjacentHTML('beforeend', `<style>
.section.visible { opacity: 1 !important; transform: translateY(0) !important; }
</style>`);
