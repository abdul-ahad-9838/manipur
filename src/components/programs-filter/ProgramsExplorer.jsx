"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/programs-filter/FilterSidebar";
import ActiveFilterChips from "@/components/programs-filter/ActiveFilterChips";
// import ProgramResultCard from "@/components/programs-filter/ProgramResultCard";
import {
  buildFilterSpecs,
  buildFacetOptions,
  buildStableFacetOrder,
  buildFacetSlugMaps,
  buildSearchParamsFromFilters,
  parseFiltersFromSearchParams,
  filterPrograms,
} from "@/lib/programs-filter/filterUtils";
import ProgramCard from "../ProgramCard";

const EMPTY_FILTERS = {};

export default function ProgramsExplorer({ programs }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Facet definitions are derived once from the dataset shape (which
  // fields actually exist), then reused for filtering + live counts.
  const specs = useMemo(() => buildFilterSpecs(programs), [programs]);

  // Slug<->raw-value mapping for any facet flagged `urlEncode: "slug"`
  // (currently School). Computed once from the full dataset, same
  // pattern as stableOrder below.
  const slugMaps = useMemo(
    () => buildFacetSlugMaps(programs, specs),
    [programs, specs],
  );

  // Lazy initializers run exactly once, reading whatever query string
  // the page was loaded/shared with — this is what restores filters
  // on refresh or on a shared link.
  const [searchTerm, setSearchTerm] = useState(
    () =>
      parseFiltersFromSearchParams(searchParams, specs, slugMaps).searchTerm,
  );
  const [activeFilters, setActiveFilters] = useState(
    () => parseFiltersFromSearchParams(searchParams, specs, slugMaps).filters,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Deliberately depends only on [programs, specs] — NOT on
  // activeFilters/searchTerm — so each facet's option order is frozen
  // the moment the data loads and never reshuffles while the user is
  // filtering. Only the per-option counts below are live.
  const stableOrder = useMemo(
    () => buildStableFacetOrder(programs, specs),
    [programs, specs],
  );

  const filtered = useMemo(
    () => filterPrograms(programs, specs, activeFilters, searchTerm),
    [programs, specs, activeFilters, searchTerm],
  );

  const facetOptions = useMemo(
    () =>
      buildFacetOptions(
        programs,
        specs,
        activeFilters,
        searchTerm,
        stableOrder,
      ),
    [programs, specs, activeFilters, searchTerm, stableOrder],
  );

  /* ------------------------------------------------------------
     URL <-> STATE SYNC
     Two effects, each guarded by `lastSyncedQuery` so they don't
     bounce off each other:
       - State changed (checkbox clicked, search typed) -> push the
         new query string to the URL, and remember we pushed it.
       - URL changed for a reason we DIDN'T cause (back/forward
         button, a shared link, editing the address bar) -> parse it
         back into state.
     Search text is debounced before it's written to the URL (typing
     stays instant for on-screen filtering — only the URL write, which
     triggers a navigation, waits for a pause in typing).
     ------------------------------------------------------------ */
  const lastSyncedQuery = useRef(searchParams.toString());
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // State -> URL
  useEffect(() => {
    const nextParams = buildSearchParamsFromFilters(
      specs,
      activeFilters,
      debouncedSearchTerm,
      searchParams,
      slugMaps,
    );
    const nextQuery = nextParams.toString();
    if (nextQuery === searchParams.toString()) return; // already in sync

    lastSyncedQuery.current = nextQuery;
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, debouncedSearchTerm, specs, pathname, slugMaps]);

  // URL -> state (skips runs that this component itself triggered above)
  useEffect(() => {
    const currentQuery = searchParams.toString();
    if (currentQuery === lastSyncedQuery.current) return;

    const parsed = parseFiltersFromSearchParams(searchParams, specs, slugMaps);
    setActiveFilters(parsed.filters);
    setSearchTerm(parsed.searchTerm);
    setDebouncedSearchTerm(parsed.searchTerm);
    lastSyncedQuery.current = currentQuery;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, specs, slugMaps]);

  const toggleCheckbox = useCallback((facetKey, value) => {
    setActiveFilters((prev) => {
      const current = prev[facetKey] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const clone = { ...prev };
      if (next.length) clone[facetKey] = next;
      else delete clone[facetKey];
      return clone;
    });
  }, []);

  const setRange = useCallback((facetKey, range) => {
    setActiveFilters((prev) => {
      const clone = { ...prev };
      const hasMin = range.min !== null && range.min !== undefined;
      const hasMax = range.max !== null && range.max !== undefined;
      if (!hasMin && !hasMax) delete clone[facetKey];
      else clone[facetKey] = range;
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
      if (next.length) clone[facetKey] = next;
      else delete clone[facetKey];
      return clone;
    });
  }, []);

  const clearAll = useCallback(() => {
    setActiveFilters(EMPTY_FILTERS);
    setSearchTerm("");
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
                <strong>{filtered.length}</strong> of {programs.length} programs
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
              {filtered.map((program) => (
                <ProgramCard
                  key={program._id || program.slug}
                  program={program}
                />
              ))}
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
