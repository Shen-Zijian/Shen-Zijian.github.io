import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
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
    assert.match(text(document.querySelector("title")), /Zijian Shen/);
    assert.match(text(profile), /Zijian Shen/);
    assert.match(text(profile), /Ph\.?D\.? Student/i);
    assert.doesNotMatch(text(profile), /M\.?Phil\.?|Incoming/i);
    assert.match(text(profile), /The University of Hong Kong/);
    assert.ok(document.querySelector('a[href="mailto:shenzj@connect.hku.hk"]'));
    assert.ok(document.querySelector('img[src="/zijian-shen-portrait.jpg"]'));
    assert.doesNotMatch(text(main), /ReLMM-TG|\bSelected\b/i);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);

    const primaryNavigation = document.querySelector('nav[aria-label="Primary navigation"]');
    assert.ok(primaryNavigation);
    const active = primaryNavigation.querySelectorAll('a[aria-current="page"]');
    assert.equal(active.length, 1);
    assert.equal(active[0].getAttribute("href"), route.path);
    for (const destination of routes) {
      assert.ok(primaryNavigation.querySelector(`a[href="${destination.path}"]`));
    }

    if (route.path === "/research/") {
      assert.match(text(main), /Publications/);
      assert.match(text(main), /LEBGen:/);
      assert.match(text(main), /LAB-Tab:/);
      for (const id of ["journal-papers", "conference-papers", "working-papers", "projects"]) {
        assert.ok(main.querySelector(`#${id}`));
      }
    }
    if (route.path === "/experience/") {
      assert.match(text(main), /Teaching Assistant/);
      for (const code of ["CIVL6047", "CIVL3120", "CIVL7018", "CIVL7021"]) {
        assert.ok(text(main).includes(code));
      }
      assert.match(text(main), /Master of Philosophy/);
    }
  });
}

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
