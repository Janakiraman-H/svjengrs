# Hosting SVJ at svjengrs.com

## Launch from GitHub in the Cloudflare dashboard

Repository: https://github.com/Janakiraman-H/svjengrs — production branch `main`.

This repository is a full-stack Next.js app configured for **Workers**, accessed through Cloudflare's **Workers & Pages** dashboard. Do not choose the Pages / Next.js Static HTML Export preset: there is no `out` folder, and static export does not run the existing enquiry API or server-protected admin. A Pages-specific version would require a separate backend adaptation, not just a different build setting.

1. Confirm `svjengrs.com` is registered and its Cloudflare zone is Active. Preserve any existing web/email records while reviewing conflicts.
2. Go to **Workers & Pages → Create application → Import a repository** on the Workers path. Connect GitHub and authorize `Janakiraman-H/svjengrs`.
3. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Worker/project name | `svj-consultants` (must match `wrangler.jsonc`) |
   | Production branch | `main` |
   | Root directory | Repository root (leave default) |
   | Build command | `npm run build:cloudflare` |
   | Deploy command | `npx opennextjs-cloudflare deploy -- --keep-vars` |
   | Build variable | `NODE_VERSION=22` |
   | Output directory | Not applicable for Workers; do not enter `out` or `.next` |

4. Review the initial deployment settings, then deploy. `wrangler.jsonc` already declares both `svjengrs.com` and `www.svjengrs.com` as Worker Custom Domains, so a successful deployment will attempt to attach them. Domain activation and permissions must be ready first. If there is a conflicting existing web record, resolve its exact target deliberately; do not delete unrelated DNS records.
5. Before announcing the site or accepting enquiries, apply the Supabase migration and add the runtime secrets listed below under the Worker’s **Settings → Variables and Secrets**. Save/deploy the updated settings. Without these, the site can render, but the form reports that submission is unavailable and admin login is disabled.
6. Verify both domains under **Settings → Domains & Routes** and wait for certificates to become Active. Test the live checklist below. Optional Resend notifications require sending-domain verification first.

The CLI login steps below are only needed for local publishing, not for Cloudflare's GitHub-connected dashboard deployment. Subsequent pushes to `main` trigger the connected production build. No Cloudflare project or GitHub integration is created merely by pushing the code.

Cloudflare references: [Workers Builds settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) and [Pages static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).

## Prepared in this project

- Cloudflare Worker: `svj-consultants`, built with OpenNext while retaining Next.js.
- Custom domains: `svjengrs.com` and `www.svjengrs.com`; `www` redirects permanently to the main HTTPS domain, preserving paths and query strings.
- Canonical metadata, structured data, robots and all 45 sitemap entries use `https://svjengrs.com`.
- Public pages are prerendered; the consultation API and protected admin run server-side. Static-asset caching does not require an R2 bucket. There is no ISR; content updates need a deployment.
- The adapter's optional cache interception shortcut is disabled: runtime testing reproduced a Next 16.3 segment-prefetch loop with it enabled. Next still uses the static-asset cache without that shortcut. See [the upstream issue](https://github.com/opennextjs/opennextjs-aws/issues/1212).
- Images are served directly from the included assets, without requiring Cloudflare Images. Public project pages remain image-free.
- Production never writes enquiries to temporary local files. If Supabase is not configured or unavailable, the form reports a failure and provides the existing Gmail address.
- Deployment preserves dashboard runtime variables with `--keep-vars`. Never put credentials in `wrangler.jsonc` or a `NEXT_PUBLIC_` variable.

## 1. Confirm the domain and authorize Cloudflare

Check Cloudflare Registrar and Websites: the exact name must be **svjengrs.com**, registration must be complete, and its zone must be Active. DNS checks on 6 September 2026 returned NXDOMAIN from both Google and Cloudflare resolvers; this requires checking the registration/delegation, not guessing an A record.

In a terminal in this project, use Node.js 22 or newer:

```bash
npm ci
npx wrangler login
npm run check:cloudflare
```

Complete login in your browser. Do not paste your password or API token into chat. Use the account containing the domain; if you have multiple accounts, set `CLOUDFLARE_ACCOUNT_ID` locally to the correct account ID. Do not use temporary-account deployment.

Before changing routing, inspect existing records for the two web hostnames. Preserve any existing website until cutover is agreed, and preserve all email MX/TXT/DKIM records. Do not delete conflicting records blindly.

## 2. Configure durable enquiries and administration

Use a Supabase project and apply `supabase/migrations/001_initial.sql` with its SQL editor. The service-role key must stay server-side. RLS is enabled and browser clients have no direct table access.

Set these runtime secrets on the `svj-consultants` Worker. The CLI prompts securely for each value (and may create the Worker on the first setup):

```bash
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put ADMIN_SESSION_SECRET
```

Use a strong unique admin password and an independently generated random session secret of at least 32 bytes. Do not add production secrets to source control. If configuring through the dashboard, use Worker Settings → Variables and Secrets; runtime settings are separate from build settings.

Optional email notifications:

1. Verify `svjengrs.com` in Resend using exactly the DNS records it supplies, preserving existing email records.
2. Set `RESEND_API_KEY` as a Worker secret: `npx wrangler secret put RESEND_API_KEY`.
3. The configured sender is `SVJ Website <website@svjengrs.com>`; recipient stays `svjengrs@gmail.com`. This sender setting does not create a mailbox. Do not enable notifications until verification succeeds.

Enquiries remain in Supabase if notification delivery fails. Analytics stays disabled unless `NEXT_PUBLIC_GA_ID` is deliberately supplied at build time with an appropriate consent setup.

## 3. Test, then publish

```bash
npm run lint
npm run typecheck
npm run build:cloudflare
npx opennextjs-cloudflare preview --port 8787
```

Preview is local at `http://localhost:8787`. To test with real services locally, use a gitignored `.env.local` with a **test** database, not production enquiry data. For the default unconfigured preview, a valid submission should return 503 rather than report a false success.

In another terminal:

```bash
SVJ_TEST_URL=http://localhost:8787 node scripts/verify-project-register.mjs
SVJ_TEST_URL=http://localhost:8787 node scripts/verify-hosting.mjs
```

For a fresh preview **without** any Supabase/admin credentials, `SVJ_EXPECT_UNCONFIGURED=1 node scripts/verify-hosting.mjs` also checks that a valid local test submission returns 503 and leaves the local enquiry file unchanged. Do not use that option against a configured deployment. To test the `www` redirect locally, start `npx wrangler dev --port 8788 --inspector-port 9231 --local-upstream www.svjengrs.com`, then run `SVJ_WWW_TEST_URL=http://localhost:8788 node scripts/verify-hosting.mjs` against the main preview. Wrangler normalizes incoming Host headers, so manually overriding Host is not a faithful test.

After account, domain, database and secrets are ready:

```bash
npm run deploy:cloudflare
```

This command publishes the Worker and attaches both custom domains. Cloudflare provisions the necessary DNS and TLS certificate for Worker Custom Domains. It is not necessary to buy another host, change nameservers away from Cloudflare, or invent an origin IP. Account limits or billing requirements must be reviewed before enabling a paid plan; the repository does not enable one.

For GitHub-connected Workers Builds, use the dashboard settings at the top of this document. Connecting the repository to Cloudflare is a separate account step; a Git push alone does not create the CI connection or publish the website.

## 4. Live acceptance checks

- Confirm `https://svjengrs.com` loads with a valid certificate; `https://www.svjengrs.com/projects?test=1` redirects to the main domain with its path and query preserved.
- Confirm HTTP redirects to HTTPS; enable the zone's Always Use HTTPS setting if needed. Do not change unrelated zone settings.
- Check homepage images, scroll transitions, mobile navigation, expertise controls, register filters and all assignment links.
- Confirm `/robots.txt` and `/sitemap.xml` use the correct domain.
- Submit one clearly marked test enquiry with consent, verify it in Supabase and `/admin`, and verify notification delivery if enabled. Do not declare the enquiry system live until this succeeds.
- Confirm signed-out visitors cannot access `/admin`, and sign-out removes access. Consider Cloudflare Access for an additional admin access layer before exposing admin credentials broadly.
- Keep the prior working deployment available for rollback. Delete any test enquiry only after its exact record has been confirmed.

## References

- [OpenNext setup](https://opennext.js.org/cloudflare/get-started)
- [Static-asset cache for prerendered pages](https://opennext.js.org/cloudflare/caching)
- [Runtime secrets and environment variables](https://opennext.js.org/cloudflare/howtos/env-vars)
- [Cloudflare Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
