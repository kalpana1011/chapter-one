import { Schema, Document, type Model, models, model } from "mongoose";

export interface BookInterface extends Document {
  openLibraryKey: string;
  userId: string;
  title: string;
  author: string;
  publishYear: number;
  coverUrl: string;
  readingStatus: "Unread" | "Reading" | "Completed";
  personalNotes: string;
}

const BookSchema: Schema<BookInterface> = new Schema(
  {
    openLibraryKey: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    author: { type: String, default: "Unknown Author" },
    publishYear: { type: Number, default: 0 },
    coverUrl: { type: String, default: "" },
    readingStatus: {
      type: String,
      enum: ["Unread", "Reading", "Completed"],
      default: "Unread",
    },
    personalNotes: { type: String, default: "" },
  },
  { timestamps: true },
);

const Book: Model<BookInterface> =
  models.Book || model<BookInterface>("Book", BookSchema);
export default Book;
