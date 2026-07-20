"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ActiveFilterChips from "./ActiveFilterChips";
import ProgramCard from "./ProgramCard";
import {
  buildFilterSpecs,
  buildFacetOptions,
  filterPrograms,
} from "@/lib/filterUtils";

const EMPTY_FILTERS = {};

export default function ProgramsExplorer({ programs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(10);
  const loadMoreRef = useRef(null);

  // Facet definitions
  const specs = useMemo(() => buildFilterSpecs(programs), [programs]);

  const filtered = useMemo(
    () => filterPrograms(programs, specs, activeFilters, searchTerm),
    [programs, specs, activeFilters, searchTerm],
  );

  const facetOptions = useMemo(
    () => buildFacetOptions(programs, specs, activeFilters, searchTerm),
    [programs, specs, activeFilters, searchTerm],
  );

  // Only render visible programs
  const visiblePrograms = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  // Reset pagination when filters/search change
  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm, activeFilters]);

  // Infinite scroll observer
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 10, filtered.length));
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [filtered.length]);

  const toggleCheckbox = useCallback((facetKey, value) => {
    setActiveFilters((prev) => {
      const current = prev[facetKey] || [];

      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      const clone = { ...prev };

      if (next.length) {
        clone[facetKey] = next;
      } else {
        delete clone[facetKey];
      }

      return clone;
    });
  }, []);

  const setRange = useCallback((facetKey, range) => {
    setActiveFilters((prev) => {
      const clone = { ...prev };

      const hasMin = range.min !== null && range.min !== undefined;

      const hasMax = range.max !== null && range.max !== undefined;

      if (!hasMin && !hasMax) {
        delete clone[facetKey];
      } else {
        clone[facetKey] = range;
      }

      return clone;
    });
  }, []);

  const removeChip = useCallback((facetKey, value) => {
    setActiveFilters((prev) => {
      const clone = { ...prev };

      if (value === undefined) {
        delete clone[facetKey];
        return clone;
      }

      const current = prev[facetKey] || [];

      const next = current.filter((v) => v !== value);

      if (next.length) {
        clone[facetKey] = next;
      } else {
        delete clone[facetKey];
      }

      return clone;
    });
  }, []);

  const clearAll = useCallback(() => {
    setActiveFilters(EMPTY_FILTERS);
    setSearchTerm("");
    setVisibleCount(10);
  }, []);

  const activeCount = Object.keys(activeFilters).length + (searchTerm ? 1 : 0);

  return (
    <div className="programs-shell">
      <div className="container programs-shell__inner">
        <button
          type="button"
          className="filters-fab"
          onClick={() => setDrawerOpen(true)}
        >
          <FilterIcon />
          Filters
          {activeCount > 0 && (
            <span className="filters-fab__badge">{activeCount}</span>
          )}
        </button>

        <FilterSidebar
          specs={specs}
          facetOptions={facetOptions}
          activeFilters={activeFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleCheckbox={toggleCheckbox}
          onSetRange={setRange}
          onClearAll={clearAll}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          totalCount={programs.length}
          resultCount={filtered.length}
        />

        <section className="programs-results">
          <div className="programs-results__header">
            <div>
              <h1>Explore Programs</h1>

              <p className="programs-results__count">
                <strong>{visiblePrograms.length}</strong> loaded of{" "}
                {filtered.length} programs
              </p>
            </div>
          </div>

          <ActiveFilterChips
            specs={specs}
            activeFilters={activeFilters}
            searchTerm={searchTerm}
            onRemove={removeChip}
            onClearSearch={() => setSearchTerm("")}
            onClearAll={clearAll}
          />

          {filtered.length === 0 ? (
            <div className="programs-empty">
              <span className="programs-empty__icon">🔍</span>

              <h3>No programs match your filters</h3>

              <p>
                Try removing a filter, or clear all filters to see every program
                again.
              </p>

              <button
                type="button"
                className="btn btn-orange"
                onClick={clearAll}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="programs-grid">
              {visiblePrograms.map((program) => (
                <ProgramCard
                  key={program._id || program.slug}
                  program={program}
                />
              ))}

              {visibleCount < filtered.length && (
                <div
                  ref={loadMoreRef}
                  style={{
                    height: "50px",
                    width: "100%",
                  }}
                />
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}
