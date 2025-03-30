document.addEventListener('DOMContentLoaded', () => {
    const forgotForm = document.getElementById('forgot-form');
    if (!forgotForm) return;
  
    const formGroups = forgotForm.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${(index + 1) * 0.1}s`;
      group.classList.add('animate-in');
    });
  
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = forgotForm.querySelector('.submit-btn');
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
      console.log('Reset password form submitted');
    });
  
    const backToSignin = document.getElementById('back-to-signin');
    if (backToSignin) {
      backToSignin.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'Login.html';
      });
    }
  });
  