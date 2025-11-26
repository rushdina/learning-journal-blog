import { blogData, formatDate } from "./blogData.js";

const blogs = blogData.sort((a, b) => new Date(b.date) - new Date(a.date)); // descending dates

/* ===== Pagination Logic =====*/
let blogsPerBatch = 6; // show 6 at a time
let currentBatch = 1;

const nonFeaturedBlogs = blogs.filter((p) => !p.isFeatured); // return array

function renderBlogsBatch() {
  const endIndex = currentBatch * blogsPerBatch;
  const visibleBlogs = nonFeaturedBlogs.slice(0, endIndex); // (start, stop before endIndex)
  document.getElementById("grid").innerHTML = renderBlogs(visibleBlogs);
  if (endIndex >= nonFeaturedBlogs.length) {
    document.getElementById("view-more").style.display = "none"; // Hide button if no more posts
  }
}

/* ===== Render Featured Blog =====*/
function renderFeaturedBlog(arr) {
  const featuredBlog = arr.find((p) => p.isFeatured); // first featured element
  if (!featuredBlog) return ""; // nothing to render if none
  const { title, preview, date, tags, image, imageAlt } = featuredBlog;
  return `
    <article class="featured-blog">
      <span class="featured-date">${formatDate(date)}</span> 
      <img class="featured-img" src="${image}" alt="${imageAlt}" /> 
      <h2 class="featured-title">${title}</h2>
      <p class="featured-preview">${preview}</p>
      <p class="featured-tags">${tags.join(" · ")}</p>
    </article>
    `;
}

/* ===== Render Bloglist Previews =====*/
function renderBlogs(arr) {
  const blogs = arr.filter((b) => !b.isFeatured);
  return blogs
    .map((b) => {
      const { slug, title, preview, date, tags, image, imageAlt } = b;
      return `
        <a href="blog.html?slug="${slug}">
          <article class="blog-card">
            <span class="blog-date">${formatDate(date)}</span> 
            <img class="blog-img" src="${image}" alt="${imageAlt}" /> 
            <h2 class="blog-title">${title}</h2>
            <p class="blog-preview">${preview}</p>
            <p class="blog-tags">${tags.join(" · ")}</p>
          </article>
        </a>
      `;
    })
    .join("");
}

/* ===== Render Three Recent Blogs =====*/
function renderRecentBlogs(arr) {
  // const recent = arr.slice(-3).reverse(); // return array with 3 latest blogs in the array, reverse means latest(last) blog first
  const recent = blogs.slice(0, 3); // the first 3 descending dates
  return recent
    .map(({ slug, title, preview, date, tags, image, imageAlt }) => {
      return `
        <a href="blog.html?slug="${slug}">
          <article class="blog-card">
            <span class="blog-date">${formatDate(date)}</span> 
            <img class="blog-img" src="${image}" alt="${imageAlt}" /> 
            <h2 class="blog-title">${title}</h2>
            <p class="blog-preview">${preview}</p>
            <p class="blog-tags">${tags.join(" · ")}</p>
          </article>
        </a>
      `;
    })
    .join("");
}

/* ====== Event Batcheners =====*/
document.getElementById("view-more").addEventBatchener("click", function () {
  currentBatch++;
  renderBlogsBatch();
});

/* ===== Initialize =====*/
document.getElementById("featured-container").innerHTML =
  renderFeaturedBlog(blogs);
renderBlogsBatch(); // show first 6 blogs
document.getElementById("recent-blogs").innerHTML = renderRecentBlogs(blogData);
