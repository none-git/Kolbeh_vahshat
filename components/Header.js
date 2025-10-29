"use client"

import Link from 'next/link'
import NavLink from '@/hooks/NavLink'
import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()
    const isHome = pathname === "/"
    return (
    <header>
        <div>
            <div className="nav-more">
                <Link href="/">صفحه اصلی</Link>
                <Link href="/stories?category=short-story">داستان های کوتاه</Link>
                <Link href="/stories?category=novel">رمان ها</Link>
            </div>
            <button className="nav-icon" onClick={(event) => {
                event.currentTarget.classList.toggle('active')
            }}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {isHome? <h1>وحشت خانه</h1> : <h2>وحشت خانه</h2>}
            <NavLink href="/" exact>صفحه اصلی</NavLink>
            <NavLink href="/stories?category=short-story">داستان های کوتاه</NavLink>
            <NavLink href="/stories?category=novel">رمان ها</NavLink>
        </div>
        <div>
            <NavLink href="/search">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0607 21.0815L28 28M24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14Z" fill='none' strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </NavLink>
            <NavLink href="/favorites">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.744 14.772C26.4387 21.5093 16 27.3333 16 27.3333C16 27.3333 5.56133 21.5093 4.256 14.772C2.96933 8.13333 6.75466 4.66667 10.6667 4.66667C11.712 4.60008 12.7563 4.8118 13.6932 5.28024C14.6301 5.74868 15.4261 6.4571 16 7.33333C16.5739 6.4571 17.3699 5.74868 18.3068 5.28024C19.2437 4.8118 20.288 4.60008 21.3333 4.66667C25.2453 4.66667 29.0307 8.13333 27.744 14.772Z"/>
                </svg>
            </NavLink>
        </div>
    </header>
    )
}