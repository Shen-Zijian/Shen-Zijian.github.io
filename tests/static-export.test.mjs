import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const siteOrigin = "https://shen-zijian.github.io";
const exportDirectory = new URL("../dist/client/", import.meta.url);
const routes = [
  { path: "/", label: "Home", heading: "About me", file: "index.html" },
  { path: "/research/", label: "Research", heading: "Research", file: "research/index.html" },
  { path: "/experience/", label: "Experience", heading: "Experience", file: "experience/index.html" },
];
const documents = new Map(await Promise.all(routes.map(async (route) => [
  route.path,
  parse(await readFile(new URL(route.file, exportDirectory), "utf8")),
])));

function text(element) {
  return element?.textContent.replace(/\s+/g, " ").trim() ?? "";
}

function articleContaining(document, title) {
  const article = document.querySelectorAll("article")
    .find((element) => text(element).includes(title));
  assert.ok(article, `Expected an article containing: ${title}`);
  return article;
}

for (const route of routes) {
  const document = documents.get(route.path);

  test(`exports ${route.path} with its own heading and shared profile navigation`, () => {
    const main = document.querySelector("main#main-content");
    const profile = document.querySelector("aside");
    assert.ok(main, "Every page needs a main content target for its skip link");
    assert.equal(text(main.querySelector("h1")), route.heading);
    assert.match(text(document.querySelector("title")), /Zijian Shen/);
    assert.match(text(profile), /Zijian Shen/);
    assert.match(text(profile), /Ph\.?D\.? Student/i);
    assert.doesNotMatch(text(profile), /M\.?Phil\.?|Incoming/i);
    assert.doesNotMatch(text(main), /ReLMM-TG|\bSelected\b|SkeletonPreview/i);

    const primaryNavigation = document.querySelector('nav[aria-label="Primary navigation"]');
    assert.ok(primaryNavigation);
    const navigation = primaryNavigation.querySelectorAll("a");
    for (const destination of routes) {
      const link = navigation.find((element) =>
        element.getAttribute("href") === destination.path
        && text(element) === destination.label);
      assert.ok(link, `Missing ${destination.label} navigation on ${route.path}`);
      assert.equal(
        link.getAttribute("aria-current") === "page",
        destination.path === route.path,
        `Incorrect active navigation for ${destination.path} on ${route.path}`,
      );
    }
    assert.equal(
      primaryNavigation.querySelectorAll('a[aria-current="page"]').length,
      1,
      "Exactly one primary navigation item should be active",
    );
  });

  test(`uses route-specific GitHub Pages metadata for ${route.path}`, () => {
    const expectedUrl = new URL(route.path, siteOrigin).href;
    assert.equal(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      expectedUrl,
    );
    assert.equal(
      document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
      expectedUrl,
    );
    assert.equal(
      document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      `${siteOrigin}/og.png`,
    );
    assert.equal(
      document.querySelector('meta[name="twitter:image"]')?.getAttribute("content"),
      `${siteOrigin}/og.png`,
    );
  });
}

test("organizes publications and projects without presenting submissions as accepted papers", () => {
  const document = documents.get("/research/");
  const headings = document.querySelectorAll("h2").map(text);
  assert.ok(headings.includes("Publications"));
  for (const id of ["journal-papers", "conference-papers", "working-papers", "projects"]) {
    assert.ok(document.querySelector(`#${id}`), `Missing research section: ${id}`);
  }

  const workingPapers = document.querySelector("#working-papers");
  const lebgen = articleContaining(workingPapers, "LEBGen:");
  assert.match(text(lebgen), /An LLM-Enhanced Bayesian Network Framework for Few-Shot Travel Survey Data Generation/);
  assert.match(text(lebgen), /Shen, Z\., Zhou, B\., Wang, J\., Zhao, Y\., and Ke, J\./);
  assert.match(text(lebgen), /Under review/i);

  const labTab = articleContaining(workingPapers, "LAB-Tab:");
  assert.match(text(labTab), /AAAI 2027/);
  assert.match(text(labTab), /Under review/i);
  assert.ok(labTab.querySelector('a[href="https://arxiv.org/abs/2608.01879"]'));
  assert.doesNotMatch(text(document.querySelector("#conference-papers")), /LAB-Tab/);

  const routing = articleContaining(workingPapers, "Centralized Route Recommendation");
  assert.match(text(routing), /Major revision/i);
  assert.doesNotMatch(text(routing), /Minor revision/i);
  const smartSim = articleContaining(workingPapers, "SmartSim:");
  assert.match(text(smartSim), /Minor revision/i);
  assert.doesNotMatch(text(smartSim), /Major revision/i);
});

test("renders the supplied teaching appointments and preserves education history", () => {
  const document = documents.get("/experience/");
  const teaching = document.querySelector("#teaching");
  assert.ok(teaching, "Expected a dedicated teaching section");
  assert.match(text(teaching), /Teaching Assistant/);

  const courses = [
    { code: "CIVL6047", years: ["2025-2026"], upcoming: false },
    { code: "CIVL3120", years: ["2026-2027"], upcoming: true },
    { code: "CIVL7018", years: ["2025-2026", "2026-2027"], upcoming: true },
    { code: "CIVL7021", years: ["2025-2026"], upcoming: false },
  ];
  for (const course of courses) {
    const article = articleContaining(teaching, course.code);
    const content = text(article);
    for (const year of course.years) {
      assert.ok(content.includes(year), `Missing ${year} appointment for ${course.code}`);
    }
    if (course.upcoming) assert.match(content, /Upcoming/i);
    const officialSource = article.querySelectorAll("a[href]").some((link) => {
      const url = new URL(link.getAttribute("href"), siteOrigin);
      return url.hostname === "hku.hk" || url.hostname.endsWith(".hku.hk");
    });
    assert.ok(officialSource, `${course.code} should link to its official HKU course source`);
  }
  assert.match(text(document.querySelector("main")), /Master of Philosophy/);
});

test("exports every referenced local script, stylesheet, image, and PDF", async () => {
  const groups = [
    ["script[src]", "src", false],
    ['link[rel="stylesheet"][href]', "href", true],
    ["img[src]", "src", true],
    ['a[href$=".pdf"]', "href", true],
  ];
  const references = new Set(["/og.png", "/zijian-shen-portrait.jpg"]);

  for (const [path, document] of documents) {
    for (const [selector, attribute, required] of groups) {
      const local = document.querySelectorAll(selector)
        .map((element) => element.getAttribute(attribute))
        .filter((value) => value?.startsWith("/") && !value.startsWith("//"));
      if (required) {
        assert.ok(local.length > 0, `Expected local resources matching ${selector} on ${path}`);
      }
      for (const reference of local) references.add(reference);
    }
    assert.ok(document.querySelector('img[src="/zijian-shen-portrait.jpg"]'));
  }

  for (const reference of references) {
    const resource = new URL(reference, siteOrigin);
    const file = await stat(new URL(`.${resource.pathname}`, exportDirectory));
    assert.ok(file.isFile() && file.size > 0, `Missing or empty resource: ${reference}`);
  }
});

test("keeps all local page links and fragments connected to exported targets", async () => {
  for (const [path, document] of documents) {
    for (const link of document.querySelectorAll("a[href]")) {
      const href = link.getAttribute("href");
      const target = new URL(href, new URL(path, siteOrigin));
      if (target.origin !== siteOrigin) continue;

      const targetDocument = documents.get(target.pathname);
      if (targetDocument) {
        if (target.hash) {
          const id = decodeURIComponent(target.hash.slice(1));
          const exists = targetDocument.querySelectorAll("[id]")
            .some((element) => element.getAttribute("id") === id);
          assert.ok(exists, `Missing fragment target ${href} linked from ${path}`);
        }
        continue;
      }

      const file = await stat(new URL(`.${target.pathname}`, exportDirectory));
      assert.ok(file.isFile(), `Missing local destination ${href} linked from ${path}`);
    }
  }
});
