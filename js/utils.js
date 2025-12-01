// ===== IMPORT DATA =====
import { blogData } from "./blogData.js";

// ===== SHARED FUNCTIONS =====
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // long will be November, short is Nov
    day: "numeric",
  });
}

// ===== RENDER BLOG CARDS used for homepage & recent blogs) =====
export function renderBlogCards(arr, headingLevel = "h2") {
  return arr
    .map(
      ({ title, preview, date, tags, image, imageAlt, slug }) => `
        <article class="blog-card">
          <img class="blog-img" src="${image}" alt="${imageAlt}" /> 
          <span class="blog-date date">${formatDate(date)}</span> 
          <${headingLevel} class="blog-title title">${title}</${headingLevel}>
          <p class="blog-preview">${preview}</p>
          <p class="blog-tags tags">${tags.join(" · ")}</p>
          <a href="blog.html?slug=${slug}" class="blog-card-link" aria-label="Read full blog post: ${title}"></a>
        </article>
      `
    )
    .join("");
}

// ===== RENDER FEATURED BLOG =====
export function renderFeaturedBlog(blog) {
  if (!blog) return "";
  const { slug, title, preview, date, tags, image, imageAlt } = blog;
  return `
    <article class="featured-blog">
      <img class="featured-img" src="${image}" alt="${imageAlt}" /> 
      <div class="container">
        <div class="featured-text">
          <span class="featured-date date">${formatDate(date)}</span> 
          <h2 class="featured-title title">${title}</h2>
          <p class="featured-preview">${preview}</p>
          <p class="featured-tags tags">${tags.join(" · ")}</p>
        </div>
      </div>
      <!-- overlay link for full clickable area -->
      <a href="blog.html?slug=${slug}" class="featured-link" aria-label="Read full blog post: ${title}"></a>
    </article>
  `;
}

// ===== RENDER RECENT BLOGS =====
export function renderRecentBlogs(containerId, currentSlug = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const recentBlogs = blogs
    .filter((b) => b.slug !== currentSlug) // exclude current blog if slug provided
    .slice(0, 3);

  container.innerHTML = renderBlogCards(recentBlogs, "h3");
}

// Sort blogs by descending date (latest first)
export const blogs = [...blogData].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

// ===== FILTERS =====
export const featuredBlog = blogs.find((b) => b.isFeatured);
export const nonFeaturedBlogs = blogs.filter((b) => !b.isFeatured);
