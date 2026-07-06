export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/images", "/api/files"],
        disallow: ["/admin/", "/api/", "/student-login"],
      },
    ],
    sitemap: "https://miu.edu.in/sitemap.xml",
    host: "https://miu.edu.in",
  };
}
