import "./style.css"

import Footer from "@/components/Footer"
import TitleSlider from "@/components/TitleSlider"

import Link from 'next/link'
import { db } from "@/lib/db"

export const revalidate = 600
export default async function Home() {
    const { data, error } = await db.from("stories").select("*")
    if (error) throw new Error(error.message)
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    return (
    <div id="home-page">
        <TitleSlider/>
        <div className="categorys-container">
            <div className="new-storys">
                <div className="part-header">
                    <h2>جدید ترین ها</h2>
                </div>
                <section className="part-main">
                    <div>
                        {data.map((item, index) => index < 4 && (
                        <Link key={index} href={`stories/${item.slug}/overview`}>
                            <div className="image" style={{
                                backgroundImage: `url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className="details">
                                <h3>{item.name}</h3>
                            </div>
                        </Link>))}
                    </div>
                </section>
            </div>
            <div className="short-storys">
                <div className="part-header">
                    <h2>داستان های کوتاه</h2>
                    <Link href={"/stories?category=short-story"}>بیشتر</Link>
                </div>
                <section className="part-main">
                    <div>
                        {data.filter(item => item.category === false).sort((a, b) => b.liked - a.liked).map((item, index) => index < 5 && (
                        <Link key={index} href={`stories/${item.slug}/overview`}>
                            <div className="image" style={{
                                backgroundImage: `url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className="details">
                                <h3>{item.name}</h3>
                            </div>
                        </Link>))}
                    </div>
                </section>
            </div>
            <div className="long-storys">
                <div className="part-header">
                    <h2>رمان ها</h2>
                    <Link href={"/stories?category=novel"}>بیشتر</Link>
                </div>
                <section className="part-main">
                    <div>
                        {data.filter(item => item.category === true).sort((a, b) => b.liked - a.liked).map((item, index) => index < 3 && (
                        <Link key={index} href={`stories/${item.slug}/overview`}>
                            <div className="image" style={{
                                backgroundImage: `url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className="details">
                                <h3>{item.name}</h3>
                            </div>
                        </Link>))}
                    </div>
                </section>
            </div>
        </div>
        <Footer/>
    </div>
    )
}
