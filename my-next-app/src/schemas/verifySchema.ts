import { z } from "zod";

export const verifySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  verificationCode: z
    .string()
    .length(6, {
      message: "Verification code must be exactly 6 characters long",
    }),
});

export type VerifySchema = z.infer<typeof verifySchema>;
