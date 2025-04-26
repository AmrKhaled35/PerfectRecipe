document.addEventListener('DOMContentLoaded', function() {
  const blogId = localStorage.getItem('selectedBlogId');
  
  if (!blogId) {
    window.location.href = '../Blog/blog.html';
    return;
  }

  const selectedBlog = recipeBlogPosts.find(post => post.id.toString() === blogId);
  
  if (!selectedBlog) {
    window.location.href = '../Blog/blog.html';
    return;
  }

  // Update the page content
  document.querySelector('.div1 h1').textContent = selectedBlog.title;
  document.querySelector('.div1 p').textContent = selectedBlog.intro;
  
  // Update author info
  const authorInfo = document.querySelector('.div1 .container1');
  authorInfo.querySelector('span:first-of-type').textContent = selectedBlog.author;
  authorInfo.querySelector('span:nth-of-type(2)').textContent = selectedBlog.date;
  
  // Update main image
  document.querySelector('.div2 img').src = `../../../Public/assets/blogImages/blog${blogId}.jpg`;
  
  // Update sections
  document.querySelector('.div3 h1').textContent = selectedBlog.sections.ingredients.heading;
  document.querySelector('.div3 p').textContent = selectedBlog.sections.ingredients.text;
  
  // Clear the stored ID
  localStorage.removeItem('selectedBlogId');
});