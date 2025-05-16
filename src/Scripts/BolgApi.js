function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}
async function loadBlogs() {
  try {
    const res = await fetch("https://omarsaberawad.pythonanywhere.com/blogs/lists/");
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const blogs = await res.json();
    const bigCardContainer = document.querySelector(".big-card-container");
    const smallCardsContainer = document.querySelector(".small-cards");
    bigCardContainer.innerHTML = "";
    smallCardsContainer.innerHTML = "";
    const firstBlog = blogs[0];
    bigCardContainer.innerHTML = `
      <div class="big-card">
        <div class="content">
          <span class="date">${formatDate(firstBlog.created_at)}</span>
          <h2 class="title">${firstBlog.title}</h2>
          <p class="excerpt">${firstBlog.content.substring(0, 150)}...</p>
          <button class="read-more" onclick="location.href='../BlogDetails/BlogDetails.html?id=${firstBlog.id}'">Read more →</button>
        </div>
        <div class="image">
          <a href="../BlogDetails/BlogDetails.html?id=${firstBlog.id}" class="clickable-area" data-blog-id="${firstBlog.id}">
            <img src="https://omarsaberawad.pythonanywhere.com${firstBlog.image}" alt="${firstBlog.title}">
          </a>
        </div>
      </div>`;
    blogs.slice(1).forEach(blog => {
      smallCardsContainer.innerHTML += `
        <div class="card">
          <div class="image">
            <a href="../BlogDetails/BlogDetails.html?id=${blog.id}" class="clickable-area" data-blog-id="${blog.id}">
              <img src="https://omarsaberawad.pythonanywhere.com${blog.image}" alt="${blog.title}">
            </a>
          </div>
          <div class="content">
            <span class="date">${formatDate(blog.created_at)}</span>
            <h3 class="title">${blog.title}</h3>
            <p class="excerpt">${blog.content.substring(0, 100)}...</p>
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
  }
}
window.addEventListener("DOMContentLoaded", loadBlogs);
