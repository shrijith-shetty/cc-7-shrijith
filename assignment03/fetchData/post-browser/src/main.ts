/**
 * Entry point for Post Browser UI.
 * Handles rendering posts, comments, navigation, and cache invalidation.
 */

import { APIService } from "./service/APIService";
import { CacheService } from "./service/cacheService";
import { ModelManager } from "./service/modelManager";
import type { Post, Comments } from "./service/type";

/** @type {APIService} API instance */
const api = new APIService();

/** @type {CacheService<Post>} Cache for posts */
const postCache = new CacheService<Post>();

/** @type {CacheService<Comments[]>} Cache for comments */
const commentCache = new CacheService<Comments[]>();

/** @type {ModelManager} Data manager handling API + cache */
const manager = new ModelManager(api, postCache, commentCache);

/** @type {number} Current post ID */
let currentPostId = 1;

/** @type {number} Total number of posts available */
const totalPosts = 10;

/** @type {HTMLHeadingElement} */
const title = document.getElementById("post-title") as HTMLHeadingElement;

/** @type {HTMLParagraphElement} */
const content = document.getElementById("post-content") as HTMLParagraphElement;

/** @type {HTMLSpanElement} */
const counter = document.getElementById("counter") as HTMLSpanElement;

/** @type {HTMLDivElement} */
const postContent = document.getElementById(
  "post-text-content",
) as HTMLDivElement;

/** @type {HTMLDivElement} */
const loader = document.getElementById("post-loader") as HTMLDivElement;

/** @type {HTMLDivElement} */
const commentsContainer = document.getElementById(
  "comments-container",
) as HTMLDivElement;

/** @type {HTMLButtonElement} */
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

/** @type {HTMLButtonElement} */
const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;

/** @type {HTMLButtonElement} */
const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;

/** @type {HTMLButtonElement} */
const commentsBtn = document.getElementById(
  "comments-btn",
) as HTMLButtonElement;

/** @type {HTMLDivElement} */
const errorEl = document.getElementById("error-message") as HTMLDivElement;

/**
 * Loads and renders a post
 *
 * @param {number} id - Post ID to load
 * @returns {Promise<void>}
 */
async function loadPost(id: number): Promise<void> {
  // Show loader and reset UI
  loader.classList.remove("hidden");
  errorEl.classList.add("hidden");
  title.textContent = "Loading...";
  content.textContent = "";

  try {
    const post = await manager.getPost(id);
    loader.classList.add("hidden");
    errorEl.classList.add("hidden");
    title.textContent = post.title;
    content.textContent = post.body;
    counter.textContent = id.toString();
  } catch (err) {
    loader.classList.add("hidden");
    errorEl.textContent = "Failed to load post";
    errorEl.classList.remove("hidden");
    title.textContent = "";
    content.textContent = "";
  }
}

/**
 * Loads and renders comments for a given post
 *
 * @param {number} id - Post ID
 * @returns {Promise<void>}
 */
async function loadComments(id: number): Promise<void> {
  try {
    const comments: Comments[] = await manager.getComments(id, 5);

    commentsContainer.innerHTML = "";

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

      div.addEventListener("click", () => {
        div.classList.toggle("active");
      });

      commentsContainer.appendChild(div);
    });

    commentsContainer.classList.remove("hidden");
  } catch {
    commentsContainer.innerHTML = `
      <div class="comment-error">Failed to load comments.</div>
    `;
    commentsContainer.classList.remove("hidden");
  }
}

/**
 * Event listener for "Next" button
 * Moves to the next post if available
 */
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
prevBtn.addEventListener("click", () => {
  if (currentPostId > 1) {
    currentPostId--;
    loadPost(currentPostId);
  }
});

/**
 * Event listener for "Refresh" button
 * Clears cache and reloads current post
 */
refreshBtn.addEventListener("click", async () => {
  postCache.delete(`post-${currentPostId}`);
  commentCache.delete(`comments-${currentPostId}`);
  await loadPost(currentPostId);
});

/**
 * Event listener for "Comments" button
 * Toggles visibility of comments section
 */
commentsBtn.addEventListener("click", () => {
  if (commentsContainer.classList.contains("hidden")) {
    loadComments(currentPostId);
  } else {
    commentsContainer.classList.add("hidden");
  }
});

/**
 * Initial load of the first post
 */
loadPost(currentPostId);
