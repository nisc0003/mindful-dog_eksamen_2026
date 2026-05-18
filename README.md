# Mindful-Dog Academy - Eksamen 2026
____________________________________________________________________

## Om projektet
____________________________________________________________________

Mindful-Dog Academy v. Grace Hidalgo arbejder med en alternativ, holistisk og relationsbaseret tilgang til hundetraening.

Projektet er et redesign af virksomhedens website, da det nuvaerende site er uoverskueligt og ikke understotter booking, tilmelding eller brandets visuelle identitet godt nok.

---
____________________________________________________________________

## Installation
____________________________________________________________________

1. Clone repository:
```bash
git clone https://github.com/<brugernavn>/mindful-dog_eksamen_2026.git
cd mindful-dog_eksamen_2026
```

2. Installer dependencies:
```bash
npm install
```

3. Start udviklingsserver:
```bash
npm run dev
```

4. Byg og preview produktion:
```bash
npm run build
npm run preview
```

---
____________________________________________________________________

## Projektstruktur
____________________________________________________________________

```text
src/
├── assets/
│   ├── Images/
│   ├── Illustrations/
│   └── Videos/
│
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Heading.astro
│   ├── Text.astro
│   ├── CrawlButton.astro
│   ├── Button.astro
│   ├── Link.astro
│   ├── HeroMain.astro
│   ├── HeroSecond.astro
│   ├── Map.astro
│   ├── Infobox.astro
│   ├── ProfileCard.astro
│   └── ProductCard.astro
│
├── layouts/
│   └── MainLayout.astro
│
├── pages/
│   ├── komponentbibliotek.astro
│   ├── index.astro
│   ├── Om_os.astro
│   ├── Hold_oversigt.astro
│   ├── Hold_side/
│   │   └── [slug].astro
│   │
│   ├── Instruktoer_profil/
│   │   └── [slug].astro
│   │
│   ├── Bliv_instruktoer.astro
│   ├── Quiz.astro
│   ├── Nyhedsbrev.astro
│   └── Kontakt.astro
│
├── styles/
│   └── tailwind.css
│
└── scripts/

public/
```

Kort forklaring:

- `components` -> Genbrugelige komponenter
- `layouts` -> Layouts til sider
- `pages` -> Alle routes/sider
- `styles` -> Global CSS og Tailwind styles
- `scripts` -> JavaScript-funktioner
- `assets` -> Billeder, SVG'er og assets
- `public` -> Statiske filer

---
____________________________________________________________________

## Branch-struktur
____________________________________________________________________

Vi bruger branches til at holde udviklingen organiseret.

### `feature/<navn>`

Bruges når du starter noget nyt.

Eksempler:

- `feature/card`
- `feature/booking-form`
- `feature/Button`

Bruges når:

- du laver en ny komponent, fx `Card.astro`
- du bygger en ny side eller funktion
- du starter noget nyt

### `fix/<navn>`

Bruges når noget ikke virker korrekt.

Eksempler:

- `fix/mobile-menu`
- `fix/booking-error`

Bruges når:

- du retter fejl i eksisterende kode
- noget visuelt eller funktionelt er brudt

### `design/<navn>`

Bruges når du kun ændrer udseende.

Eksempler:

- `design/hero-section`
- `design/card-spacing`

Bruges når:

- du aendrer styling med Tailwind/CSS
- du forbedrer UI uden funktionelle aendringer

### Saadan bruger du branches i praksis

- Starter du en ny komponent, fx `Card.astro` -> `feature/card-component`
- Retter du en eksisterende komponent -> `fix/card-component`
- Ændrer du kun styling -> `design/card-component`

---

## Commit-konventioner

- `feat:` ny feature
- `fix:` fejlrettelse
- `style:` styling
- `docs:` dokumentation
- `improve:` kodeforbedring

## Eksempler:

- `feat: add booking form`
- `fix: fix mobile menu`
- `style: update hero spacing`
- `docs: update readme`
- `improve: simplify layout`

---
____________________________________________________________________

## Problemstilling
____________________________________________________________________

Hvordan designer og udvikler vi en hjemmeside der:

- repræsenterer Mindful-Dog Academys værdier og visuelle identitet
- gør booking og tilmelding intuitivt og friktionsfrit
- giver en mere professionel og administrerbar platform
- er teknisk fremtidssikret, performant og tilgængelig

___________________________

### Nuværende udfordringer
___________________________

- visuel identitet matcher ikke brandet
- bookingflow er komplekst og uoverskueligt
- mangler fleksibilitet i administration og indhold

___________________________

### Mål
___________________________

- skabe et sammenhængende visuelt udtryk
- forenkle booking- og tilmeldingsflow
- bygge et komponentbaseret og vedligeholdelsesvenligt system
- optimere performance og tilgaengelighed

___________________________

### Fokusomraader
___________________________

- styrke design og visuel identitet gennem benchmark, trends og klassiske designkonventioner
- fokus på bæredygtig webudvikling med DRY, komponentbaseret framework og begrænset brug af AI
- ekstra fokuspunkt kan være en tydeligere brugerrejse, bedre struktur eller enklere indholdsvedligeholdelse

---
____________________________________________________________________

## Teknologier
____________________________________________________________________

- Astro
- Tailwind CSS
- Alpine.js
- Motion One
- Prettier

---


