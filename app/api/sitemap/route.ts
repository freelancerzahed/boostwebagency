import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const baseUrl = "https://boostwebagency.com"

  const mainPages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.9", changefreq: "monthly" },
    { path: "/services", priority: "0.9", changefreq: "monthly" },
    { path: "/team", priority: "0.8", changefreq: "monthly" },
    { path: "/faq", priority: "0.8", changefreq: "monthly" },
    { path: "/chat", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.9", changefreq: "monthly" },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
