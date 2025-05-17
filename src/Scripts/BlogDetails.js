document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  if (!blogId) {
    window.location.href = '../Blog/blog.html';
    return;
  }
  try {
    const response = await fetch(`https://omarsaberawad.pythonanywhere.com/blogs/lists/${blogId}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    const blogData = await response.json();
    const titleElement = document.querySelector('.div1 h1');
    const contentElement = document.querySelector('.div1 p');
    const authorElement = document.querySelector('.div1 .container1 span:first-of-type');
    const dateElement = document.querySelector('.div1 .container1 span:nth-of-type(2)');
    const imageElement = document.querySelector('.div2 img');
    if (titleElement) titleElement.textContent = blogData.title;
    if (contentElement) contentElement.textContent = blogData.content;
    if (authorElement) authorElement.textContent = "Chef Omar"; 
    if (dateElement) dateElement.textContent = formatDate(blogData.created_at);
    if (imageElement) imageElement.src = `https://omarsaberawad.pythonanywhere.com${blogData.image}`;
    const ingredientsSection = document.querySelector('.div3');
    if (ingredientsSection) ingredientsSection.style.display = 'none';
  } catch (error) {
    console.error('Error loading blog post:', error);
    window.location.href = '../Blog/blog.html';
  }
});
function formatDate(isoDate) {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return "Unknown date";
  }
}