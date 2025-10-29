'use client'
import "./style.css"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Loading from "@/app/loading"

import Link from 'next/link'
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState, useMemo } from "react"

export default function Storys() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const res = await fetch("/api/stories")
            if (!res.ok) throw new Error(`Failed: ${res.status}`)
            return res.json()
        }
    })
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const [ listTitle, setListTitle ] = useState('داستان های ترسناک')
    useEffect(() => {
        if (category == 'novel') {
            setListTitle('رمان های ترسناک')
        }else if (category == 'short-story') {
            setListTitle('داستان های کوتاه ترسناک')
        }
    }, [category])
    const filteredStories = useMemo(() => {
        if (!data?.stories) return []
        if (category === "novel") {
          return data.stories.filter(item => item.category === true)
        }
        if (category === "short-story") {
          return data.stories.filter(item => item.category === false)
        }
        return data.stories
    }, [data, category])
    if (isLoading) return <Loading/>
    if (error) return <p>Error: {error.message}</p>
    return (
    <div id="stories">
    <Header/>
    <main>
        <h1>{listTitle}</h1>
        <section>
            {filteredStories.map((item, index) => (
            <Link key={index} href={`stories/${item.slug}/overview`}>
                <picture>
                    <img src={`https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg`} alt={item.name}/>
                </picture>
                <div className="details">
                    <h2>{item.name}</h2>
                </div>
            </Link>))}
        </section>
    </main>
    <Footer/>
    </div>
    )
}
