// lib/filterUtils.js
//
// Centralized, framework-agnostic filtering logic for the Programs
// directory. Nothing here imports React, so it's easy to unit test and
// reuse elsewhere (e.g. server-side filtering later if needed).
//
// Design:
//  - "specs" describe each filter facet (how to read a value off a
//    program, and what kind of control it needs). Adding a new filter
//    later is one more entry in buildFilterSpecs — nothing else in the
//    app needs to change.
//  - Every facet except Program Level is derived entirely from the API
//    response. If a field isn't present in the data, that section
//    simply doesn't render.

/* ----------------------------------------------------------------
   1. PROGRAM LEVEL DETECTION
   The only intentionally hardcoded rules, per the brief — everything
   else below is derived live from the API data.
   ---------------------------------------------------------------- */
const LEVEL_RULES = [
  // Order matters: more specific patterns must be checked before the
  // broader ones they could otherwise be swallowed by (e.g. "PG Diploma"
  // before "Diploma", "Doctorate" before "Master's").
  {
    level: "PG Diploma",
    test: /\bpg[\s.-]*diploma\b|\bpost[\s-]?graduate[\s-]?diploma\b|\bpgd\b/i,
  },
  {
    level: "Doctorate / PhD",
    test: /\bph\.?\s?d\b|\bdoctorate\b|\bd\.?litt\b|\bd\.?sc\b/i,
  },
  { level: "Diploma", test: /\bdiploma\b/i },
  {
    level: "Master's",
    test: /\bmaster'?s?\b|\bm\.?\s?tech\b|\bm\.?\s?sc\b|\bm\.?\s?com\b|\bm\.?\s?ed\b|\bmba\b|\bmca\b|\bm\.?\s?pharm\b|\bllm\b|\bm\.?\s?des\b|\bm\.?\s?arch\b|\bm\.?\s?a\b/i,
  },
  {
    level: "Bachelor's",
    test: /\bbachelor'?s?\b|\bb\.?\s?tech\b|\bb\.?\s?sc\b|\bb\.?\s?com\b|\bb\.?\s?ed\b|\bbba\b|\bbca\b|\bb\.?\s?pharm\b|\bllb\b|\bb\.?\s?des\b|\bb\.?\s?arch\b|\bb\.?\s?voc\b|\bb\.?\s?a\b/i,
  },
  { level: "Certificate", test: /\bcertificate\b|\bcert\.?\b/i },
  { level: "Foundation", test: /\bfoundation\b/i },
  { level: "Associate Degree", test: /\bassociate\b/i },
];

export function detectProgramLevel(title = "") {
  for (const rule of LEVEL_RULES) {
    if (rule.test.test(title)) return rule.level;
  }
  return "Other";
}

export const PROGRAM_LEVELS = [
  "Bachelor's",
  "Master's",
  "Doctorate / PhD",
  "Diploma",
  "PG Diploma",
  "Certificate",
  "Foundation",
  "Associate Degree",
  "Other",
];

/* ----------------------------------------------------------------
   2. DURATION PARSING / BUCKETING
   ---------------------------------------------------------------- */
export function parseDurationYears(duration) {
  if (!duration || typeof duration !== "string") return null;
  const str = duration.toLowerCase();
  const numbers = (str.match(/\d+(\.\d+)?/g) || []).map(Number);
  if (!numbers.length) return null;
  // e.g. "3-4 Years" -> bucket by the upper bound
  const value = numbers.length > 1 ? Math.max(...numbers) : numbers[0];
  if (str.includes("month")) return value / 12;
  if (str.includes("week")) return value / 52;
  if (str.includes("semester")) return value / 2;
  return value; // assume years
}

export const DURATION_BUCKETS = [
  { label: "Less than 1 Year", test: (y) => y < 1 },
  { label: "1 Year", test: (y) => y >= 1 && y < 1.5 },
  { label: "2 Years", test: (y) => y >= 1.5 && y < 2.5 },
  { label: "3 Years", test: (y) => y >= 2.5 && y < 3.5 },
  { label: "4 Years", test: (y) => y >= 3.5 && y < 4.5 },
  { label: "5+ Years", test: (y) => y >= 4.5 },
];

export function getDurationBucket(duration) {
  const years = parseDurationYears(duration);
  if (years === null) return null;
  const bucket = DURATION_BUCKETS.find((b) => b.test(years));
  return bucket ? bucket.label : null;
}

/* ----------------------------------------------------------------
   3. FEE PARSING
   ---------------------------------------------------------------- */
export function parseFee(fee) {
  if (fee === null || fee === undefined || fee === "") return null;
  if (typeof fee === "number") return Number.isFinite(fee) ? fee : null;
  const cleaned = String(fee).replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? null : value;
}

/* ----------------------------------------------------------------
   4. FIELD ACCESS
   Real-world APIs are inconsistent about naming, so each optional
   facet tries a short list of likely field names before giving up.
   Extend FIELD_ALIASES if your API uses different keys.
   ---------------------------------------------------------------- */
const FIELD_ALIASES = {
  campus: ["campus", "location", "city"],
  department: ["department", "dept", "stream"],
  intake: ["intake", "intakes", "admissionIntake"],
  language: ["language", "languageOfInstruction", "medium"],
  programType: ["programType", "type", "category"],
  deliveryFormat: ["deliveryFormat", "format", "deliveryMode"],
  availability: ["availability", "admissionStatus", "status"],
};

function pickField(program, keys) {
  for (const key of keys) {
    const value = program?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value) && value.length) return value;
  }
  return null;
}

export function getField(program, key) {
  return pickField(program, FIELD_ALIASES[key] || [key]);
}

export function hasField(programs, key) {
  return programs.some((p) => getField(p, key));
}

// Delivery Format falls back to a heuristic derived from Study Mode
// when the API doesn't provide an explicit field.
export function getDeliveryFormat(program) {
  const explicit = getField(program, "deliveryFormat");
  if (explicit) return explicit;
  const mode = (program.mode || "").toLowerCase();
  if (!mode) return null;
  if (mode.includes("online") || mode.includes("distance")) return "Online";
  if (mode.includes("hybrid")) return "Hybrid";
  return "On Campus";
}

/* ----------------------------------------------------------------
   5. TALLYING VALUES INTO { value, count } OPTIONS
   ---------------------------------------------------------------- */
function tallyCounts(programs, getValue) {
  const counts = new Map();
  programs.forEach((p) => {
    const raw = getValue(p);
    const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
    values.forEach((v) => {
      const key = String(v).trim();
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
  });
  return counts;
}

function tally(programs, getValue) {
  return [...tallyCounts(programs, getValue).entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

function sortValues(values, spec) {
  const sorted = [...values];
  if (spec.order) {
    sorted.sort((a, b) => {
      const ai = spec.order.indexOf(a);
      const bi = spec.order.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }
  return sorted;
}

/* ----------------------------------------------------------------
   6. FILTER SPECS — single source of truth for what facets exist
   ---------------------------------------------------------------- */
export function buildFilterSpecs(programs) {
  const specs = [
    {
      key: "level",
      label: "Program Level",
      type: "checkbox",
      getValue: (p) => detectProgramLevel(p.title),
      order: PROGRAM_LEVELS,
    },
    {
      key: "school",
      label: "School / Faculty",
      type: "checkbox",
      getValue: (p) => p.school || null,
    },
  ];

  if (programs.some((p) => p.eligibility)) {
    specs.push({
      key: "eligibility",
      label: "Eligibility",
      type: "checkbox",
      // Raw values straight from the API (e.g. "10+2 / Equivalent",
      // "Bachelor's Degree") — not normalized, so it stays accurate to
      // whatever wording the school actually publishes.
      getValue: (p) => p.eligibility || null,
    });
  }

  if (hasField(programs, "department")) {
    specs.push({
      key: "department",
      label: "Department",
      type: "checkbox",
      getValue: (p) => getField(p, "department"),
    });
  }

  if (hasField(programs, "campus")) {
    specs.push({
      key: "campus",
      label: "Campus",
      type: "checkbox",
      getValue: (p) => getField(p, "campus"),
    });
  }

  if (programs.some((p) => p.mode)) {
    specs.push({
      key: "mode",
      label: "Study Mode",
      type: "checkbox",
      getValue: (p) => p.mode || null,
    });
  }

  if (programs.some((p) => getDurationBucket(p.duration))) {
    specs.push({
      key: "duration",
      label: "Duration",
      type: "checkbox",
      getValue: (p) => getDurationBucket(p.duration),
      order: DURATION_BUCKETS.map((b) => b.label),
    });
  }

  if (hasField(programs, "intake")) {
    specs.push({
      key: "intake",
      label: "Intake",
      type: "checkbox",
      getValue: (p) => getField(p, "intake"),
    });
  }

  if (hasField(programs, "language")) {
    specs.push({
      key: "language",
      label: "Language",
      type: "checkbox",
      getValue: (p) => getField(p, "language"),
    });
  }

  if (programs.some((p) => parseFee(p.fee) !== null)) {
    specs.push({
      key: "fee",
      label: "Tuition Fee",
      type: "range",
      getValue: (p) => parseFee(p.fee),
    });
  }

  if (hasField(programs, "programType")) {
    specs.push({
      key: "programType",
      label: "Program Type",
      type: "checkbox",
      getValue: (p) => getField(p, "programType"),
    });
  }

  if (programs.some((p) => getDeliveryFormat(p))) {
    specs.push({
      key: "deliveryFormat",
      label: "Delivery Format",
      type: "checkbox",
      getValue: (p) => getDeliveryFormat(p),
    });
  }

  if (hasField(programs, "availability")) {
    specs.push({
      key: "availability",
      label: "Availability",
      type: "checkbox",
      getValue: (p) => getField(p, "availability"),
    });
  }

  return specs;
}

/* ----------------------------------------------------------------
   7. APPLYING FILTERS
   Within one facet: OR (checking "Bachelor's" + "Master's" shows
   both). Across facets: AND (Level AND School AND Mode ...). This is
   the standard "faceted search" behavior used by course directories.
   ---------------------------------------------------------------- */
export function programMatchesFacet(program, spec, selected) {
  if (spec.type === "range") {
    if (!selected || (selected.min == null && selected.max == null))
      return true;
    const value = spec.getValue(program);
    if (value === null) return false; // no data once a range is actively set
    if (selected.min != null && value < selected.min) return false;
    if (selected.max != null && value > selected.max) return false;
    return true;
  }
  if (!selected || selected.length === 0) return true;
  const raw = spec.getValue(program);
  const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return values.some((v) => selected.includes(v));
}

function matchesSearch(program, term) {
  if (!term) return true;
  const haystack = [program.title, program.school, getField(program, "campus")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
}

export function filterPrograms(programs, specs, activeFilters, searchTerm) {
  const term = (searchTerm || "").trim().toLowerCase();
  return programs.filter(
    (p) =>
      matchesSearch(p, term) &&
      specs.every((spec) =>
        programMatchesFacet(p, spec, activeFilters[spec.key]),
      ),
  );
}

/* ----------------------------------------------------------------
   8. STABLE OPTION ORDER (computed once from the full, unfiltered
   dataset). Checkbox lists are rendered in this fixed order forever —
   only each option's *count* changes as filters are applied. This is
   what keeps the sidebar from reordering/inserting/removing DOM nodes
   under the user's cursor while they filter, which is what caused the
   sidebar to jump to the top and get "stuck". Recompute only when the
   underlying `programs` data actually changes, never on every filter
   click (see ProgramsExplorer: this is memoized on [programs, specs]).
   ---------------------------------------------------------------- */
export function buildStableFacetOrder(programs, specs) {
  const order = {};
  specs.forEach((spec) => {
    if (spec.type === "range") return;
    const values = [...tallyCounts(programs, spec.getValue).keys()];
    order[spec.key] = sortValues(values, spec);
  });
  return order;
}

/* ----------------------------------------------------------------
   9. LIVE FACET OPTION COUNTS
   For each facet, counts are computed as if every OTHER facet's
   filters (and the search term) were applied, but not this facet's
   own selection — the standard UX so counts update as selections
   change without a facet hiding the option a user already picked.
   Options are always returned in `stableOrder` (falling back to a
   fresh sort only if no stable order was supplied) with a count of 0
   for anything not present in the current scoped result — they stay
   in the list (visually greyed out / disabled) instead of being
   added or removed, which keeps the DOM stable while filtering.
   ---------------------------------------------------------------- */
export function buildFacetOptions(
  programs,
  specs,
  activeFilters,
  searchTerm,
  stableOrder = {},
) {
  const term = (searchTerm || "").trim().toLowerCase();
  const searched = term
    ? programs.filter((p) => matchesSearch(p, term))
    : programs;

  const result = {};
  specs.forEach((spec) => {
    const others = specs.filter((s) => s.key !== spec.key);
    const scoped = searched.filter((p) =>
      others.every((s) => programMatchesFacet(p, s, activeFilters[s.key])),
    );

    if (spec.type === "range") {
      const values = scoped.map(spec.getValue).filter((v) => v !== null);
      result[spec.key] = {
        min: values.length ? Math.min(...values) : 0,
        max: values.length ? Math.max(...values) : 0,
        count: values.length,
      };
      return;
    }

    const counts = tallyCounts(scoped, spec.getValue);
    const order = stableOrder[spec.key] || sortValues([...counts.keys()], spec);
    result[spec.key] = order.map((value) => ({
      value,
      count: counts.get(value) || 0,
    }));
  });
  return result;
}
