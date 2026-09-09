import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const postcss = require("postcss");
const profileUrls = [
  "mailto:shenzj@connect.hku.hk",
  "https://github.com/Shen-Zijian",
  "https://scholar.google.com/citations?user=JTVGGt0AAAAJ&hl=en",
  "https://www.researchgate.net/profile/Zijian-Shen-4",
  "https://www.linkedin.com/in/zijian-shen-622005415/",
];
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const routes = [
  { path: "/", heading: "About me" },
  { path: "/research/", heading: "Research" },
  { path: "/experience/", heading: "Experience" },
];

function text(element) {
  return element?.textContent.replace(/\s+/g, " ").trim() ?? "";
}

async function render(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

for (const route of routes) {
  test(`server-renders ${route.path} with complete content and active navigation`, async () => {
    const response = await render(route.path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    const document = parse(html);
    const main = document.querySelector("main#main-content");
    const profile = document.querySelector("aside");
    assert.equal(text(main?.querySelector("h1")), route.heading);
    assert.match(text(document.querySelector("title")), /Shen Zijian/);
    assert.match(text(profile), /Shen Zijian/);
    assert.equal(text(profile.querySelector(".identity-name")), "Shen Zijian");
    assert.match(text(profile), /Ph\.?D\.? Student/i);
    assert.doesNotMatch(text(profile), /M\.?Phil\.?|Incoming/i);
    assert.match(text(profile), /The University of Hong Kong/);
    assert.match(text(profile), /Hong Kong, China/);
    const contactLinks = profile.querySelectorAll("a[href]")
      .map((link) => link.getAttribute("href"));
    for (const url of profileUrls) {
      assert.ok(contactLinks.includes(url), `Missing shared profile URL on ${route.path}: ${url}`);
    }
    assert.ok(document.querySelector('img[src="/zijian-shen-portrait.jpg"]'));
    assert.doesNotMatch(text(main), /ReLMM-TG|\bSelected\b/i);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
    assert.equal(document.querySelectorAll(".eyebrow, .section-index").length, 0);
    assert.doesNotMatch(text(document.querySelector("footer#contact")), /Get in touch/i);

    const primaryNavigation = document.querySelector('nav[aria-label="Primary navigation"]');
    assert.ok(primaryNavigation);
    const active = primaryNavigation.querySelectorAll('a[aria-current="page"]');
    assert.equal(active.length, 1);
    assert.equal(active[0].getAttribute("href"), route.path);
    for (const destination of routes) {
      assert.ok(primaryNavigation.querySelector(`a[href="${destination.path}"]`));
    }

    if (route.path === "/") {
      assert.equal(text(main.querySelector(".home-background h2")), "Background");
      assert.doesNotMatch(text(main), /Across disciplines/i);
      assert.equal(main.querySelectorAll(".research-theme > span").length, 0);
    }
    if (route.path === "/research/") {
      assert.match(text(main), /Publications/);
      assert.match(text(main), /LEBGen:/);
      assert.match(text(main), /LAB-Tab:/);
      for (const id of ["journal-papers", "conference-papers", "working-papers", "projects"]) {
        assert.ok(main.querySelector(`#${id}`));
      }
      for (const group of main.querySelectorAll(".publication-group")) {
        assert.equal(text(group.querySelector(".subsection-heading")), text(group.querySelector(".subsection-heading h3")));
        const papers = group.querySelectorAll("article");
        papers.forEach((paper, index) => {
          assert.equal(text(paper.querySelector(".publication-number")), `${index + 1}.`);
          const status = paper.querySelector(".paper-status");
          if (status) {
            const elements = paper.querySelectorAll("*");
            const venue = paper.querySelector(".publication-venue");
            assert.ok(venue);
            assert.ok(elements.indexOf(status) > elements.indexOf(venue));
          }
        });
      }
      assert.match(text(main.querySelector("#journal-papers .publication-venue")), /2026/);
      assert.deepEqual(main.querySelectorAll("#projects .project-number").map(text), ["1.", "2.", "3.", "4."]);
      for (const project of main.querySelectorAll("#projects article")) {
        const funder = project.querySelector(".project-funder");
        const metadata = funder?.querySelector(".project-meta");
        assert.ok(funder && metadata);
        assert.equal(project.querySelectorAll(".project-meta").length, 1);
        const elements = project.querySelectorAll("*");
        assert.ok(elements.indexOf(project.querySelector("h3")) < elements.indexOf(funder));
        assert.match(text(metadata), /20\d{2} - 20\d{2}/);
        assert.match(text(metadata), /STF \/|ECF \/|MRF 2025 \/ /);
      }
      const conferencePapers = main.querySelector("#conference-papers");
      assert.equal(conferencePapers.querySelectorAll("article").length, 4);
      for (const title of [
        "A temporally aware deep reinforcement learning framework for centralized multi-path recommendation in large-scale multimodal transit networks.",
        "Multipath: Deep learning based multimodal route guidance with user preference integration.",
        "Personalized fair matching in peer-to-peer ridesharing platforms under broadcasting mode: a LLM-driven driver approach.",
      ]) {
        const article = conferencePapers.querySelectorAll("article")
          .find((entry) => text(entry).includes(title));
        assert.ok(article, `Missing conference presentation: ${title}`);
        assert.match(text(article), /Conference presentation/i);
      }
    }
    if (route.path === "/experience/") {
      assert.match(text(main), /Teaching Assistant/);
      assert.match(text(main.querySelector("#teaching .section-intro")), /The University of Hong Kong/);
      for (const code of ["CIVL6047", "CIVL3120", "CIVL7018", "CIVL7021"]) {
        assert.ok(text(main).includes(code));
      }
      const mphil = main.querySelectorAll("#education article")
        .find((entry) => text(entry).includes("Master of Philosophy in Civil Engineering"));
      assert.ok(mphil);
      assert.match(text(mphil), /09\/2024 - 07\/2026/);
      assert.doesNotMatch(text(mphil), /Expected|Present|Upcoming/i);
      const scholarship = main.querySelectorAll("#awards article")
        .find((entry) => text(entry.querySelector("h3")) === "Postgraduate Scholarship, The University of Hong Kong");
      assert.ok(scholarship);
      const undergraduate = main.querySelectorAll("#awards article")
        .find((entry) => text(entry.querySelector("h3")).startsWith("Second-Class Scholarship for Academic Excellence"));
      assert.ok(undergraduate);
      assert.equal(
        text(undergraduate.querySelector("h3")),
        "Second-Class Scholarship for Academic Excellence, Beijing Institute of Technology",
      );
      assert.doesNotMatch(text(undergraduate), /Postgraduate Scholarship/);
      assert.equal(main.querySelector("#presentations"), null);
      assert.equal(main.querySelector('a[href="#presentations"]'), null);
    }
  });
}

test("shares entry typography and baseline rules without expanding the font palette", async () => {
  const css = postcss.parse(await readFile(new URL("../app/globals.css", import.meta.url), "utf8"));
  const fontTokens = new Map([
    ["--font-sans", "Arial, sans-serif"],
    ["--font-serif", "Georgia, serif"],
    ["--font-chinese", '"Songti SC", serif'],
  ]);
  const declaredFontTokens = new Set();
  css.walkDecls(/^--font-/, (declaration) => {
    declaredFontTokens.add(declaration.prop);
    assert.equal(declaration.value, fontTokens.get(declaration.prop));
  });
  assert.deepEqual(declaredFontTokens, new Set(fontTokens.keys()));
  css.walkDecls("font-family", (declaration) => {
    assert.ok([...fontTokens.keys()].some((token) => declaration.value === `var(${token})`), `Unmanaged font family: ${declaration.value}`);
  });

  const entrySelectors = [
    ".publication-number", ".publication-main h4", ".project-number", ".project-row h3",
    ".record-dates", ".record-row h3", ".course-code", ".course-main h3",
    ".course-term p", ".award-row > span", ".award-row h3",
  ];
  const typography = new Map([
    ["font-family", "var(--font-serif)"],
    ["font-size", "var(--entry-title-size)"],
    ["font-weight", "600"],
    ["line-height", "1.4"],
  ]);
  const sharedRules = [];
  css.walkRules((rule) => {
    if (entrySelectors.every((selector) => rule.selectors.includes(selector))) sharedRules.push(rule);
    if (rule.selectors.some((selector) => entrySelectors.includes(selector))) {
      rule.walkDecls((declaration) => {
        if (typography.has(declaration.prop)) {
          assert.equal(declaration.value, typography.get(declaration.prop), `Conflicting entry typography in ${rule.selector}`);
        }
      });
    }
  });
  assert.equal(sharedRules.length, 1, "Entry labels and headings should share one typography rule");
  const sharedDeclarations = new Map(sharedRules[0].nodes
    .filter((node) => node.type === "decl").map((node) => [node.prop, node.value]));
  for (const [property, value] of typography) assert.equal(sharedDeclarations.get(property), value);
  const sizeDeclarations = [];
  css.walkDecls("--entry-title-size", (declaration) => sizeDeclarations.push(declaration));
  assert.equal(sizeDeclarations.length, 1, "Entry title size must not diverge at mobile breakpoints");
  assert.equal(sizeDeclarations[0].value, "22px");

  for (const selector of [".publication-row", ".project-row", ".record-row", ".teaching-row", ".award-row"]) {
    const alignments = [];
    css.walkRules((rule) => {
      if (rule.selectors.includes(selector)) rule.walkDecls("align-items", (declaration) => alignments.push(declaration.value));
    });
    assert.ok(alignments.length > 0, `Missing baseline alignment for ${selector}`);
    assert.ok(alignments.every((value) => value === "first baseline"));
  }
  css.walkRules((rule) => {
    if (rule.selectors.some((selector) => [".publication-number", ".project-number", ".course-code"].includes(selector))) {
      rule.walkDecls(/^padding(?:-|$)/, (declaration) => {
        assert.ok(declaration.value.split(/\s+/).every((value) => /^0(?:px|rem|em|%)?$/.test(value)), `Extra label padding in ${rule.selector}`);
      });
    }
  });
});

test("ships the profile assets without starter dependencies", async () => {
  const [layout, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(layout, /codex-preview|Starter Project|SkeletonPreview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/zijian-shen-portrait.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/Zijian_Shen_Academic_CV.pdf", import.meta.url)),
  ]);

  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
});
