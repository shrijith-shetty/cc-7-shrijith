/**
 * Represents a blog post returned from the API.
 */
export interface Post {
  /** ID of the user who created the post */
  userId: number;

  /** Unique identifier of the post */
  id: number;

  /** Title of the post */
  title: string;

  /** Content/body of the post */
  body: string;
}

/**
 * Represents a comment on a post.
 */
export interface Comments {
  /** ID of the post to which the comment belongs */
  postId: number;

  /** Unique identifier of the comment */
  id: number;

  /** Name of the commenter */
  name: string;

  /** Email address of the commenter */
  email: string;

  /** Content/body of the comment */
  body: string;
}
