/**
 * Render docs pages to PDF with headless Chromium.
 *
 * Follows https://www.fumadocs.dev/docs/guides/export-pdf, but uses Playwright
 * (already a devDependency) instead of Puppeteer. The print stylesheet lives in
 * `app/app.css`; Chromium applies it automatically because page.pdf() renders
 * with `media: print`.
 *
 * Usage:
 *   node scripts/export-pdf.mjs /zh/docs/quickstart [...more paths]
 *   BASE_URL=http://localhost:5173 OUT_DIR=pdfs node scripts/export-pdf.mjs /zh/docs/quickstart
 *
 * With no paths given, it reads the prerender manifest of a production build
 * (build/client) and exports every docs page.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

import { chromium } from 'playwright'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173'
const OUT_DIR = process.env.OUT_DIR ?? 'pdfs'

/** Discover docs pages from a production build: build/client/**\/docs/**\/index.html */
async function discoverFromBuild() {
  const root = 'build/client'
  const found = []
  async function walk(dir) {
    let entries
    try {
      entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) await walk(full)
      else if (entry.name === 'index.html') {
        const url = `/${path.relative(root, dir)}`
        if (url.includes('/docs')) found.push(url)
      }
    }
  }
  await walk(root)
  return found.sort()
}

function outputPath(pathname) {
  const name = pathname.replace(/^\/+|\/+$/g, '').replaceAll('/', '-') || 'index'
  return path.join(OUT_DIR, `${name}.pdf`)
}

async function exportPdf(browser, pathname) {
  const page = await browser.newPage()
  const started = Date.now()
  try {
    await page.goto(BASE_URL + pathname, { waitUntil: 'networkidle' })
    // Images are lazy-loaded; scroll to the bottom so every one is decoded
    // before the snapshot, otherwise they come out blank.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 100))
      }
      window.scrollTo(0, 0)
      await Promise.all(
        [...document.images].filter((img) => !img.complete).map((img) => img.decode().catch(() => {}))
      )
    })
    // A Vite HMR error overlay renders on top of the page and would otherwise be
    // baked into the PDF without any warning.
    if (await page.locator('vite-error-overlay').count()) {
      throw new Error(`${pathname}: dev server is showing an error overlay; fix the build error first`)
    }

    const file = outputPath(pathname)
    await page.pdf({ path: file, format: 'A4', printBackground: true, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } })
    const { size } = await fs.stat(file)
    console.log(`${file}  ${(size / 1024).toFixed(0)} KB  ${Date.now() - started} ms`)
    return size
  } finally {
    await page.close()
  }
}

const paths = process.argv.slice(2)
const targets = paths.length > 0 ? paths : await discoverFromBuild()
if (targets.length === 0) {
  console.error('No paths given and no build/client found. Run `pnpm build` or pass paths explicitly.')
  process.exit(1)
}

await fs.mkdir(OUT_DIR, { recursive: true })
const browser = await chromium.launch()
const startedAll = Date.now()
let total = 0
try {
  // Sequential: concurrent Chromium tabs distort the per-page timings we care about.
  for (const pathname of targets) total += await exportPdf(browser, pathname)
} finally {
  await browser.close()
}
console.log(
  `\n${targets.length} page(s), ${(total / 1024 / 1024).toFixed(1)} MB total, ${((Date.now() - startedAll) / 1000).toFixed(1)}s`
)
