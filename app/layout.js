import "./globals.css"
import "../styles/Header.css"
import "../styles/Footer.css"

import { Suspense } from "react"
import ReactQueryProvider from "@/components/ReactQueryProvider"
import Loading from "@/app/loading"

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: "وحشت خانه | داستان‌های ترسناک", // عنوان کامل و شامل کلیدواژه‌ها
  description: "وحشت خانه مجموعه‌ای از داستان‌ها و رمان‌های ترسناک است؛ پناهگاهی برای دوستداران هیجان، رمز و راز و روایت‌هایی که ترس و وحشت را به شکلی متفاوت تجربه می‌کنند.", // توضیح کامل‌تر
  keywords: "داستان‌های ترسناک, رمان ترسناک, داستان کوتاه ترسناک, وحشت, رمز و راز, داستان ترسناک واقعی, داستان جن, داستان ایرانی ترسناک, قصه شب ترسناک, موجودات ناشناخته, خانه ترسناک, رمان وحشت ایرانی, horror stories real, scary stories iran", // کلیدواژه‌ها برای SEO
  authors: [{ name: "Mohammad Momtazan" }], // نویسنده یا مالک سایت
  verification: {
    google: "hzyUnHVuiBfs0g4E7kBpGCM4Ts5wuymDZEM_QkQVxI4"
  },
  icons: {
    icon: '/favicon.ico', // مسیر داخل public
    apple: '/apple-touch-icon.png', // اختیاری، برای iOS
  },
  openGraph: {
    title: "وحشت خانه | داستان‌های ترسناک",
    description: "وحشت خانه مجموعه‌ای از داستان‌ها و رمان‌های ترسناک است؛ پناهگاهی برای دوستداران هیجان، رمز و راز و روایت‌هایی که ترس و وحشت را به شکلی متفاوت تجربه می‌کنند.",
    url: "https://vahshatkhane.liara.run/", // آدرس سایت واقعی
    siteName: "وحشت خانه",
    images: [
      {
        url: "/images/og-image.jpg", // عکس پیش‌فرض برای Open Graph
        width: 1200,
        height: 630,
        alt: "وحشت خانه - داستان ترسناک"
      }
    ],
    locale: "fa_IR",
    type: "website"
  },
  twitter: {
    title: "وحشت خانه | داستان‌های ترسناک",
    description: "وحشت خانه مجموعه‌ای از داستان‌ها و رمان‌های ترسناک است؛ پناهگاهی برای دوستداران هیجان، رمز و راز و روایت‌هایی که ترس و وحشت را به شکلی متفاوت تجربه می‌کنند.",
    images: [
      {
        url: "/images/og-image.jpg", // عکس پیش‌فرض برای Open Graph
        width: 1200,
        height: 630,
        alt: "وحشت خانه - داستان ترسناک"
      }
    ],
    card: "summary_large_image"
  },
  robots: "index, follow"
}

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
}

export default function RootLayout({ children }) {
  return (
  <html lang="fa" dir="rtl">
    <body>
        <Suspense fallback={<Loading/>}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        </Suspense>
    </body>
  </html>
  )
}