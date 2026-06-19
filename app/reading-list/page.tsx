import { cookies } from "next/headers";
import { connectDB } from "../lib/db";
import Book from "../models/Book";
import ReadingListClient from "./ReadingListClient";
import { SearchPageProps } from "../types";

interface SerializedBook {
  id: string;
  title: string;
  author: string;
  publishYear: number;
  coverUrl?: string;
  readingStatus: "Unread" | "Reading" | "Completed";
  personalNotes?: string;
}

export default async function ReadingListPage({
  searchParams,
}: SearchPageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const itemsLimit = Math.max(5, Number(resolvedParams.limit) || 10);

  let savedBooks: SerializedBook[] = [];
  let totalSavedCount = 0;
  let errorMsg = "";

  const cookieStore = await cookies();
  const userToken =
    cookieStore.get("library_user_session")?.value || "NON_EXISTENT_TOKEN";

  try {
    await connectDB();
    totalSavedCount = await Book.countDocuments({ userId: userToken });

    const booksFromDb = await Book.find({ userId: userToken })
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * itemsLimit)
      .limit(itemsLimit);

    savedBooks = booksFromDb.map((book) => {
      let status: "Unread" | "Reading" | "Completed" = "Unread";
      if (
        book.readingStatus === "Reading" ||
        book.readingStatus === "Completed"
      ) {
        status = book.readingStatus;
      }

      return {
        id: book._id.toString(),
        title: book.title || "Untitled Book",
        author: book.author || "Unknown Author",
        publishYear: Number(book.publishYear) || 0,
        coverUrl: book.coverUrl || undefined,
        readingStatus: status,
        personalNotes: book.personalNotes || "",
      };
    });
  } catch (err) {
    console.error("Database connection failure:", err);
    errorMsg =
      "Database Connection Failure: Unable to fetch personal bookshelf collections.";
  }

  const totalPages = Math.ceil(totalSavedCount / itemsLimit);

  return (
    <ReadingListClient
      initialBooks={savedBooks}
      currentPage={currentPage}
      totalPages={totalPages}
      currentLimit={itemsLimit}
      errorMsg={errorMsg}
    />
  );
}
