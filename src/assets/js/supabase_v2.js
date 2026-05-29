const url = "https://iizbqssfazgwknvhsdwf.supabase.co/rest/v1";
const key = "sb_publishable_uwi_g2DvwOpYYYft7DfkXg_cFJcJTNH";

const options = {
  headers: {
    apikey: key,
  },
};

export async function getServices() {
  const res = await fetch(`${url}/services?select=*`, options);
  return res.json();
}

export async function getTraenere() {
  const res = await fetch(`${url}/traenere?select=*`, options);
  return res.json();
}

export async function getIkoner() {
  const res = await fetch(`${url}/ikoner?select=*`, options);
  return res.json();
}

/** Services og tranere nested sammen. */
export async function getAllData() {
  const res = await fetch(
    `${url}/services?select=*,traenere(*),ikoner(*)`,
    options,
  );
  const data = await res.json();
  if (!Array.isArray(data)) return data;

  // const needsManualJoin = data.some((row) => !row.traenere);
  // if (!needsManualJoin) {
  //   return data.map((row) => ({ ...row, traener: row.traenere }));
  // }

  const traenere = await getTraenere();
  const ikoner = await getIkoner();
  return joinAllData(data, traenere, ikoner);
}

/** FK services → traenere.traener_id (int8), e.g. 1001 */
export function getTraenerId(service) {
  return service?.["services.traener_id"] ?? service?.traener_id ?? null;
}

export function getIkonId(service) {
  return service?.["services.ikon_id"] ?? service?.ikon_id ?? null;
}

export async function getServicesAndTraenerBySlug(slug) {
  const res = await fetch(
    `${url}/services?slug=eq.${encodeURIComponent(slug)}&select=*,traenere(*)`,
    options,
  );
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return data;

  const row = data[0];
  if (row.traenere) return data;

  const traenerId = getServiceTraenerId(row);
  if (traenerId == null) return data;

  const tRes = await fetch(
    `${url}/traenere?traener_id=eq.${traenerId}&select=*`,
    options,
  );
  const trainers = await tRes.json();
  row.traenere = Array.isArray(trainers) ? (trainers[0] ?? null) : null;
  return data;
}

export async function getServicesBySlug(slug) {
  const res = await fetch(
    `${url}/services?slug=eq.${encodeURIComponent(slug)}&select=*`,
    options,
  );
  return res.json();
}

export async function getServicesSlugs() {
  const res = await fetch(`${url}/services?select=slug`, options);
  return res.json();
}

export async function getTraenereBySlug(slug) {
  const res = await fetch(
    `${url}/traenere?traener_slug=eq.${encodeURIComponent(slug)}&select=*`,
    options,
  );
  return res.json();
}

export async function getTraenereSlugs() {
  const res = await fetch(`${url}/traenere?select=traener_slug`, options);

  const data = await res.json();

  return Array.isArray(data) ? data : [];
}

// Definerer lokationsgrupperne, hvor hver gruppe indeholder en liste af lokationer
export const lokationGroups = {
  Sydfyn: ["Svendborg"],
  Vestsjælland: ["Vestsjælland"],
  Midtjylland: ["Ikast"],
  Sydjylland: ["Vejen", "Sydjylland"],
  Sønderjylland: ["Sønderjylland", "Skærbæk"],
  Als: ["Als"],
  Online: ["Pr. aftale"],
};

export const groupStyles = {
  Sydfyn: "bg-(--main-200) !w-[100vw]",
  Vestsjælland: "bg-(--accent-200) !w-[100vw]",
  Midtjylland: "bg-(--main-200) !w-[100vw]",
  Sydjylland: "bg-(--accent-200) !w-[100vw]",
  Sønderjylland: "bg-(--main-200) !w-[100vw]",
  Als: "bg-(--accent-200) !w-[100vw]",
  Online: "bg-(--main-200) !w-[100vw]",
};

// Tjekker gruppen for en kategori, og returnerer gruppenavnet hvis det findes, ellers null
export function getLokationGroup(cat) {
  for (const group in lokationGroups) {
    if (lokationGroups[group].includes(cat)) {
      return group;
    }
  }
  return null;
}

// Returner gruppenavnet hvis det findes, ellers null
export function getFilterLokation(services, selectedLokation) {
  if (selectedLokation === "Alle") return services;

  const selectedGroup =
    lokationGroups[selectedLokation] || getLokationGroup(selectedLokation);

  return selectedGroup
    ? services.filter((item) =>
        lokationGroups[selectedGroup].includes(item.lokation),
      )
    : [];
}

export function getGroupedByLokation(services) {
  const grouped = {};
  Object.keys(lokationGroups).forEach((group) => {
    grouped[group] = services
      .filter((item) => lokationGroups[group].includes(item.lokation))
      .sort((a, b) => (a.hold > b.hold ? 1 : -1)); // Sorterer elementerne inden for hver gruppe alfabetisk efter hold
  });
  return grouped;
}

export function getDisplayedGroups(groupedByLokation, selectedLokation) {
  if (selectedLokation === "Alle") {
    return Object.keys(groupedByLokation).filter(
      (group) => groupedByLokation[group]?.length > 0,
    );
  }
  const selectedGroup =
    lokationGroups[selectedLokation] || getLokationGroup(selectedLokation);

  return selectedGroup ? [selectedGroup] : [];
}

export const krTilDKK = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  currencyDisplay: "code",
});

export function firstRow(rows) {
  return Array.isArray(rows) ? (rows[0] ?? null) : null;
}

export function getPageData(service) {
  if (!service) return null;
  const t = service.traenere ?? null;
  const i = service.ikoner ?? null;
  return {
    // services
    type: service.type,
    lokation: service.lokation,
    pris: service.pris,
    hold: service.hold,
    tilbud: service.tilbud,
    tilbud_procent: service.opstart,
    opstart: service.opstart,
    afslut: service.afslut,
    img: service.produkt_img,
    tilmelding: service.tilmelding,
    slug: service.slug,
    // traenere
    fornavn: t?.fornavn,
    efternavn: t?.efternavn,
    adresse_1: t?.adresse_1,
    postnummer_1: t?.postnummer_1,
    bynavn_1: t?.bynavn_1,
    adresse_2: t?.adresse_2,
    postnummer_2: t?.postnummer_2,
    bynavn_2: t?.bynavn_2,
    traener_mail: t?.traener_mail,
    traener_tlf: t?.traener_tlf,
    traener_info: t?.traener_info,
    profil_img: t?.profilbillede_img,
    testimonial_1: t?.testimonial_1,
    testimonial_2: t?.testimonial_2,
    testimonial_3: t?.testimonial_3,
    fornavn_2: t?.fornavn_2,
    efternavn_2: t?.efternavn_2,
    t_slug: t?.traener_slug,
    // ikoner
    status_txt: i?.status_txt,
    status_ikon: i?.ikon_url,
  };
}

// Map Services db og Traenere db sammen, sammenlign foreign key som er traener_id
export function joinAllData(services, traenere, ikoner) {
  return services.map((s) => ({
    ...s,
    traener: traenere.find((t) => t.traener_id === getTraenerId(s)) ?? null,
    ikon: ikoner.find((i) => i.ikon_id === getIkonId(s)) ?? null,
  }));
}
