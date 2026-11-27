
import Link from "next/link";
import "@/styles/ProgramCard.css";
import { detectProgramLevel } from "@/lib/filterUtils";
import ProgramCardImage from "./ProgramCardImage";

export default function ProgramCard({ program }) {
  const level = detectProgramLevel(program.title);

  // Split title into program + specialization
  const titleMatch = program.title?.match(/^(.*?)\s*\((.*?)\)$/);

  const programName = titleMatch
    ? titleMatch[1].trim()
    : program.title;

  const specialization =
    program.specialisation ||
    (titleMatch ? titleMatch[2].trim() : "");

  return (
    <div className="sp-program-card">
      <div className="sp-program-link">

        {/* Cover */}
        <div className="sp-program-cover">

          <ProgramCardImage
            src={program.cardImage}
            alt={program.title}
            icon={program.icon}
          />

          <span className="sp-program-badge">
            {level}
          </span>

        </div>

        {/* Body */}
        <div className="sp-program-body">

          <div className="sp-program-title-wrapper">

            <h3 className="sp-program-name">
              {programName}
            </h3>

            {specialization && (
              <p className="sp-program-specialization">
                ({specialization})
              </p>
            )}

            {program.school && (
              <p className="sp-program-school">
                {program.school}
              </p>
            )}

          </div>

          {program.description && (
            <p className="sp-program-desc">
              {program.description.length > 160
                ? `${program.description.substring(0, 160)}...`
                : program.description}
            </p>
          )}

          <div className="sp-program-footer">

            <div className="sp-program-meta">

              {program.duration && (
                <div>
                  <span className="sp-meta-label">
                    DURATION
                  </span>

                  <span className="sp-meta-val">
                    {program.duration}
                  </span>
                </div>
              )}

              {program.eligibility && (
                <div>
                  <span className="sp-meta-label">
                    ELIGIBILITY
                  </span>

                  <span className="sp-meta-val">
                    {program.eligibility}
                  </span>
                </div>
              )}

            </div>

          </div>

          <Link
            href={
              program.slug
                ? `/courses/${program.slug}`
                : "/courses"
            }
            className="sp-apply-btn"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
}
