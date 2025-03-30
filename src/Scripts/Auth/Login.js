document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    if (!signinForm) return;
    const formGroups = signinForm.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${(index + 1) * 0.1}s`;
      group.classList.add('animate-in');
    });
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = signinForm.querySelector('.submit-btn');
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
      console.log('Sign In form submitted');
    });
  
    const showSignup = document.getElementById('show-signup');
    const showForgot = document.getElementById('show-forgot');
    const submit = document.getElementById('submit');
    if (showSignup) {
      showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'Register.html';
      });
    }
  
    if (showForgot) {
      showForgot.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'ForgetPass.html';
      });
    }
  });

  document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    window.location.href = '../Landing/Landing.html';
  });
  
  