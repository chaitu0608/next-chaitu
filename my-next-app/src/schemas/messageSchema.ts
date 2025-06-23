import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message content is required" })
    .max(500, { message: "Message must not exceed 500 characters" }),
  recipientEmail: z
    .string()
    .email({ message: "Invalid recipient email address" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(100, { message: "Subject must not exceed 100 characters" }),
  isAnonymous: z.boolean().default(false),
});

export type MessageSchema = z.infer<typeof messageSchema>;
