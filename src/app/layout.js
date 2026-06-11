import React from "react";
import ClientShell from "@/components/ClientShell";
import "@/styles/globals.css";
import "@/styles/App.css";

export const metadata = {
  metadataBase: new URL("https://miu.edu.in"),
  title: {
    default: "Manipur International University | Excellence in Education",
    template: "%s | Manipur International University",
  },
  description:
    "Manipur International University (MIU) - Premier UGC recognized university in Imphal, Manipur. Offering undergraduate, postgraduate & doctoral programs in Engineering, Management, Science, Commerce, Humanities & more.",
  keywords:
    "Manipur International University, MIU, MIU Imphal, university in Manipur, higher education Manipur, UGC recognized university, engineering college Manipur, management college Imphal, admissions 2026",
  authors: [
    { name: "Manipur International University", url: "https://miu.edu.in" },
  ],
  creator: "Manipur International University",
  publisher: "Manipur International University",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/favicon-transparent.png", type: "image/png" }],
    shortcut: "/favicon-transparent.png",
    apple: "/favicon-transparent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://miu.edu.in",
    siteName: "Manipur International University",
    title: "Manipur International University | MIU Imphal",
    description:
      "Premier UGC recognized university in Imphal, Manipur offering quality higher education across multiple disciplines.",
    images: [
      {
        url: "/images/MIU_Logo.png",
        width: 1200,
        height: 630,
        alt: "Manipur International University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MIU_India",
    creator: "@miuimphal",
    title: "Manipur International University | MIU Imphal",
    description: "Premier UGC recognized university in Imphal, Manipur.",
    images: ["/images/MIU_Logo.png"],
  },
  alternates: {
    canonical: "https://miu.edu.in",
  },
  verification: {
    google: "XP8pdLn7lfNrv5b-6sttVAeGaD4bWavSjhrBWYEGVns",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta
          name="google-site-verification"
          content="XP8pdLn7lfNrv5b-6sttVAeGaD4bWavSjhrBWYEGVns"
        />
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Load fonts as stylesheet — no preload trick needed in Next.js */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Oswald:wght@400;500;700&display=swap"
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5XNC75T6EH"
        ></script>
        <script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5XNC75T6EH');
          `}
        </script>
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
