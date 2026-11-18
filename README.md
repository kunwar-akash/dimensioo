# Dimensioo

Next.js App Router website for an independent creative marketing agency. The site uses React, TypeScript, Lucide, CSS motion, and locally hosted Geist. The portfolio, services, team, and creator profiles use typed content so updates can stay in source control.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Use `npm run lint`, `npm run typecheck`, and `npm run build` to validate changes.

## Edit the site

- **Logo** — Add the original light-on-dark wordmark to `public/assets/` and replace the temporary `Wordmark` in `src/app/layout.tsx` with an image at its native aspect ratio. Replace `public/icon.svg` with the official favicon. The footer display type can stay as an editorial treatment.
- **Brand colors and typography** — Edit tokens in `src/app/styles.css`. Geist is hosted locally with its license under `public/assets/`.
- **Services, portfolio, team, and creators** — Edit `src/content.ts`. Slugs generate detail pages and sitemap entries. Add approved images under `public/assets/` and include descriptive alternative text. The current projects and artwork are concepts. Replace them with verified real work when available. Profile sections activate when approved entries are added to the team or influencer arrays.
- **Contact channels** — Set the public contact variables using `.env.example`. Email, phone, Instagram, and consultation links appear when their values are set. Use an absolute HTTPS URL for booking and Instagram.
- **Canonical URLs** — Set `NEXT_PUBLIC_SITE_URL` to the destination origin before building. It drives canonical tags, social metadata, and the sitemap.
- **Legal** — Update the privacy policy and terms in `src/components/pages.tsx` to reflect the agency’s actual policies and applicable law before public launch.

## Enable inquiries and creator applications

Set `WEB3FORMS_ACCESS_KEY` as a server secret to send contact inquiries and creator applications to the inbox linked to that key. Alternatively, set `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL` with a verified Resend sender. Web3Forms takes precedence when both are configured.

The API validates submissions, checks the request origin, rejects the honeypot, and limits the request size. Forms show an unavailable state when no provider is configured. A success response requires acceptance by the configured provider. After configuring the inbox, verify delivery with a test submission.

## Deploy

For a Next.js hosting provider, import the repository, select the Next.js preset, add the environment variables, and deploy. For standalone Node deployment, run `npm run build`, copy `public/` and `.next/static/` into the standalone tree, and run `npm start`. Provide the inquiry credentials to the running server.

Build the Cloudflare adapter bundle with `npm run build:worker` when deploying to a Worker-compatible host. The canonical URL and public links are build-time variables. Supply email credentials as Worker secrets. Validate dynamic forms and direct navigation on the destination before opening the site to visitors.

For a Sites deployment, register a Site and create its local `.openai/hosting.json` with the assigned project ID. Then run `npm run build:worker` followed by `npm run package:sites`. Archive `.openai/hosting.json` and `dist/server/index.js` together at the archive root and save it against the pushed source commit.
