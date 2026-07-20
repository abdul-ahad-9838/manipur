const groupedPrograms = (programs) => {
  const categories = [
    {
      key: "bachelors",
      label: "Bachelor's Programs",
      match: (t) =>
        /^b\.|^bachelor|^bca|^bba|^b\.tech|^b\.sc|^b\.com|^b\.voc|^b\.a/i.test(
          t,
        ),
    },
    {
      key: "masters",
      label: "Master's Programs",
      match: (t) =>
        /^m\.|^master|^mca|^mba|^m\.tech|^m\.sc|^m\.com|^m\.a/i.test(t),
    },
    {
      key: "pgdiploma",
      label: "PG Diploma",
      match: (t) =>
        /^pg diploma|^post.?graduate diploma|^p\.g\. diploma/i.test(t),
    },
    {
      key: "diploma",
      label: "Diploma Programs",
      match: (t) => /^diploma/i.test(t),
    },
    {
      key: "other",
      label: "Other Programs",
      match: () => true,
    },
  ];

  const grouped = Object.fromEntries(categories.map((c) => [c.key, []]));

  programs.forEach((prog) => {
    const title = prog.title.trim();

    const category =
      categories.find((c) => c.key !== "other" && c.match(title)) ||
      categories.find((c) => c.key === "other");

    grouped[category.key].push(prog);
  });

  return { categories, grouped };
};

export default groupedPrograms;
