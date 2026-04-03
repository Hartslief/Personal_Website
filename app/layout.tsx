import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Caleb\s Portfolio",
    default: "Caleb\s Portfolio",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$antialiased`}>{children}</body>
    </html>
  );
}
