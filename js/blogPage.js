import { blogs, renderBlogCards, formatDate } from "./utils.js";

// ===== RENDER RECENT BLOGS =====
function renderRecentBlogs(currentSlug) {
  const recentBlogs = blogs.filter((b) => b.slug !== currentSlug).slice(0, 3);
  document.getElementById("recent-blogs").innerHTML =
    renderBlogCards(recentBlogs);
}

// ===== RENDER INDIVIDUAL BLOG PAGE =====
export function renderBlogPage() {
  const blogMain = document.getElementById("blog-main");
  if (!blogMain) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    blogMain.innerHTML = `<p>Blog not found.</p>`;
    return;
  }

  blogMain.innerHTML = `
    <section class="blog-content container">
      <p class="blog-date">${formatDate(blog.date)}</p>
      <h1>${blog.title}</h1>
      <img src="${blog.image}" alt="${blog.imageAlt}" class="blog-img"/>
      <div class="blog-content">${blog.content}</div>
      <p class="blog-tags">${blog.tags.join(" · ")}</p>
    </section>
  `;

  renderRecentBlogs(slug);
}

// Initialize blog page
renderBlogPage();
