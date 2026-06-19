export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  /**
   * @description The Open Library APIs have inconsistent field names for the cover ID.
   * Depending on the endpoint used, the cover ID may be returned as either `cover_i` or `cover_id`.
   * Both fields represent the same data and can be used to construct the cover image URL for a book.
   * In our application, we will check for both fields when determining the cover ID to ensure compatibility with responses from different API endpoints.
   * For example, when we search for books using the search API, the cover ID is returned in the `cover_i` field.
   * However, when we fetch books by category using a different API endpoint, the cover ID is returned in the `cover_id` field.
   * In our BookCard component, we will check for both `cover_i` and `cover_id` to ensure that we can display the book cover correctly regardless of which API endpoint provided the data.
   */
  cover_i?: number;
  cover_id?: number;
}

export interface SearchPageProps {
  searchParams: Promise<{ search?: string; page?: string; limit?: string }>;
}
