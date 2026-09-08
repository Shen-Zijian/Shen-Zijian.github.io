import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the academic profile", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Zijian Shen \| Intelligent Mobility Research<\/title>/i);
  assert.match(html, /Engineering intelligence/);
  assert.match(html, /complex mobility/);
  assert.match(html, /Selected publications/);
  assert.match(html, /The University of Hong Kong/);
  assert.match(html, /shenzj@connect\.hku\.hk/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships the profile assets without starter dependencies", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Zijian Shen/);
  assert.match(page, /Zijian_Shen_Academic_CV\.pdf/);
  assert.match(layout, /Zijian Shen \| Intelligent Mobility Research/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/zijian-shen.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/Zijian_Shen_Academic_CV.pdf", import.meta.url)),
  ]);

  await assert.rejects(
    access(new URL("../app/_sites-preview", import.meta.url)),
  );
});
