'use client'
import "./style.css"

import Header from "@/components/Header"

import { useEffect, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

function numberToFarsi(number) {
    const farsiNumbers = ["اول","دوم","سوم","چهارم","پنجم","ششم","هفتم","هشتم","نهم","دهم"];
    return farsiNumbers[number-1] || "";
}

export const dynamic = "force-dynamic"
export default function Story() {
    const { data } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stories`)
            if (!res.ok) throw new Error(`Failed: ${res.status}`)
            return res.json()
        },
        suspense: true
    })
    const { slug } = useParams()
    const searchParams = useSearchParams()
    const location = searchParams.get('location')
    const rootElement = useRef()
    const background = useRef()
    const music = useRef()
    const musicOn = useRef()
    const musicOff = useRef()
    const changeTheme = (event) => {
        rootElement.current.classList = []
        rootElement.current.classList.add(`${event.currentTarget.classList[0]}`)
    }
    useEffect(() => {
        if (location !== null && location !== 's1') {
            const element = document.querySelector(`.${location}`)
            window.scrollTo(0, element.getBoundingClientRect().top + document.documentElement.scrollTop - 20)
        }
    }, [location])
    const storyData = data.stories.find(item => item.slug == slug)
    return (
    <>
    <div id="story" ref={rootElement}>
    <div ref={background} className="background" style={{
        background: `linear-gradient(178deg, #00000000 50%, #0000000f 63%, #00000050 75%, #000000 100%),
        linear-gradient(90deg, #0000005b , #000000a5),
        url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${slug}.jpg) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}></div>
    <Header/>
    <main>
        <h1>{storyData.name}</h1>
        {storyData.category === true ? storyData.content.map((item, index) => (
            <section key={index}>
                <h2 className={`s${index + 1}`}>فصل {numberToFarsi(index + 1)}</h2>
                <p>{item}</p>
            </section>
        )) : (
            <p>{storyData.content}</p>
        )}
    </main>
    <div className="music" onClick={(event) => {
        if (musicOn.current.style.display == 'block'){
            music.current.pause()
            musicOn.current.style.display = 'none'
            musicOff.current.style.display = 'block'
        }else {
            music.current.play()
            musicOn.current.style.display = 'block'
            musicOff.current.style.display = 'none'
        }
    }}>
        <audio ref={music}>
            <source src={'/musics/scaryMusic1.mp3'} type="audio/mpeg"/>
        </audio>
        <svg ref={musicOn} className="speaker-on" viewBox="0 0 78 79" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="75" height="76" rx="37.5" stroke="white" strokeOpacity="0.752941" strokeWidth="3"/>
        <path d="M41 23.4892C41 22.5463 40.7456 21.0004 39.3314 20.2885C37.8302 19.5327 36.4326 20.3871 35.7246 21.0232L24.8932 30.8743H21C18.7909 30.8743 17 32.6652 17 34.8743L17 45.2496C17 47.4586 18.7909 49.2496 21 49.2496H24.9L35.7246 58.9782C36.435 59.6162 37.832 60.4662 39.3312 59.7108C40.7434 58.9996 41 57.4572 41 56.5122V23.4892Z" fill="white" fillOpacity="0.752941"/>
        <path d="M49.672 23.5921L49.1904 23.4577C48.1266 23.1608 47.0234 23.7826 46.7264 24.8466L46.4578 25.8098C46.1608 26.8737 46.7826 27.9768 47.8466 28.2737L48.3282 28.4081C52.9102 29.6867 56.5002 34.2923 56.5002 40.0002C56.5002 45.708 52.9102 50.3136 48.3282 51.5922L47.8466 51.7264C46.7826 52.0234 46.1608 53.1266 46.4578 54.1904L46.7264 55.1536C47.0234 56.2176 48.1266 56.8394 49.1904 56.5426L49.672 56.4082C56.5914 54.4774 61.5002 47.7636 61.5002 40.0002C61.5002 32.2366 56.5914 25.5229 49.672 23.5921Z" fill="white" fillOpacity="0.752941"/>
        <path d="M47.7162 31.6048L47.237 31.4615C46.1788 31.1451 45.0644 31.7465 44.748 32.8048L44.4616 33.7629C44.1452 34.8212 44.7466 35.9356 45.8048 36.252L46.284 36.3952C47.3504 36.7142 48.5 38.024 48.5 40C48.5 41.9762 47.3504 43.286 46.284 43.6048L45.8048 43.748C44.7466 44.0644 44.1452 45.1788 44.4616 46.237L44.748 47.1952C45.0644 48.2534 46.1788 48.8548 47.237 48.5384L47.7162 48.3952C51.2502 47.3386 53.5 43.7974 53.5 40C53.5 36.2028 51.2502 32.6613 47.7162 31.6048Z" fill="white" fillOpacity="0.752941"/>
        </svg>
        <svg ref={musicOff} className="speaker-off" viewBox="0 0 78 79" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="75" height="76" rx="37.5" stroke="white" strokeOpacity="0.752941" strokeWidth="3"/>
        <path d="M39.3314 20.2885C40.7456 21.0004 41 22.5463 41 23.4892V56.5122C41 57.4572 40.7434 58.9996 39.3312 59.7108C37.832 60.4662 36.435 59.6162 35.7246 58.9782L24.9 49.2496H21C18.7909 49.2496 17 47.4586 17 45.2496L17 34.8743C17 32.6652 18.7909 30.8743 21 30.8743H24.8932L35.7246 21.0232C36.4326 20.3871 37.8302 19.5327 39.3314 20.2885Z" fill="white" fillOpacity="0.7529"/>
        <path d="M58.6464 47.3534C57.8654 48.1346 56.599 48.1346 55.818 47.3536L52 43.5356L48.182 47.3536C47.401 48.1346 46.1346 48.1346 45.3536 47.3534L44.6466 46.6464C43.8654 45.8654 43.8654 44.599 44.6466 43.818L48.4644 40L44.6464 36.182C43.8654 35.4009 43.8654 34.1345 44.6464 33.3535L45.3534 32.6464C46.1346 31.8653 47.4008 31.8653 48.182 32.6464L52 36.4644L55.818 32.6464C56.5992 31.8653 57.8654 31.8653 58.6466 32.6464L59.3536 33.3535C60.1346 34.1345 60.1346 35.4009 59.3536 36.182L55.5356 40L59.3534 43.818C60.1346 44.599 60.1346 45.8654 59.3534 46.6464L58.6464 47.3534Z" fill="white" fillOpacity="0.7529"/>
        </svg>
        <span></span>
    </div>
    <div className="theme">
        <div className="dark-theme" onClick={(e) => changeTheme(e)}>
            <span></span>
            <span></span>
        </div>
        <div className="light-theme" onClick={(e) => changeTheme(e)}>
            <span></span>
            <span></span>
        </div>
        <div className="contrast-theme" onClick={(e) => changeTheme(e)}> 
            <span></span>
            <span></span>
        </div>
    </div>
    </div>
    </>
    )
}
