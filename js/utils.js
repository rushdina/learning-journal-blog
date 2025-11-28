// ===== IMPORT DATA =====
import { blogData } from "./blogData.js";

// ===== SHARED FUNCTIONS =====
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ===== RENDER BLOG CARDS used for homepage & recent blogs) =====
export function renderBlogCards(arr, limit) {
  const blogsToRender = limit ? arr.slice(0, limit) : arr;
  return blogsToRender
    .map(
      ({ title, preview, date, tags, image, imageAlt, slug }) => `
      <a href="blog.html?slug=${slug}">
        <article class="blog-card">
          <span class="blog-date">${formatDate(date)}</span> 
          <img class="blog-img" src="${image}" alt="${imageAlt}" /> 
          <h2 class="blog-title">${title}</h2>
          <p class="blog-preview">${preview}</p>
          <p class="blog-tags">${tags.join(" · ")}</p>
        </article>
      </a>
    `
    )
    .join("");
}

// ===== RENDER FEATURED BLOG =====
export function renderFeaturedBlog(blog) {
  if (!blog) return "";
  const { slug, title, preview, date, tags, image, imageAlt } = blog;
  return `
    <a href="blog.html?slug=${slug}">
      <article class="featured-blog">
        <span class="featured-date">${formatDate(date)}</span> 
        <img class="featured-img" src="${image}" alt="${imageAlt}" /> 
        <h2 class="featured-title">${title}</h2>
        <p class="featured-preview">${preview}</p>
        <p class="featured-tags">${tags.join(" · ")}</p>
      </article>
    </a>
  `;
}

// Sort blogs by descending date (latest first)
export const blogs = [...blogData].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

// ===== FILTERS =====
export const featuredBlog = blogs.find((b) => b.isFeatured);
export const nonFeaturedBlogs = blogs.filter((b) => !b.isFeatured);
