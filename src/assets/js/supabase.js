export async function getTraenere() {
  const url =
    "https://iizbqssfazgwknvhsdwf.supabase.co/rest/v1/traenere?select=*";
  const options = {
    headers: {
      apikey: "sb_publishable_uwi_g2DvwOpYYYft7DfkXg_cFJcJTNH",
    },
  };

  const res = await fetch(url, options);
  return res.json();
}

export async function getServices() {
  const url =
    "https://iizbqssfazgwknvhsdwf.supabase.co/rest/v1/services?select=*";
  const options = {
    headers: {
      apikey: "sb_publishable_uwi_g2DvwOpYYYft7DfkXg_cFJcJTNH",
    },
  };

  const res = await fetch(url, options);
  return res.json();
}

export function filterLokation(services, selectedLokation) {
  if (selectedLokation === "Alle") return services;

  // Definerer lokationsgrupperne, hvor hver gruppe indeholder en liste af lokationer
  const lokationGroups = {
    Sydfyn: ["Svendborg"],
    Vestsjælland: ["Vestsjælland"],
    Midtjylland: ["Ikast"],
    Sydjylland: ["Vejen", "Sydjylland"],
    Sønderjylland: ["Sønderjylland", "Skærbæk"],
    Als: ["Als"],
  };

  const lokationNames = Object.keys(lokationGroups);

  const groupStyles = {
    Sydfyn: "border-(--accent-200)",
    Vestsjælland: "bg-emerald-50 border-emerald-300",
    Midtjylland: "bg-yellow-50 border-yellow-300",
    Sydjylland: "bg-pink-50 border-pink-300",
    Sønderjylland: "bg-purple-50 border-purple-300",
    Als: "bg-lime-50 border-lime-300",
  };

  // Tjekker gruppen for en kategori, og returnerer gruppenavnet hvis det findes, ellers null
  // Returner gruppenavnet hvis det findes, ellers null
  function getLokationGroup(cat) {
    for (const group in lokationGroups) {
      if (lokationGroups[group].includes(cat)) {
        return group;
      }
    }
    return null;
  }

  const selectedGroup =
    selectedLokation === "Alle"
      ? null
      : lokationGroups[selectedLokation]
        ? selectedLokation
        : getLokationGroup(selectedLokation);

  const filteredData =
    selectedLokation === "Alle"
      ? services
      : selectedGroup
        ? services.filter((item) =>
            lokationGroups[selectedGroup].includes(item.lokation),
          )
        : [];

  const groupedByLokation = {};
  lokationNames.forEach((group) => {
    groupedByLokation[group] = filteredData
      .filter((item) => lokationGroups[group].includes(item.lokation))
      .sort((a, b) => (a.hold > b.hold ? 1 : -1)); // Sorterer elementerne inden for hver gruppe alfabetisk efter hold
  });

  const displayedGroups =
    selectedLokation === "Alle"
      ? lokationNames.filter(
          (group) =>
            groupedByLokation[group] && groupedByLokation[group].length > 0,
        )
      : selectedGroup
        ? [selectedGroup]
        : [];
}

const krTilDKK = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  currencyDisplay: "code",
});
