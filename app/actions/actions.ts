"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/db";
import { bookValidationSchema, updateBookSchema } from "../schemas/bookSchemas";
import Book from "../models/Book";
import { cookies } from "next/headers";

export interface ActionResponse {
  success: boolean;
  message: string;
  bookTitle?: string;
}

async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let token = cookieStore.get("library_user_session")?.value;

  if (!token) {
    token = crypto.randomUUID();
    cookieStore.set("library_user_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }
  return token;
}

export async function addBookToReadingList(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    await connectDB();
    const token = await getOrCreateSessionId();

    const rawData = {
      openLibraryKey: formData.get("openLibraryKey") as string,
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      publishYear: Number(formData.get("publishYear")),
      coverUrl: formData.get("coverUrl") as string,
    };

    const validated = bookValidationSchema.safeParse(rawData);
    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    const existing = await Book.findOne({
      openLibraryKey: validated.data.openLibraryKey,
      userId: token,
    });
    if (existing) {
      return {
        success: false,
        message: "This book is already in your reading list.",
      };
    }

    await Book.create({ ...validated.data, userId: token });
    revalidatePath("/reading-list");
    return {
      success: true,
      message: `"${validated.data.title}" successfully added!`,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error: connection rejected." };
  }
}

export async function removeBookFromReadingList(
  id: string,
): Promise<ActionResponse> {
  try {
    await connectDB();
    const token = await getOrCreateSessionId();

    const deleted = await Book.deleteOne({ _id: id, userId: token });
    if (!deleted) {
      return {
        success: false,
        message: "Unauthorized request or record missing.",
      };
    }

    revalidatePath("/reading-list");
    return { success: true, message: "Removed volume from your list." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to remove entry from database storage.",
    };
  }
}

export async function updateBookInReadingList(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    await connectDB();
    const token = await getOrCreateSessionId();

    const rawData = {
      id: formData.get("id") as string,
      readingStatus: formData.get("readingStatus") as string,
      personalNotes: formData.get("personalNotes") as string,
    };

    const validated = updateBookSchema.safeParse(rawData);
    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    const { id, readingStatus, personalNotes } = validated.data;
    const updated = await Book.findOneAndUpdate(
      { _id: id, userId: token },
      { readingStatus, personalNotes },
      { new: true },
    );

    if (!updated) {
      return {
        success: false,
        message: "Unauthorized update request or document missing.",
      };
    }

    revalidatePath("/reading-list");
    return {
      success: true,
      message: "Successfully updated reading status logs!",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to store record parameters." };
  }
}

export async function handleReadingListDeleteAction(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const recordId = formData.get("id") as string;
  return await removeBookFromReadingList(recordId);
}
