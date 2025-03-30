document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;
    const formGroups = signupForm.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${(index + 1) * 0.1}s`;
      group.classList.add('animate-in');
    });
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = signupForm.querySelector('.submit-btn');
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
      console.log('Sign Up form submitted');
    });
  
    const showSignin = document.getElementById('show-signin');
    if (showSignin) {
      showSignin.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'Login.html';
      });
    }
  });
  