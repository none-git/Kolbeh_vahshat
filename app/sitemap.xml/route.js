import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const pages = [
    { url: "", priority: 1.0 },
    { url: "stories", priority: 0.9 },
    { url: "stories?category=novel", priority: 0.9 },
    { url: "stories?category=short-story", priority: 0.9 }
  ]

  let query = db.from("stories").select("slug")
  const { data, error } = await query
  if (error) {
    console.error("DB error:", error)
    return new Response("Sitemap generation failed", { status: 500 })
  }
  data.forEach(item => {
    pages.push({ url: `stories/${item.slug}/overview`, priority: 0.8 })
    pages.push({ url: `stories/${item.slug}`, priority: 0.7 })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${process.env.NEXT_PUBLIC_BASE_URL}/${page.url.replace(/^\/+/, "")}</loc>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
    }
  })
}