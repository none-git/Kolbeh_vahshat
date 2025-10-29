import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// 📌 استعلام داستان
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    const cookieStore = cookies()
      cookieStore.set({
      name: "auth_token",
      value: token,
      path: "/",           // مسیر کوکی
      httpOnly: true,      // فقط سرور می‌تواند بخواند
      secure: true,        // فقط روی HTTPS
      maxAge: 60 * 60 * 24 * 30 // زمان انقضا بر حسب ثانیه (اینجا 30 روز)
    })

    return NextResponse.json({ message: "successful" }, { status: 200 })
  } catch (err) {
      return NextResponse.json({ error: err.message || "Failed to set token" }, { status: 500 })
  }
}