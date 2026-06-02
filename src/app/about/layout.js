import "@/styles/App.css";
import "@/styles/globals.css";

// export const metadata = {
//   metadataBase: new URL("https://miu.edu.in"),
//   title: {
//     default: "Manipur International University | Excellence in Education",
//     template: "%s | Manipur International University",
//   },
//   description:
//     "Manipur International University (MIU) - Premier UGC recognized university in Imphal, Manipur. Offering undergraduate, postgraduate & doctoral programs in Engineering, Management, Science, Commerce, Humanities & more.",
//   keywords:
//     "Manipur International University, MIU, MIU Imphal, university in Manipur, higher education Manipur, UGC recognized university, engineering college Manipur, management college Imphal, admissions 2026",
//   authors: [
//     { name: "Manipur International University", url: "https://miu.edu.in" },
//   ],
//   creator: "Manipur International University",
//   publisher: "Manipur International University",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: { index: true, follow: true },
//   },
//   icons: {
//     icon: [{ url: "/favicon-transparent.png", type: "image/png" }],
//     shortcut: "/favicon-transparent.png",
//     apple: "/favicon-transparent.png",
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "https://miu.edu.in",
//     siteName: "Manipur International University",
//     title: "Manipur International University | MIU Imphal",
//     description:
//       "Premier UGC recognized university in Imphal, Manipur offering quality higher education across multiple disciplines.",
//     images: [
//       {
//         url: "/images/MIU_Logo.png",
//         width: 1200,
//         height: 630,
//         alt: "Manipur International University",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@MIU_India",
//     creator: "@miuimphal",
//     title: "Manipur International University | MIU Imphal",
//     description: "Premier UGC recognized university in Imphal, Manipur.",
//     images: ["/images/MIU_Logo.png"],
//   },
//   alternates: {
//     canonical: "https://miu.edu.in",
//   },
//   verification: {
//     google: "XP8pdLn7lfNrv5b-6sttVAeGaD4bWavSjhrBWYEGVns",
//   },
// };

export default function AboutLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body>
        <main style={{ marginTop: "50px" }}>{children}</main>
      </body>
    </html>
  );
}
