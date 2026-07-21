import ProgramsExplorer from "@/components/ProgramsExplorer";
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
      <ProgramsExplorer programs={programs} />
    </main>
  );
};

export default page;
