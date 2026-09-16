# Devarsh Patel — An Open Notebook

An interactive portfolio built with Next.js and React: draggable notes, connected chapters, project explorations, a reading shelf, creative work, and socials.

## Development

Use Node.js 22 or newer. Run `npm ci`, then `npm run dev`. Validate with `npm run typecheck` and `npm run build`.

## Vercel deployment

Import `itsdevarshpatel/Portfolio` into Vercel, select the Next.js framework, and deploy the `main` branch. The included `vercel.json` sets the install and build commands.

The public portfolio works with the curated entries in `app/content.ts` without external storage.

## Private editor

1. Create a **private** Vercel Blob store and connect it to this project. Vercel supplies `BLOB_READ_WRITE_TOKEN`.
2. Generate a random access key with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
3. Set `PORTFOLIO_ADMIN_TOKEN` to that key in Vercel environment variables, then redeploy. Never commit the key.
4. Open `/admin` and sign in with the key. Sessions expire after eight hours.

The editor supports projects, research notes, articles, books, current activities, creative work, and socials. Draft entries and private attachments require editor authentication. Published attachments are served through the application. Uploads are limited to 4 MB; use links for larger media. Entry saves use conditional writes to detect concurrent changes.

Without the environment variables the editor stays locked and the public seeded portfolio remains available. Copy `.env.example` to `.env.local` for local editing with a development store.

## Content

Edit `app/content.ts` for initial entries and `app/notebook.tsx` for the curated narrative. Resume download: `public/resume.pdf`. Never add credentials or private drafts to public source files.
