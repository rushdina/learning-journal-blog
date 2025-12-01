import {
  featuredBlog,
  nonFeaturedBlogs,
  renderBlogCards,
  renderFeaturedBlog,
} from "./utils.js";

/* ===== PAGINATION ===== */
let blogsPerBatch = 6;
let currentBatch = 1;

// ===== RENDER PAGINATED BLOGS =====
function renderBlogsBatch() {
  const endIndex = currentBatch * blogsPerBatch;
  const visibleBlogs = nonFeaturedBlogs.slice(0, endIndex);
  document.getElementById("grid").innerHTML = renderBlogCards(visibleBlogs);

  if (endIndex >= nonFeaturedBlogs.length) {
    const btn = document.getElementById("view-more");
    if (btn) btn.style.display = "none"; // hide button
  }
}

/* ===== INITIALIZE HOMEPAGE ===== */
const featuredContainer = document.getElementById("featured-container");
if (featuredContainer)
  featuredContainer.innerHTML = renderFeaturedBlog(featuredBlog);

renderBlogsBatch();

const viewMoreBtn = document.getElementById("view-more");
if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    currentBatch++;
    renderBlogsBatch();
  });
}
