"use client";

export default function ActiveFilterChips({
  specs,
  activeFilters,
  searchTerm,
  onRemove,
  onClearSearch,
  onClearAll,
}) {
  const chips = [];

  if (searchTerm) {
    chips.push({
      key: "search",
      label: `"${searchTerm}"`,
      onClick: onClearSearch,
    });
  }

  specs.forEach((spec) => {
    const value = activeFilters[spec.key];
    if (!value) return;

    if (spec.type === "range") {
      const min = value.min ?? "any";
      const max = value.max ?? "any";
      chips.push({
        key: spec.key,
        label: `${spec.label}: ${min} – ${max}`,
        onClick: () => onRemove(spec.key),
      });
      return;
    }

    value.forEach((v) => {
      chips.push({
        key: `${spec.key}:${v}`,
        label: v,
        onClick: () => onRemove(spec.key, v),
      });
    });
  });

  if (!chips.length) return null;

  return (
    <div className="active-filters">
      {chips.map((chip) => (
        <button
          type="button"
          key={chip.key}
          className="active-filter-chip"
          onClick={chip.onClick}
        >
          {chip.label}
          <span className="active-filter-chip__x">✕</span>
        </button>
      ))}
      <button
        type="button"
        className="active-filters__clear"
        onClick={onClearAll}
      >
        Clear all
      </button>
    </div>
  );
}
