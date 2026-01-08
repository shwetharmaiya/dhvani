import "./globals.css";

export const metadata = {
  title: "Kannada Text to Speech",
  description: "Free Kannada Text to Speech using Browser API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kn">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
