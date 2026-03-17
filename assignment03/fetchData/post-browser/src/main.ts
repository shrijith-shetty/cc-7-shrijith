/**
 * Entry point for Post Browser UI.
 * Handles rendering posts, comments, navigation, and cache invalidation.
 */

import { APIService } from "./service/APIService";
import { cacheService } from "./service/cacheService";
import { ModelManager } from "./service/modelManager";
import type { Post, Comments } from "./service/type";

/** API service instance for network calls */
const api = new APIService();

/** Cache for storing posts */
const postCache = new cacheService<Post>();

/** Cache for storing comments */
const commentCache = new cacheService<Comments[]>();

/**
 * ModelManager instance
 * Acts as a single interface to fetch data (API + Cache)
 */
const manager = new ModelManager(api, postCache, commentCache);

/** Tracks current post ID */
let currentPostId = 1;

/** Total number of posts available */
let totalPosts = 10;

// HTML elements

/** Post title element */
const title = document.getElementById("post-title") as HTMLHeadingElement;

/** Post content element */
const content = document.getElementById("post-content") as HTMLParagraphElement;

/** Post counter element */
const counter = document.getElementById("counter") as HTMLSpanElement;

/** Comment section container */
const commentSection = document.getElementById(
  "comment-section",
) as HTMLDivElement;

/** Next button */
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

/** Back button */
const backBtn = document.getElementById("back-btn") as HTMLButtonElement;

/** Refresh button */
const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;

/** Toggle comments button */
const commentBtn = document.getElementById("comment-btn") as HTMLButtonElement;

/**
 * Loads and renders a post by ID
 *
 * @param {number} id - Post ID to load
 * @returns {Promise<void>}
 */
async function loadPost(id: number): Promise<void> {
  const post = await manager.getPost(id);

  title.textContent = post.title;
  content.textContent = post.body;
  counter.textContent = id.toString();

  // Reset comments UI
  commentSection.classList.add("hidden");
  commentSection.innerHTML = "";

  // Disable navigation buttons at boundaries
  backBtn.disabled = id === 1;
  nextBtn.disabled = id === totalPosts;
}

/**
 * Loads and renders comments for a given post
 *
 * @param {number} id - Post ID
 * @returns {Promise<void>}
 */
async function loadComments(id: number): Promise<void> {
  const comments = await manager.getComments(id, 5);

  commentSection.innerHTML = "";

  // Handle failure case
  if (comments.length === 0) {
    commentSection.innerHTML = `
      <div class="comment-error">Failed to load comments.</div>
    `;
    commentSection.classList.remove("hidden");
    return;
  }

  // Render comments
  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment-box";

    div.innerHTML = `
      <div class="comment-author">${c.name}</div>
      <div class="comment-text">${c.body}</div>
    `;

    /**
     * Toggles expanded state of a comment
     */
    div.addEventListener("click", () => {
      div.classList.toggle("active");
    });

    commentSection.appendChild(div);
  });

  commentSection.classList.remove("hidden");
}

/**
 * Handles navigation to next post
 */
nextBtn.addEventListener("click", () => {
  if (currentPostId < totalPosts) {
    currentPostId++;
    loadPost(currentPostId);
  }
});

/**
 * Handles navigation to previous post
 */
backBtn.addEventListener("click", () => {
  if (currentPostId > 1) {
    currentPostId--;
    loadPost(currentPostId);
  }
});

/**
 * Refreshes current post by clearing cache
 * and re-fetching data
 */
refreshBtn.addEventListener("click", async () => {
  postCache.delete(`post-${currentPostId}`);
  commentCache.delete(`comments-${currentPostId}`);
  await loadPost(currentPostId);
});

/**
 * Toggles comment visibility
 * Loads comments if not already visible
 */
commentBtn.addEventListener("click", () => {
  if (commentSection.classList.contains("hidden")) {
    loadComments(currentPostId);
  } else {
    commentSection.classList.add("hidden");
  }
});

/**
 * Initial load of the first post
 */
loadPost(currentPostId);