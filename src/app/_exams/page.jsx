import PageHero from "@/components/PageHero";

export default function Exams() {
  return (
    <div>
      <PageHero
        settingsKey="exams"
        defaultTitle="Examinations"
        defaultSubtitle="Access official schedules, results, and examination-related announcements."
        breadcrumb={[{ label: "Examinations" }]}
      />
      <div
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "#fff",
          minHeight: "40vh",
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "0 auto 40px",
            color: "#444",
          }}
        >
          Access official schedules, results, and examination-related
          announcements for all academic departments.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn btn-orange" style={{ padding: "14px 36px" }}>
            View Date Sheet
          </button>
          <button className="btn btn-black" style={{ padding: "14px 36px" }}>
            Result Portal
          </button>
        </div>
      </div>
    </div>
  );
}
