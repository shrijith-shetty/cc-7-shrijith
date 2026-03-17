/* Entry point (ESM) - imports converted for browser module loader */
import { APIService } from "./service/APIService.js";
import { CacheService } from "./service/cacheService.js";
import { ModelManager } from "./service/modelManager.js";

/** @type {APIService} API instance */
const api = new APIService();
/** @type {CacheService<Post>} Cache for posts */
const postCache = new CacheService();
/** @type {CacheService<Comments[]>} Cache for comments */
const commentCache = new CacheService();
/** @type {ModelManager} Data manager handling API + cache */
const manager = new ModelManager(api, postCache, commentCache);
/** @type {number} Current post ID */
let currentPostId = 1;
/** @type {number} Total number of posts available */
const totalPosts = 10;

// Query DOM once and validate
const title = document.getElementById("post-title");
const content = document.getElementById("post-content");
const counter = document.getElementById("counter");
const commentSection = document.getElementById("comment-section");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const refreshBtn = document.getElementById("refresh-btn");
const commentBtn = document.getElementById("comment-btn");
const errorEl = document.getElementById("error-message");

if (
  !title ||
  !content ||
  !counter ||
  !commentSection ||
  !nextBtn ||
  !backBtn ||
  !refreshBtn ||
  !commentBtn ||
  !errorEl
) {
  console.error(
    "Post Browser: required DOM elements not found. Check index.html IDs.",
  );
}
/**
 * Loads and renders a post
 *
 * @param {number} id - Post ID to load
 * @returns {Promise<void>}
 */
async function loadPost(id) {
  try {
    if (errorEl) errorEl.classList.add("hidden");
    if (title) title.textContent = "Loading...";
    if (content) content.textContent = "";

    const post = await manager.getPost(id);

    if (errorEl) errorEl.classList.add("hidden");
    if (title) title.textContent = post.title;
    if (content) content.textContent = post.body;
    if (counter) counter.textContent = String(id);
    console.log(`Loaded post ${id}:`, post.title);
    // Update navigation button states after loading
    updateNavButtons();
  } catch (err) {
    console.error("Failed to load post", err);
    if (errorEl) {
      errorEl.textContent = "Failed to load post";
      errorEl.classList.remove("hidden");
    }
    if (title) title.textContent = "";
    if (content) content.textContent = "";
  }
}

/**
 * Enable/disable navigation buttons based on `currentPostId`.
 */
function updateNavButtons() {
  if (backBtn) backBtn.disabled = currentPostId <= 1;
  if (nextBtn) nextBtn.disabled = currentPostId >= totalPosts;
}
/**
 * Loads and renders comments for a given post
 *
 * @param {number} id - Post ID
 * @returns {Promise<void>}
 */
async function loadComments(id) {
  try {
    const comments = await manager.getComments(id, 5);

    if (!commentSection) return;
    commentSection.innerHTML = "";

    if (!comments || comments.length === 0) {
      throw new Error("No comments");
    }

    comments.forEach((c) => {
      const div = document.createElement("div");
      div.className = "comment-box";

      div.innerHTML = `
        <div class="comment-author">${c.name}</div>
        <div class="comment-text">${c.body}</div>
      `;

      div.addEventListener("click", () => div.classList.toggle("active"));
      commentSection.appendChild(div);
    });

    commentSection.classList.remove("hidden");
  } catch (err) {
    console.error("Failed to load comments", err);
    if (commentSection) {
      commentSection.innerHTML = `
      <div class="comment-error">Failed to load comments.</div>
    `;
      commentSection.classList.remove("hidden");
    }
  }
}
/**
 * Event listener for "Next" button
 * Moves to the next post if available
 */
if (nextBtn)
  nextBtn.addEventListener("click", () => {
    if (currentPostId < totalPosts) {
      currentPostId++;
      loadPost(currentPostId);
    }
  });
/**
 * Event listener for "Back" button
 * Moves to the previous post if available
 */
if (backBtn)
  backBtn.addEventListener("click", () => {
    if (currentPostId > 1) {
      currentPostId--;
      loadPost(currentPostId);
    }
  });
/**
 * Event listener for "Refresh" button
 * Clears cache and reloads current post
 */
if (refreshBtn)
  refreshBtn.addEventListener("click", async () => {
    postCache.delete(`post-${currentPostId}`);
    commentCache.delete(`comments-${currentPostId}`);
    await loadPost(currentPostId);
  });
/**
 * Event listener for "Comments" button
 * Toggles visibility of comments section
 */
if (commentBtn)
  commentBtn.addEventListener("click", () => {
    if (!commentSection) return;
    if (commentSection.classList.contains("hidden")) {
      loadComments(currentPostId);
    } else {
      commentSection.classList.add("hidden");
    }
  });
/**
 * Initial load of the first post
 */
// Kick off initial load
loadPost(currentPostId).catch((e) => console.error("Initial load failed", e));
