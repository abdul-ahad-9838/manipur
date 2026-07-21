"use client";

import { useLayoutEffect, useRef, useState } from "react";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`chevron ${open ? "chevron--open" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterSection({ title, defaultOpen = true, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-section">
      <button
        type="button"
        className="filter-section__header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="filter-section__meta">
          {badge ? (
            <span className="filter-section__badge">{badge}</span>
          ) : null}
          <ChevronIcon open={open} />
        </span>
      </button>
      {open && <div className="filter-section__body">{children}</div>}
    </div>
  );
}

function CheckboxList({ spec, options, selected, onToggle }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? options : options.slice(0, 6);

  if (!options.length) {
    return <p className="filter-empty">No options available</p>;
  }

  return (
    <div>
      <ul className="filter-option-list">
        {visible.map(({ value, count }) => {
          const checked = (selected || []).includes(value);
          const disabled = count === 0 && !checked;
          return (
            <li key={value}>
              <label
                className={`filter-option${disabled ? " filter-option--disabled" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onToggle(spec.key, value)}
                />
                <span className="filter-option__box" aria-hidden="true" />
                <span className="filter-option__label">{value}</span>
                <span className="filter-option__count">{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {options.length > 6 && (
        <button
          type="button"
          className="filter-show-more"
          onClick={() => setShowAll((s) => !s)}
        >
          {showAll ? "Show less" : `Show ${options.length - 6} more`}
        </button>
      )}
    </div>
  );
}

function FeeRangeInput({ facet, value, onChange }) {
  const min = value?.min ?? "";
  const max = value?.max ?? "";
  const sliderMax = facet.max || 0;

  return (
    <div className="fee-range">
      <div className="fee-range__row">
        <label>
          <span>Min</span>
          <input
            type="number"
            min="0"
            placeholder={String(facet.min)}
            value={min}
            onChange={(e) =>
              onChange({
                min: e.target.value === "" ? null : Number(e.target.value),
                max: value?.max ?? null,
              })
            }
          />
        </label>
        <span className="fee-range__sep">–</span>
        <label>
          <span>Max</span>
          <input
            type="number"
            min="0"
            placeholder={String(facet.max)}
            value={max}
            onChange={(e) =>
              onChange({
                min: value?.min ?? null,
                max: e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
        </label>
      </div>
      <input
        type="range"
        min={facet.min}
        max={sliderMax}
        value={max === "" ? sliderMax : max}
        onChange={(e) =>
          onChange({ min: value?.min ?? null, max: Number(e.target.value) })
        }
        className="fee-range__slider"
        aria-label="Maximum tuition fee"
      />
      <p className="fee-range__hint">
        Available range: {facet.min.toLocaleString()} –{" "}
        {facet.max.toLocaleString()}
      </p>
    </div>
  );
}

export default function FilterSidebar({
  specs,
  facetOptions,
  activeFilters,
  searchTerm,
  onSearchChange,
  onToggleCheckbox,
  onSetRange,
  onClearAll,
  isOpen,
  onClose,
  totalCount,
  resultCount,
}) {
  const activeCount = Object.keys(activeFilters).length + (searchTerm ? 1 : 0);

  // Defensive scroll-position guard: any state update inside this
  // sidebar (checking a box, typing a search term, expanding a
  // section) triggers a re-render. Facet option order is already
  // frozen in filterUtils so nothing should reorder — but this still
  // guarantees the scroll container's position survives *any* re-render
  // instead of silently resetting to 0, and it costs nothing when
  // there's nothing to correct.
  const scrollRef = useRef(null);
  const scrollTopRef = useRef(0);

  const handleScroll = (e) => {
    scrollTopRef.current = e.currentTarget.scrollTop;
  };

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTopRef.current;
    }
  });

  return (
    <>
      {isOpen && <div className="filter-drawer-backdrop" onClick={onClose} />}
      <aside
        className={`filter-sidebar${isOpen ? " filter-sidebar--open" : ""}`}
      >
        <div className="filter-sidebar__header">
          <h2>Filters</h2>
          <div className="filter-sidebar__header-actions">
            {activeCount > 0 && (
              <button
                type="button"
                className="filter-clear-all"
                onClick={onClearAll}
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              className="filter-sidebar__close"
              onClick={onClose}
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          className="filter-sidebar__scroll"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="filter-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search title, school, campus..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="filter-search__clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <p className="filter-sidebar__result-line">
            Showing <strong>{resultCount}</strong> of {totalCount} programs
          </p>

          {specs.map((spec, index) => {
            const options = facetOptions[spec.key];
            const selectedCount =
              spec.type === "range"
                ? activeFilters[spec.key]
                  ? 1
                  : 0
                : (activeFilters[spec.key] || []).length;

            return (
              <FilterSection
                key={spec.key}
                title={spec.label}
                badge={selectedCount > 0 ? selectedCount : null}
                defaultOpen={index < 3}
              >
                {spec.type === "range" ? (
                  <FeeRangeInput
                    facet={options}
                    value={activeFilters[spec.key]}
                    onChange={(range) => onSetRange(spec.key, range)}
                  />
                ) : (
                  <CheckboxList
                    spec={spec}
                    options={options}
                    selected={activeFilters[spec.key]}
                    onToggle={onToggleCheckbox}
                  />
                )}
              </FilterSection>
            );
          })}
        </div>
      </aside>
    </>
  );
}
