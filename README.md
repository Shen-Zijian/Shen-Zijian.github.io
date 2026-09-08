# Shen Zijian | Academic Homepage

Personal academic website for Shen Zijian, covering research in intelligent
transportation, reinforcement learning, and large language models.

Website: [shen-zijian.github.io](https://shen-zijian.github.io)

## Local Development

Use Node.js 22.13.0 or newer.

```bash
npm ci
npm run dev
```

- `npm run build`: build the original vinext / Sites version.
- `npm run build:pages`: export the static GitHub Pages site to `dist/client/`.
- `npm run test:pages`: build and check page content, metadata, assets, and section links.

The GitHub Pages build does not require a server, database, or ChatGPT sign-in.

## Update Content

- Edit `app/lib/profile-data.ts` for publications, research interests, education, and experience.
- Edit `app/page.tsx`, `app/research/page.tsx`, and `app/experience/page.tsx` for the three page layouts.
- Edit `app/components/site-frame.tsx` for the shared profile, navigation, and contact details.
- Edit `app/globals.css` for visual styles and `app/lib/page-metadata.ts` for shared metadata.
- Replace `public/Zijian_Shen_Academic_CV.pdf` to update the downloadable CV.
- Replace `public/zijian-shen-portrait.jpg` for the portrait and social sharing image.
  The portrait uses a 3:4 crop; keep enough resolution for high-density screens.

Teaching entries link to official HKU course descriptions. Future appointments are
marked `Upcoming`; confirm their completion before changing that label.

## GitHub Pages Deployment

Repository: [Shen-Zijian/Shen-Zijian.github.io](https://github.com/Shen-Zijian/Shen-Zijian.github.io).

1. In the repository's **Settings > Pages**, set **Source** to **GitHub Actions**.
2. Push the source files to the `main` branch.
3. Follow **Actions > Deploy Academic Homepage** until both jobs succeed.

The workflow installs the locked dependencies, runs `npm run build:pages`, and
publishes `dist/client/`. Subsequent pushes to `main` automatically update the website.
To publish manually, select **Run workflow** on the `main` branch. No custom
repository secrets or personal access token are needed for the workflow.

Do not commit `node_modules/`, `dist/`, or other generated build files.

[GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
