'use client'
import "./style.css"

import Header from "@/components/Header"
import Loading from "@/app/loading"

import Link from 'next/link'
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

export default function Search() {
    const [ storiesData, setStoriesData ] = useState()
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
    return (
    <div id="search">
    <Header/>
    <main>
        <form onSubmit={(event) => {
            event.preventDefault()
            const formData = new FormData(event.target)
            setStoriesData(data.stories.filter((item) => item.slug.includes(formData.get('search')) || item.name.includes(formData.get('search'))))
        }}>
            <input type="text" name="search" placeholder="جستوجو"/>
            <button type="submit">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0607 21.0815L28 28M24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </form>
        {storiesData?.length > 0 ? (
        <section>
            {storiesData.map((item, index) => (
            <Link key={index} href={`stories/${item.slug}/overview`}>
                <div className="image" style={{backgroundImage: `url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg)`}}></div>
                <div className="details">
                    <h3>{item.name}</h3>
                </div>
            </Link>))}
        </section>
        ) : (null)}
    </main>
    </div>
    )
}
