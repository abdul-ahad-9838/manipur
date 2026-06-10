import "@/styles/App.css";
import "@/styles/globals.css";

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
        <main style={{ marginTop: "125px" }}>{children}</main>
      </body>
    </html>
  );
}
