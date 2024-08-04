document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.animate');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.1 }); // Ajuste o valor do threshold conforme necessário

  animateElements.forEach(element => {
    observer.observe(element);
  });
});