import { blogs, formatDate, renderRecentBlogs } from "./utils.js";

// ===== RENDER INDIVIDUAL BLOG PAGE =====
export function renderBlogPage() {
  const blogMain = document.getElementById("blog-main");
  if (!blogMain) return;

  const params = new URLSearchParams(window.location.search); // return query string: "?slug=starting-my-scrimba-journey"
  const slug = params.get("slug"); // gets the value of slug property from URL
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    blogMain.innerHTML = `<p>Blog not found.</p>`;
    return;
  }

  blogMain.innerHTML = `
    <div class="container">
      <article class="blog-post">
        <section class="blog-header page-header">
          <p class="blog-date date">${formatDate(blog.date)}</p>
          <h1 class="title">${blog.title}</h1>
          <p class="blog-preview">${blog.preview}</p>
        </section>

        <figure class="blog-hero-image">
          <img src="${blog.image}" alt="${blog.imageAlt}"/>
        </figure>

        <section class="blog-content content">
          ${blog.content}
        </section>

        <section class="blog-footer">
          <p class="blog-tags tags">Tags: ${blog.tags.join(" · ")}</p>
        </section>
      </article>
    `;

  renderRecentBlogs("recent-blogs", slug); // render recent blogs excluding current
}

/* ===== INITIALIZE BLOG PAGE ===== */
if (document.getElementById("blog-main")) renderBlogPage();
