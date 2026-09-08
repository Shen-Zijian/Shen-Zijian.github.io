import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const siteOrigin = "https://shen-zijian.github.io";
const exportDirectory = new URL("../dist/client/", import.meta.url);
const html = await readFile(new URL("index.html", exportDirectory), "utf8");
const document = parse(html);

test("exports the academic profile as complete HTML", () => {
  assert.equal(document.querySelector("h1")?.textContent.trim(), "Zijian Shen");
  assert.equal(
    document.querySelector("title")?.textContent,
    "Zijian Shen | Intelligent Mobility Research",
  );
  const headings = document.querySelectorAll("h2").map((heading) =>
    heading.textContent.replace(/\s+/g, " ").trim(),
  );
  assert.ok(headings.some((heading) => heading.includes("Engineering intelligence")));
  assert.ok(headings.includes("Selected publications"));
  assert.ok(document.querySelector("main#main-content"));
});

test("uses the GitHub Pages origin for search and sharing metadata", async () => {
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
  assert.ok(canonical, "The exported page needs a canonical URL");
  assert.equal(new URL(canonical).href, `${siteOrigin}/`);
  assert.equal(
    document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
    `${siteOrigin}/og.png`,
  );
  const image = await stat(new URL("og.png", exportDirectory));
  assert.ok(image.isFile() && image.size > 0, "The sharing image must be exported");
});

test("exports every referenced local script, stylesheet, image, and PDF", async () => {
  const groups = [
    ["script[src]", "src", false],
    ['link[rel="stylesheet"][href]', "href", true],
    ["img[src]", "src", true],
    ['a[href$=".pdf"]', "href", true],
  ];
  const references = new Set();

  for (const [selector, attribute, required] of groups) {
    const local = document.querySelectorAll(selector)
      .map((element) => element.getAttribute(attribute))
      .filter((value) => value?.startsWith("/") && !value.startsWith("//"));
    if (required) {
      assert.ok(local.length > 0, `Expected local resources matching ${selector}`);
    }
    for (const reference of local) references.add(reference);
  }

  for (const reference of references) {
    const resource = new URL(reference, siteOrigin);
    const file = await stat(new URL(`.${resource.pathname}`, exportDirectory));
    assert.ok(file.isFile() && file.size > 0, `Missing or empty resource: ${reference}`);
  }
});

test("keeps every local section link connected to an exported target", () => {
  const ids = new Set(document.querySelectorAll("[id]")
    .map((element) => element.getAttribute("id")));
  const links = document.querySelectorAll('a[href^="#"]');
  assert.ok(links.length > 0, "The profile should contain section navigation");

  for (const link of links) {
    const target = decodeURIComponent(link.getAttribute("href").slice(1));
    assert.ok(ids.has(target), `Missing fragment target: #${target}`);
  }
});
