'use client'
import "./style.css"

import Header from "@/components/Header"
import Loading from "@/app/loading"

import Link from 'next/link'
import { useQuery } from "@tanstack/react-query"

export default function Favorites() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const res = await fetch("/api/stories")
            if (!res.ok) throw new Error(`Failed: ${res.status}`)
            return res.json()
        }
    })
    if (isLoading) return <Loading/>
    if (error) return <p>Error: {error.message}</p>
    const favoritesSlugs = localStorage.getItem('favorites')
    const favorites = data.stories.filter((item) => favoritesSlugs.split(',').includes(item.slug))
    return (
    <div id="favorites">
    <Header/>
    <main>
        <h1>علاقه مندی ها</h1>
        {favorites.length > 0 ? (
        <section>
            {favorites.map((item, index) => (
            <Link key={index} href={`stories/${item.slug}/overview`}>
                <div className="image" style={{backgroundImage: `url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg)`}}></div>
                <div className="details">
                    <h3>{item.name}</h3>
                </div>
            </Link>))}
        </section>
        ) : (
        <h2 className="empty">لیست علاقه مندی های شما خالی است</h2>
        )}
    </main>
    </div>
    )
}
