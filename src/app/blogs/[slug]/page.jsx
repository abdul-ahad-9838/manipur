import "@/styles/Blog.css";
import Image from "next/image";
import Link from "next/link";

async function getBlog(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error(`Blog fetch failed: ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  // Support both `seo` object and flat `name`/`title` fields
  const seo = blog.seo ?? {};

  return {
    title: seo.title || blog.name || blog.title,
    description: seo.description || blog.excerpt || "",
    keywords: seo.keywords ?? [],
    openGraph: {
      title: seo.ogTitle || seo.title || blog.name || blog.title,
      description: seo.ogDescription || seo.description || blog.excerpt || "",
      images: seo.ogImage
        ? [{ url: seo.ogImage }]
        : blog.coverImage
          ? [{ url: blog.coverImage }]
          : [],
      type: "article",
      publishedTime: blog.createdAt,
      authors: blog.author ? [blog.author] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.title || blog.name || blog.title,
      description:
        seo.twitterDescription || seo.description || blog.excerpt || "",
      images: seo.twitterImage || seo.ogImage || blog.coverImage || undefined,
    },
    alternates: {
      canonical: seo.canonicalUrl || undefined,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog)
    return (
      <div className="blog-detail-loading">
        <p>Post not found.</p>
        <Link
          href="/blog"
          className="btn btn-orange"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          ← Back to Blog
        </Link>
      </div>
    );

  return (
    <div className="blog-detail-page">
      {blog?.seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              typeof blog.seo.structuredData === "string"
                ? blog.seo.structuredData
                : JSON.stringify(blog.seo.structuredData),
          }}
        />
      )}
      <div className="container blog-detail-container">
        <Link href="/blogs" className="blog-back-link">
          ← Back to Blogs
        </Link>

        <div className="blog-detail-header">
          <span className="blog-category">{blog.category}</span>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <span>By {blog.author}</span>
            <span>·</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {blog.coverImage && (
          <div className="blog-detail-image">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={800}
              height={400}
            />
          </div>
        )}

        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    </div>
  );
}
