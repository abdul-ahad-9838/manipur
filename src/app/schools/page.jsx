import { Suspense } from "react";
import ProgramsExplorer from "@/components/programs-filter/ProgramsExplorer";
import "@/styles/programs-filter.css";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

const page = async () => {
  await dbConnect();
  const result = await Course.find({}, { _id: 0, __v: 0 }).lean().exec();

  // Handles either a raw array response or a { data: [...] } wrapper.
  const programs = (Array.isArray(result) ? result : result?.data || []).filter(
    (program) => program.isActive === true,
  );

  return (
    <main className="layout-margin">
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
