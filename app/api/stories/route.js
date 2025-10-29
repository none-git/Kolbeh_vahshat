import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cookies } from "next/headers"

// 📌 استعلام داستان
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    let query = db.from("stories").select("*")

    if (slug) query = query.eq("slug", slug).single()

    const { data, error } = await query
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    if (error) throw error

    return NextResponse.json({ stories: data }, { status: 200 })
  } catch (err) {
      return NextResponse.json({ error: err.message || "Failed to fetch stories" }, { status: 500 })
  }
}

// 📌 اضافه کردن داستان جدید
export async function POST(req) {
  try {
    const token = (await cookies()).get("auth_token")?.value
    if (token !== process.env.AUTH_TOKEN)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { name, slug, category, summary, content } = body

    if (!name || !slug || category === undefined || !summary || !content)
      return NextResponse.json({ error: "{ name, slug, category, summary, content } required" }, { status: 400 })

    const { error } = await db.from("stories").insert([
      { name, slug, category, liked: 0, summary, content }
    ])

    if (error) throw error

    return NextResponse.json({ message: "story created", slug }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to create story" }, { status: 500 })
  }
}

// 📌 ویرایش یک داستان
export async function PATCH(req) {
  try {
    const token = (await cookies()).get("auth_token")?.value
    if (token !== process.env.AUTH_TOKEN)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    if (!body.slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

    const updates = {
      name: body.name,
      slug: body.newSlug ?? body.slug,
      category: body.category,
      liked: body.liked,
      summary: body.summary,
      content: body.content,
    }

    const { error } = await db
      .from("stories")
      .update(updates)
      .eq("slug", body.slug)

    if (error) throw error

    return NextResponse.json({ message: "story edited", slug: updates.slug }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to edit story" }, { status: 500 })
  }
}

// 📌 حذف یک داستان
export async function DELETE(req) {
  try {
    const token = (await cookies()).get("auth_token")?.value
    if (token !== process.env.AUTH_TOKEN)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { slug } = await req.json()
    if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

    const { error } = await db.from("stories").delete().eq("slug", slug)

    if (error) throw error

    return NextResponse.json({ message: "story deleted", slug }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to delete story" }, { status: 500 })
  }
}



// import { NextResponse } from "next/server"
// import fs from "fs/promises"
// import path from "path"
// import { cookies } from "next/headers"

// const FILE_PATH = path.join(process.cwd(), "data", "data.json")

// // 📌 اضافه کردن داستان جدید
// export async function POST(req) {
//     try {
//         const token = (await cookies()).get("auth_token")?.value

//         if (token !== process.env.AUTH_TOKEN)
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

//         const body = await req.json()
//         const { name, slug, category, summary, content } = body
//         if (!name || !slug || !category || !summary || !content)
//             return NextResponse.json({ error: "{ name, slug, category, summary, content } required" }, { status: 400 })

//         // خوندن فایل
//         const file = await fs.readFile(FILE_PATH, "utf8")
//         const data = JSON.parse(file)

//         // اضافه کردن داستان
//         const newStory = { "name":name, "slug":slug, "category":category, "liked": 0, "summary":summary, "content":content }
//         data.stories.push(newStory)

//         // ذخیره نسخه بکاپ
//         await fs.writeFile(FILE_PATH + ".bak", file, "utf8")

//         // نوشتن تغییرات
//         await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8")

//         return NextResponse.json({ message: "story created", slug }, { status: 200 })
//     } catch (err) {
//         return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
//     }
// }

// // 📌 ویرایش یک داستان (PATCH)
// export async function PATCH(req) {
//     try {
//         const token = (await cookies()).get("auth_token")?.value

//         if (token !== process.env.AUTH_TOKEN)
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

//         const body = await req.json()
//         if (!body.slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

//         const file = await fs.readFile(FILE_PATH, "utf8")
//         const data = JSON.parse(file)

//         const story = data.stories.find((s) => s.slug === body.slug)
//         if (!story) return NextResponse.json({ error: "story not found" }, { status: 404 })

//         story.name = body.name ?? story.name
//         story.slug = body.newSlug ?? story.slug
//         story.category = body.category ?? story.category
//         story.liked = body.liked ?? story.liked
//         story.summary = body.summary ?? story.summary
//         story.content = body.content ?? story.content

//         // ذخیره نسخه بکاپ
//         await fs.writeFile(FILE_PATH + ".bak", file, "utf8")

//         await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8")

//         return NextResponse.json({ message: "story edited", slug: story.slug }, { status: 200 })
//     } catch (err) {
//         return NextResponse.json({ error: "Failed to edit story" }, { status: 500 })
//     }
// }

// // 📌 حذف یک داستان
// export async function DELETE(req) {
//     try {
//         const token = (await cookies()).get("auth_token")?.value
//         if (token !== process.env.AUTH_TOKEN)
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    
//         const { slug } = await req.json()
//         if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })
    
//         const file = await fs.readFile(FILE_PATH, "utf8")
//         const data = JSON.parse(file)
    
//         const index = data.stories.findIndex((item) => item.slug === slug)
//         if (index === -1)
//             return NextResponse.json({ error: "story not found" }, { status: 404 })
    
//         // حذف داستان
//         data.stories.splice(index, 1)
    
//         // ذخیره بکاپ و نوشتن تغییرات
//         await fs.writeFile(FILE_PATH + ".bak", file, "utf8")
//         await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8")
    
//         return NextResponse.json({ message: "story deleted", slug }, { status: 200 })
//     } catch (err) {
//         return NextResponse.json({ error: "Failed to delete story" }, { status: 500 })
//     }
// }