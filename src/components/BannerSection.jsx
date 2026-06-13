import Image from "next/image";
import "@/styles/BannerSection.css";

const BannerSection = ({ data, url }) => {
  console.log(data?.image);
  console.log(data.coverImage);
  return (
    <div className="school-hero" style={{ "--school-color": data.color }}>
      <div className="school-hero-bg">
        {(data?.image || data?.coverImage) && (
          <Image
            src={data?.image || data?.coverImage}
            alt={data?.name || "Banner"}
            fill
            priority
            sizes="100vw"
            className="school-hero-image"
          />
        )}
      </div>

      <div className="school-hero-overlay" />

      <div className="container school-hero-content">
        <div className="school-hero-icon">{data?.icon}</div>
        <h1>{data?.name || data?.title}</h1>
        <p className="school-hero-tagline">
          {data?.tagline || data.description}
        </p>

        <div className="cd-hero-tags">
          {data.duration && <span>⏱ {data.duration}</span>}

          {data.mode && <span>📋 {data.mode}</span>}

          {data.eligibility && <span>✅ {data.eligibility}</span>}

          {data.seats && <span>🪑 {data.seats} Seats</span>}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-orange"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default BannerSection;
