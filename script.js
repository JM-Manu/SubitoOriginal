document.addEventListener('DOMContentLoaded', () => {
    // Carusel de Testimonios
    const testimoniosCarousel = document.querySelector('.testimonios-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const testimonios = document.querySelectorAll('.testimonio');
    let currentIndex = 0;

    if (testimoniosCarousel && prevBtn && nextBtn && testimonios.length > 0) {
        const showTestimonial = (index) => {
            testimoniosCarousel.scrollTo({
                left: testimonios[index].offsetLeft,
                behavior: 'smooth'
            });
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonios.length - 1;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < testimonios.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        });

        // Opcional: Auto-avance del carrusel
        // setInterval(() => {
        //     nextBtn.click();
        // }, 5000); // Cambia cada 5 segundos
    }

    // Contador de Clientes Satisfechos
    const clientesSatisfechosSpan = document.getElementById('clientes-satisfechos');
    let count = 0;
    const targetCount = 1000; // Puedes ajustar este número
    const duration = 2000; // Duración de la animación en milisegundos
    const step = targetCount / (duration / 10); // Incremento por cada 10ms

    if (clientesSatisfechosSpan) {
        const animateCounter = () => {
            if (count < targetCount) {
                count += step;
                clientesSatisfechosSpan.textContent = Math.round(count);
                requestAnimationFrame(animateCounter);
            } else {
                clientesSatisfechosSpan.textContent = targetCount;
            }
        };
        // Iniciar el contador cuando la sección es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter();
                observer.disconnect(); // Desconectar después de la primera vez
            }
        }, { threshold: 0.5 }); // Inicia cuando el 50% de la sección es visible

        observer.observe(clientesSatisfechosSpan.closest('.bonus-item'));
    }

    // FAQ Acordeón
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Cierra todas las respuestas abiertas
            document.querySelectorAll('.faq-question.active').forEach(activeQ => {
                if (activeQ !== question) {
                    activeQ.classList.remove('active');
                    activeQ.nextElementSibling.classList.remove('show');
                }
            });

            // Abre o cierra la respuesta clicada
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('show');
            } else {
                question.classList.remove('active');
                answer.classList.remove('show');
            }
        });
    });

    // Mostrar sección FAQ al hacer click en el botón "Ver FAQs"
    const btnFaq = document.querySelector('.btn-faq');
    const faqSection = document.getElementById('faq');

    if (btnFaq && faqSection) {
        btnFaq.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            faqSection.classList.toggle('hidden'); // Alterna la visibilidad
            if (!faqSection.classList.contains('hidden')) {
                faqSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});