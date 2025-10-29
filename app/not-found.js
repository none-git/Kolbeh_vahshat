import "../styles/NotFound.css"

import Header from "@/components/Header"

import Link from 'next/link'

export default function NotFound() {
    return (
    <div id="no-page">
        <Header />
        <main>
            <div></div>
            <h1><span>4</span><span>0</span>4</h1>
            <h2>صفحه موردنظر یافت نشد</h2>
            <p>صفحه ای که شما به دنبال آن هستید ممکن است حذف شده یا در کل وجود نداشته باشد.</p>
            <Link href="/"><span>بازگشت به صفحه اصلی</span></Link>
        </main>
    </div>
    )
}