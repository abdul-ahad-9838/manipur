import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import SplashLoader from "@/components/SplashLoader";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

import "@/styles/App.css";

export const metadata = {
  metadataBase: new URL("https://miu.co.in"),
  title: {
    default: "Manipur International University | Excellence in Education",
  },
  description:
    "Manipur International University (MIU) - Premier UGC recognized university in Imphal, Manipur. Offering undergraduate, postgraduate & doctoral programs in Engineering, Management, Science, Commerce, Humanities & more.",
  keywords:
    "Manipur International University, MIU, MIU Imphal, university in Manipur, higher education Manipur, UGC recognized university, engineering college Manipur, management college Imphal, admissions 2026",
  authors: [
    { name: "Manipur International University", url: "https://miu.co.in" },
  ],
  creator: "Manipur International University",
  publisher: "Manipur International University",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/favicon-transparent.webp", type: "image/webp" }],
    shortcut: "/favicon-transparent.webp",
    apple: "/favicon-transparent.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://miu.co.in",
    siteName: "Manipur International University",
    title: "Manipur International University | MIU Imphal",
    description:
      "Premier UGC recognized university in Imphal, Manipur offering quality higher education across multiple disciplines.",
    images: [
      {
        url: "/images/MIU_Logo.webp",
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
    images: ["/images/MIU_Logo.webp"],
  },
  alternates: {
    canonical: "https://miu.co.in",
  },
  verification: {
    google: "bvdiZM5I8TrPsH3J2EUvlurPMXBSV1r0dXXPpiNQUg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Mobile optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <meta
          name="google-site-verification"
          content="bvdiZM5I8TrPsH3J2EUvlurPMXBSV1r0dXXPpiNQUg"
        />

        <meta
          name="facebook-domain-verification"
          content="dh41zny9obu2u0zng15i3djtnesg2z"
        />

        {/* Optional performance boost */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        /> */}
      </head>

      {/* <body className={`${roboto.className} ${oswald.variable}`}> */}
      <body>
        <SplashLoader />
        <Toaster position="top-center" />

        {/* Main App */}
        <ClientShell>{children}</ClientShell>

        {/* Footer */}
        <Footer />

        {/* ✅ Proper Next.js Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8NCEF885M0"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8NCEF885M0');
          `}
        </Script>
      </body>
    </html>
  );
}
