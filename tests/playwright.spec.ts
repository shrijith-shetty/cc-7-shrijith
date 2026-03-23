import { test, expect } from "@playwright/test";

test.describe("Post Browser App", () => {
  test("page has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Post Browser/);
  });

  test("first post loads correctly", async ({ page }) => {
    await page.goto("/");

    const loader = page.locator("#post-loader");
    const postContainer = page.locator("#post-text-content");

    // Poll until loader disappears
    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);

    // Poll until post container is visible
    await expect
      .poll(() => postContainer.isVisible(), {
        timeout: 15000,
        intervals: [250],
      })
      .toBe(true);
  });

  test("next and previous buttons navigate posts", async ({ page }) => {
    await page.goto("/");

    const loader = page.locator("#post-loader");
    const postContainer = page.locator("#post-text-content");
    const nextBtn = page.locator("#next-btn");
    const prevBtn = page.locator("#prev-btn");

    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);
    await expect
      .poll(() => postContainer.isVisible(), {
        timeout: 15000,
        intervals: [250],
      })
      .toBe(true);

    const firstPostText = await postContainer.textContent();

    // Try clicking prevBtn on first post: post should NOT change
    await prevBtn.click();
    await expect
      .poll(() => postContainer.textContent(), {
        timeout: 15000,
        intervals: [250],
      })
      .toBe(firstPostText);

    // Click next to go to second post
    await nextBtn.click();
    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);

    const secondPostText = await postContainer.textContent();
    expect(secondPostText).not.toBe(firstPostText);

    // Navigate to last post safely: loop until post text stops changing
    let previousText: string | null = secondPostText;
    let currentText: string | null = previousText;

    do {
      previousText = currentText;
      await nextBtn.click();
      await expect
        .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
        .toBe(true);
      currentText = await postContainer.textContent();
    } while (currentText !== previousText);

    const lastPostText = currentText;

    // Try clicking next on last post: should NOT change
    await nextBtn.click();
    await expect
      .poll(() => postContainer.textContent(), {
        timeout: 15000,
        intervals: [250],
      })
      .toBe(lastPostText);

    // Click previous to go back one post
    await prevBtn.click();
    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);

    const backOnePostText = await postContainer.textContent();
    expect(backOnePostText).not.toBe(lastPostText);
  });

  test("refresh button reloads current post", async ({ page }) => {
    await page.goto("/");

    const loader = page.locator("#post-loader");
    const postContainer = page.locator("#post-text-content");
    const refreshBtn = page.locator("#refresh-btn");

    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);
    await expect
      .poll(() => postContainer.isVisible(), {
        timeout: 15000,
        intervals: [250],
      })
      .toBe(true);

    const firstPostText = await postContainer.textContent();

    await refreshBtn.click();
    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);

    const refreshedPostText = await postContainer.textContent();
    expect(refreshedPostText).toBe(firstPostText);
  });

  test("comments button loads comments", async ({ page }) => {
    await page.goto("/");

    const loader = page.locator("#post-loader");
    const commentsContainer = page.locator("#comments-container");
    const commentsBtn = page.locator("#comments-btn");

    await expect
      .poll(() => loader.isHidden(), { timeout: 15000, intervals: [250] })
      .toBe(true);

    await expect
      .poll(() => commentsContainer.textContent(), {
        timeout: 15000,
        intervals: [250],
      })
      .toBe("");

    // Click comments button
    await commentsBtn.click();

    // Wait until comments appear
    await expect
      .poll(() => commentsContainer.textContent(), {
        timeout: 15000,
        intervals: [250],
      })
      .not.toBe("");
  });
});
