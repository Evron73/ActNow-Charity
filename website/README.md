# ActNow website (actnowcharity.com)

Marketing + trust on the web; **action in the app**.

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Main landing (neon design + full content) |
| `tortenet.html`, `kampany/szendro.html` | Stories |
| `partnerek.html`, `szervezetek.html` | Partners & org onboarding |
| `adatvedelem.html`, `aszf.html` | Legal (links to api.actnow.hu) |
| `app/*/index.html` | Deep-link bridges → `actnow://…` |
| `assets/open-app.js` | Web → app + App Store fallback |
| `.well-known/apple-app-site-association` | iOS Universal Links (`/app/*`) |
| `CNAME` | GitHub Pages custom domain |

## App ↔ web

| Web | App route |
|-----|-----------|
| `/app/daily-donation` | `/profile/daily-donation` |
| `/app/redeem` | `/profile/daily-donation/redeem` |
| `/app/offer` | `/(tabs)/offer-create` |
| `/app/partner` | `/partner-registration` |
| `/app/auction` | `/charity-auction` |

App constants: `actnow/constants/website.ts`, `actnow/constants/deepLinks.ts`, `actnow/hooks/useActNowDeepLink.ts`.

## Deploy (GitHub Pages)

Upload the entire `website/` folder contents to the **root** of the actnowcharity.com repo:

- `index.html`, subpages, `app/`, `assets/`, `CNAME`, `.well-known/`

After deploy, verify:

- https://actnowcharity.com/.well-known/apple-app-site-association (no `.json` extension)
- Open `/app/offer` on iPhone with app installed → should open app

Android App Links need `assetlinks.json` with your release SHA-256 fingerprint (add when ready).

## Design tokens

Background `#050505` · Neon `#b8ff2e` · Font Inter

Baseline reference: `actnow-neon-kepek.html`
