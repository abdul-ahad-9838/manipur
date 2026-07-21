import { Suspense } from "react";
import ProgramsExplorer from "@/components/programs-filter/ProgramsExplorer";
import "@/styles/programs-filter.css";

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
    cache: "no-store",
  });
  const result = await res.json();

  // Handles either a raw array response or a { data: [...] } wrapper.
  const programs = (Array.isArray(result) ? result : result?.data || []).filter(
    (program) => program.isActive === true,
  );

  return (
    <main className="layout-margin-fix">
      {/* Suspense is required here: ProgramsExplorer reads the URL via
          useSearchParams() to restore filters on load/refresh/shared
          links, and Next.js requires that hook's nearest client
          boundary to be wrapped in Suspense. This is also what makes a
          direct visit like /schools-test?level=Bachelor%27s apply that
          filter immediately on load — see the note below. */}
      <Suspense fallback={<ProgramsLoadingFallback />}>
        <ProgramsExplorer programs={programs} />
      </Suspense>
    </main>
  );
};

function ProgramsLoadingFallback() {
  return (
    <div className="programs-shell">
      <div className="container">
        <p style={{ padding: "40px 0", color: "#888" }}>Loading programs…</p>
      </div>
    </div>
  );
}

export default page;
