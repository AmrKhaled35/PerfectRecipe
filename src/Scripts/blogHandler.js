document.addEventListener('DOMContentLoaded', function() {
    const blogLinks = document.querySelectorAll('.clickable-area');
    
    blogLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const blogId = this.getAttribute('data-blog-id');
        
        // Store the ID in localStorage
        localStorage.setItem('selectedBlogId', blogId);
        
        // Navigate to details page
        window.location.href = this.getAttribute('href');
      });
    });
  });