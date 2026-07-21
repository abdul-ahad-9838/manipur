import "@/styles/Blog.css";
import Image from "next/image";
import Link from "next/link";

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Blogs fetch failed:", error);
    return null;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <span className="section-badge">MIU BLOG</span>
          <h1 className="blog-hero-title">Insights & Updates</h1>
          <p className="blog-hero-sub">
            Stories, research highlights, and campus life from Manipur
            International University.
          </p>
        </div>
      </div>

      <div className="container blog-container">
        {blogs?.length === 0 && (
          <div className="blog-empty">
            <p>No blog posts yet. Check back soon.</p>
          </div>
        )}

        <div className="blog-grid">
          {blogs?.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog._id}
              className="blog-card"
            >
              <div className="blog-card-img">
                {blog.coverImage ? (
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={400}
                    height={300}
                  />
                ) : (
                  <div className="blog-img-placeholder">
                    <span>📰</span>
                  </div>
                )}
              </div>

              <div className="blog-card-body">
                <span className="blog-category">{blog.category}</span>

                <h2 className="blog-card-title">{blog.title}</h2>

                <p className="blog-card-excerpt">
                  {blog.excerpt?.length > 135
                    ? `${blog.excerpt.slice(0, 135)}...`
                    : blog.excerpt}
                </p>

                <div className="blog-card-meta">
                  <span>{blog.author}</span>

                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
