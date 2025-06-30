import {
  Body,
  Container,
  Html,
  Head,
  Heading,
  Hr,
  Preview,
  Section,
  Text,
  Button,
  Font,
  Link,
} from "@react-email/components";
import * as React from "react";

// Add this line for better email client compatibility
// @ts-ignore
export const contentType = "text/html";

// Email-safe colors
const colors = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  text: "#111827",
  muted: "#6B7280",
  light: "#E5E7EB",
};

// Email-safe styles
const bodyStyle: React.CSSProperties = {
  backgroundColor: colors.background,
  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: 0,
};

const containerStyle: React.CSSProperties = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  marginTop: "40px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: colors.primary,
  textAlign: "center",
  margin: "0 0 24px",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: colors.text,
  margin: "0 0 16px",
};

const codeContainerStyle: React.CSSProperties = {
  margin: "24px 0",
  textAlign: "center",
};

const codeStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "700",
  color: colors.primary,
  letterSpacing: "4px",
  padding: "16px 24px",
  backgroundColor: colors.light,
  borderRadius: "6px",
  display: "inline-block",
};

const buttonContainerStyle: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: colors.primary,
  borderRadius: "6px",
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
};

const hrStyle: React.CSSProperties = {
  borderColor: colors.light,
  margin: "32px 0",
};

const footerStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: colors.muted,
  margin: "0 0 8px",
};

const linkStyle: React.CSSProperties = {
  color: colors.primary,
  textDecoration: "underline",
  fontSize: "14px",
  wordBreak: "break-all",
};

const footerSmallStyle: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: colors.muted,
  margin: "24px 0 0",
  textAlign: "center",
};

interface VerificationEmailProps {
  username: string;
  otp: string;
  baseUrl?: string;
}

export default function VerificationEmail({
  username,
  otp,
  baseUrl = "http://localhost:3000",
}: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Email Verification Code</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code: {otp}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={headingStyle}>
            Verify Your Account
          </Heading>

          <Text style={textStyle}>Hello {username},</Text>

          <Text style={textStyle}>
            Thank you for creating an account. Please use the verification code
            below to complete your registration:
          </Text>

          <Section style={codeContainerStyle}>
            <Text style={codeStyle}>{otp}</Text>
          </Section>

          <Text style={textStyle}>
            This code will expire in 10 minutes. If you did not request this
            verification, please ignore this email.
          </Text>

          <Section style={buttonContainerStyle}>
            <Button
              href={`${baseUrl}/verify?code=${otp}`}
              style={buttonStyle}
              pX={20}
              pY={12}
            >
              Verify Account
            </Button>
          </Section>

          <Hr style={hrStyle} />

          <Text style={footerStyle}>
            If you're having trouble with the button above, copy and paste the
            URL below into your web browser:
          </Text>
          <Link href={`${baseUrl}/verify?code=${otp}`} style={linkStyle}>
            {`${baseUrl}/verify?code=${otp}`}
          </Link>

          <Text style={footerSmallStyle}>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Sending email using Resend
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  await resend.emails.send({
    from: "dev@example.com",
    to: email,
    subject: "Mystery Message Verification Code",
    react: React.createElement(VerificationEmail, {
      username,
      otp: verifyCode,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  });
}
