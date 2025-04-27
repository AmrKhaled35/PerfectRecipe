const profileIcon = document.querySelector('.profile-icon');
const profileContainer = document.querySelector('.profile-container');
const logoutButton = document.querySelector('.logout-button');



profileIcon.addEventListener('click', (e) => {
e.preventDefault();
profileContainer.classList.toggle('active');
});
document.addEventListener('click', (e) => {
if (!profileContainer.contains(e.target) && !profileIcon.contains(e.target)) {
    profileContainer.classList.remove('active');
}
});
