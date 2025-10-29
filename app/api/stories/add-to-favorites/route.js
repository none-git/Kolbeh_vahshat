import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req) {
  try {
    const body = await req.json()
    const { slug, status } = body

    if (!slug || status === undefined)
      return NextResponse.json({ success: false, error: "slug and status required" }, { status: 400 })

    // گرفتن مقدار فعلی liked
    const { data: story, error: fetchError } = await db
      .from("stories")
      .select("liked")
      .eq("slug", slug)
      .single()

    if (fetchError || !story) 
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 })

    // محاسبه مقدار جدید
    const newLiked = status ? story.liked + 1 : story.liked - 1

    // آپدیت دیتابیس
    const { error: updateError } = await db
      .from("stories")
      .update({ liked: newLiked })
      .eq("slug", slug)

    if (updateError) throw updateError

    return NextResponse.json({ message: "story edited", slug: slug }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to edit story" }, { status: 500 })
  }
}
