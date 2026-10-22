export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/images", "/api/files"],
        disallow: ["/admin/", "/api/", "/student-login"],
      },
    ],
    sitemap: "https://miu.co.in/sitemap.xml",
    host: "https://miu.co.in",
  };
}
