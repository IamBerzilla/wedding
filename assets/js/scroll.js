document.addEventListener('DOMContentLoaded', function() {
  const scrollDown = document.querySelector('.scroll-down');
  const heroSection = document.querySelector('.hero');
  const heroHeight = heroSection.offsetHeight;

  function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Плавное исчезновение при скролле вниз
    if (scrollPosition > 50) {
      const opacity = 1 - Math.min(scrollPosition / heroHeight, 1);
      scrollDown.style.opacity = opacity;
      scrollDown.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
    } else {
      scrollDown.style.opacity = '1';
      scrollDown.style.pointerEvents = 'auto';
    }
  }

  window.addEventListener('scroll', handleScroll);
});