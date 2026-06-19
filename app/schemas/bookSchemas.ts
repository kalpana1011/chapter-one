import { z } from "zod";

export const bookValidationSchema = z.object({
  openLibraryKey: z
    .string()
    .min(1, "OpenLibrary base key signature code is required"),
  title: z
    .string()
    .min(1, "Book title payload entry cannot be processed empty"),
  author: z.string().default("Unknown Author"),
  publishYear: z.number().int().optional().default(0),
  coverUrl: z.string().url().or(z.string().length(0)).optional().default(""),
});

export type BookInput = z.infer<typeof bookValidationSchema>;

export const updateBookSchema = z.object({
  id: z.string().min(1, "Target database document ID is required"),
  readingStatus: z.enum(["Unread", "Reading", "Completed"]),
  personalNotes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .default(""),
});

export type UpdateBookInput = z.infer<typeof updateBookSchema>;
