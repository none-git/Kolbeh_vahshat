'use client'
import "./style.css"

import Header from "@/components/Header"

import Link from 'next/link'
import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

function numberToFarsi(number) {
    const farsiNumbers = ["اول","دوم","سوم","چهارم","پنجم","ششم","هفتم","هشتم","نهم","دهم"];
    return farsiNumbers[number-1] || "";
}

export const dynamic = "force-dynamic"
export default function Overview() {
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
    const [ isLiked, setIsLiked ] = useState()
    const background = useRef()
    const overviewSection = useRef()
    const summarySection = useRef()
    const episodeSection = useRef()
    const nav = useRef()
    const navSpan = useRef()
    const summaryButton = useRef()
    const music = useRef()
    const musicOn = useRef()
    const musicOff = useRef()
    const removeNavClass = (target) => {
        let button = document.querySelector('#overview nav .active')
        button.classList.remove('active')
        target.classList.add('active')
        let offsetRight = nav.current.offsetWidth - (target.offsetWidth + target.offsetLeft)
        navSpan.current.style.cssText = `right:${ offsetRight }px; width: ${ target.offsetWidth }px;`
    }
    const updateLiked = async (slug, status) => {
        try {
            const res = await fetch("/api/stories/add-to-favorites", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "slug": slug,
                    "status": status
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()
            data.success ? console.log(data.message, '| status:', res.status) : console.error(data.error, '| status:', res.status)
        } catch (err) {
            console.log(err)
        }
        
    }
    useEffect(() => {
        const favorites = localStorage.getItem('favorites')
        if (favorites && favorites.split(',').includes(slug)) {
            setIsLiked(true)
        }
    }, [slug])
    const storyData = data.stories.find(item => item.slug == slug)
    return (
    <>
    <div id="overview">
    <div ref={background} className="background" style={{
        background: `linear-gradient(178deg, #00000000 50%, #0000000f 63%, #00000050 75%, #000000 100%),
            linear-gradient(90deg, #00000000 , #000000a5),
            url('https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${slug}.jpg') no-repeat`,
        backgroundSize: 'cover',
        backgroundposition: 'center'
    }}></div>
    <Header/>
    <main>
        <div ref={overviewSection} className="overview-section">
            <h1>{storyData.name}</h1>
            <p>{storyData.summary}</p>
            <div>
                <Link href={`/stories/${storyData.slug}`} className="read">
                    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29 5.03125H21.85C20.3156 5.03125 18.8156 5.47188 17.525 6.30313L16 7.28125L14.475 6.30313C13.1857 5.47204 11.684 5.03043 10.15 5.03125H3C2.44687 5.03125 2 5.47813 2 6.03125V23.7813C2 24.3344 2.44687 24.7813 3 24.7813H10.15C11.6844 24.7813 13.1844 25.2219 14.475 26.0531L15.8625 26.9469C15.9031 26.9719 15.95 26.9875 15.9969 26.9875C16.0437 26.9875 16.0906 26.975 16.1313 26.9469L17.5187 26.0531C18.8125 25.2219 20.3156 24.7813 21.85 24.7813H29C29.5531 24.7813 30 24.3344 30 23.7813V6.03125C30 5.47813 29.5531 5.03125 29 5.03125ZM12.625 17.2969C12.625 17.425 12.525 17.5313 12.4031 17.5313H6.59688C6.475 17.5313 6.375 17.425 6.375 17.2969V15.8906C6.375 15.7625 6.475 15.6563 6.59688 15.6563H12.4C12.5219 15.6563 12.6219 15.7625 12.6219 15.8906V17.2969H12.625ZM12.625 12.9219C12.625 13.05 12.525 13.1563 12.4031 13.1563H6.59688C6.475 13.1563 6.375 13.05 6.375 12.9219V11.5156C6.375 11.3875 6.475 11.2813 6.59688 11.2813H12.4C12.5219 11.2813 12.6219 11.3875 12.6219 11.5156V12.9219H12.625ZM25.625 17.2969C25.625 17.425 25.525 17.5313 25.4031 17.5313H19.5969C19.475 17.5313 19.375 17.425 19.375 17.2969V15.8906C19.375 15.7625 19.475 15.6563 19.5969 15.6563H25.4C25.5219 15.6563 25.6219 15.7625 25.6219 15.8906V17.2969H25.625ZM25.625 12.9219C25.625 13.05 25.525 13.1563 25.4031 13.1563H19.5969C19.475 13.1563 19.375 13.05 19.375 12.9219V11.5156C19.375 11.3875 19.475 11.2813 19.5969 11.2813H25.4C25.5219 11.2813 25.6219 11.3875 25.6219 11.5156V12.9219H25.625Z" fill="black" stroke="black" strokeWidth="0.03125"/>
                    </svg>
                    خواندن
                </Link>
                <button className="summary-button" onClick={(event) => {summaryButton.current.click()}}>
                    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14 4.20002C12.7131 4.20002 11.4387 4.45351 10.2497 4.94601C9.06074 5.4385 7.98039 6.16036 7.07038 7.07038C6.16036 7.98039 5.4385 9.06074 4.946 10.2497C4.45351 11.4387 4.20002 12.7131 4.20002 14C4.20002 15.287 4.45351 16.5613 4.946 17.7503C5.4385 18.9393 6.16036 20.0197 7.07038 20.9297C7.98039 21.8397 9.06074 22.5615 10.2497 23.054C11.4387 23.5465 12.7131 23.8 14 23.8C16.5991 23.8 19.0918 22.7675 20.9297 20.9297C22.7675 19.0918 23.8 16.5991 23.8 14C23.8 11.4009 22.7675 8.90823 20.9297 7.07038C19.0918 5.23252 16.5991 4.20002 14 4.20002ZM1.40002 14C1.40002 10.6583 2.72752 7.45344 5.09048 5.09048C7.45344 2.72752 10.6583 1.40002 14 1.40002C17.3418 1.40002 20.5466 2.72752 22.9096 5.09048C25.2725 7.45344 26.6 10.6583 26.6 14C26.6 17.3418 25.2725 20.5466 22.9096 22.9096C20.5466 25.2725 17.3418 26.6 14 26.6C10.6583 26.6 7.45344 25.2725 5.09048 22.9096C2.72752 20.5466 1.40002 17.3418 1.40002 14ZM15.414 19.6C15.414 19.9713 15.2665 20.3274 15.004 20.59C14.7414 20.8525 14.3853 21 14.014 21H14C13.6287 21 13.2726 20.8525 13.0101 20.59C12.7475 20.3274 12.6 19.9713 12.6 19.6C12.6 19.2287 12.7475 18.8726 13.0101 18.6101C13.2726 18.3475 13.6287 18.2 14 18.2H14.014C14.3853 18.2 14.7414 18.3475 15.004 18.6101C15.2665 18.8726 15.414 19.2287 15.414 19.6ZM15.4 8.40002C15.4 8.02872 15.2525 7.67263 14.99 7.41008C14.7274 7.14752 14.3713 7.00002 14 7.00002C13.6287 7.00002 13.2726 7.14752 13.0101 7.41008C12.7475 7.67263 12.6 8.02872 12.6 8.40002V15.4C12.6 15.7713 12.7475 16.1274 13.0101 16.39C13.2726 16.6525 13.6287 16.8 14 16.8C14.3713 16.8 14.7274 16.6525 14.99 16.39C15.2525 16.1274 15.4 15.7713 15.4 15.4V8.40002Z" fill="white" stroke="white" strokeWidth="0.00028"/>
                    </svg>
                    ادامه خلاصه
                </button>
                <svg className={isLiked? 'active' : null} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={(event) => {
                    event.currentTarget.classList.toggle("active")
                    let favorites = localStorage.getItem('favorites')
                    if(favorites) {favorites = favorites.split(',')}else {favorites = []}
                    if (isLiked) {
                        favorites = favorites.filter(item => item !== slug)
                        localStorage.setItem('favorites',favorites.toString())
                        updateLiked(storyData.slug, false)
                    }else {
                        favorites.push(slug)
                        localStorage.setItem('favorites',favorites.toString())
                        updateLiked(storyData.slug, true)
                    }
                    setIsLiked(!isLiked)
                }}>
                <path d="M27.744 14.772C26.4387 21.5093 16 27.3333 16 27.3333C16 27.3333 5.56133 21.5093 4.256 14.772C2.96933 8.13333 6.75466 4.66667 10.6667 4.66667C11.712 4.60008 12.7563 4.8118 13.6932 5.28024C14.6301 5.74868 15.4261 6.4571 16 7.33333C16.5739 6.4571 17.3699 5.74868 18.3068 5.28024C19.2437 4.8118 20.288 4.60008 21.3333 4.66667C25.2453 4.66667 29.0307 8.13333 27.744 14.772Z"/>
                </svg>
            </div>
        </div>
        <div ref={summarySection} className="summary-section">
            <h2>خلاصه داستان</h2>
            <p>{storyData.summary}</p>
        </div>
        <div ref={episodeSection} className="episode-section">
            {storyData.category === true ? storyData.content.map((item, index) => (
            <Link key={index} href={`/stories/${slug}?location=s${index + 1}`}>فصل {numberToFarsi(index + 1)}</Link>
            )) : (null)}
        </div>    
    </main>
    <nav ref={nav}>
        <button className="overview-button active" onClick={(event) => {
            removeNavClass(event.target)
            background.current.style.filter = "blur(0)"
            summarySection.current.style.opacity = "0"
            episodeSection.current.style.opacity = "0"
            setTimeout( (x) => {
                overviewSection.current.style.display = "block"
                summarySection.current.style.display = "none"
                episodeSection.current.style.display = "none"
            }, 300)
            setTimeout( (x) => {
                overviewSection.current.style.opacity = "1"
            }, 400)
        }}>نمای کلی</button>
        <button className="summary-button" ref={summaryButton} onClick={(event) => {
            removeNavClass(event.target)
            background.current.style.filter = "blur(7px)"
            overviewSection.current.style.opacity = "0"
            episodeSection.current.style.opacity = "0"
            setTimeout( (x) => {
                overviewSection.current.style.display = "none"
                summarySection.current.style.display = "block"
                episodeSection.current.style.display = "none"
            }, 300)
            setTimeout( (x) => {
                summarySection.current.style.opacity = "1"
            }, 400)
        }}>خلاصه داستان</button>
        <button className="episode-button" style={{display: storyData.category === true ? 'block' : 'none'}} onClick={(event) => {
            removeNavClass(event.target)
            background.current.style.filter = "blur(7px)"
            overviewSection.current.style.opacity = "0"
            summarySection.current.style.opacity = "0"
            setTimeout( (x) => {
                overviewSection.current.style.display = "none"
                summarySection.current.style.display = "none"
                episodeSection.current.style.display = "flex"
            }, 300)
            setTimeout( (x) => {
                episodeSection.current.style.opacity = "1"
            }, 400)
        }}>قسمت ها</button>
        <span ref={navSpan}></span>
    </nav>
    <div className="music" onClick={(event) => {
        console.log(event.target)
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
        <svg ref={musicOn} className="speaker-on" width="54" height="54" viewBox="0 0 78 79" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="75" height="76" rx="37.5" stroke="white" strokeOpacity="0.752941" strokeWidth="3"/>
        <path d="M41 23.4892C41 22.5463 40.7456 21.0004 39.3314 20.2885C37.8302 19.5327 36.4326 20.3871 35.7246 21.0232L24.8932 30.8743H21C18.7909 30.8743 17 32.6652 17 34.8743L17 45.2496C17 47.4586 18.7909 49.2496 21 49.2496H24.9L35.7246 58.9782C36.435 59.6162 37.832 60.4662 39.3312 59.7108C40.7434 58.9996 41 57.4572 41 56.5122V23.4892Z" fill="white" fillOpacity="0.752941"/>
        <path d="M49.672 23.5921L49.1904 23.4577C48.1266 23.1608 47.0234 23.7826 46.7264 24.8466L46.4578 25.8098C46.1608 26.8737 46.7826 27.9768 47.8466 28.2737L48.3282 28.4081C52.9102 29.6867 56.5002 34.2923 56.5002 40.0002C56.5002 45.708 52.9102 50.3136 48.3282 51.5922L47.8466 51.7264C46.7826 52.0234 46.1608 53.1266 46.4578 54.1904L46.7264 55.1536C47.0234 56.2176 48.1266 56.8394 49.1904 56.5426L49.672 56.4082C56.5914 54.4774 61.5002 47.7636 61.5002 40.0002C61.5002 32.2366 56.5914 25.5229 49.672 23.5921Z" fill="white" fillOpacity="0.752941"/>
        <path d="M47.7162 31.6048L47.237 31.4615C46.1788 31.1451 45.0644 31.7465 44.748 32.8048L44.4616 33.7629C44.1452 34.8212 44.7466 35.9356 45.8048 36.252L46.284 36.3952C47.3504 36.7142 48.5 38.024 48.5 40C48.5 41.9762 47.3504 43.286 46.284 43.6048L45.8048 43.748C44.7466 44.0644 44.1452 45.1788 44.4616 46.237L44.748 47.1952C45.0644 48.2534 46.1788 48.8548 47.237 48.5384L47.7162 48.3952C51.2502 47.3386 53.5 43.7974 53.5 40C53.5 36.2028 51.2502 32.6613 47.7162 31.6048Z" fill="white" fillOpacity="0.752941"/>
        </svg>
        <svg ref={musicOff} className="speaker-off" width="54" height="54" viewBox="0 0 78 79" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="75" height="76" rx="37.5" stroke="white" strokeOpacity="0.752941" strokeWidth="3"/>
        <path d="M39.3314 20.2885C40.7456 21.0004 41 22.5463 41 23.4892V56.5122C41 57.4572 40.7434 58.9996 39.3312 59.7108C37.832 60.4662 36.435 59.6162 35.7246 58.9782L24.9 49.2496H21C18.7909 49.2496 17 47.4586 17 45.2496L17 34.8743C17 32.6652 18.7909 30.8743 21 30.8743H24.8932L35.7246 21.0232C36.4326 20.3871 37.8302 19.5327 39.3314 20.2885Z" fill="white" fillOpacity="0.7529"/>
        <path d="M58.6464 47.3534C57.8654 48.1346 56.599 48.1346 55.818 47.3536L52 43.5356L48.182 47.3536C47.401 48.1346 46.1346 48.1346 45.3536 47.3534L44.6466 46.6464C43.8654 45.8654 43.8654 44.599 44.6466 43.818L48.4644 40L44.6464 36.182C43.8654 35.4009 43.8654 34.1345 44.6464 33.3535L45.3534 32.6464C46.1346 31.8653 47.4008 31.8653 48.182 32.6464L52 36.4644L55.818 32.6464C56.5992 31.8653 57.8654 31.8653 58.6466 32.6464L59.3536 33.3535C60.1346 34.1345 60.1346 35.4009 59.3536 36.182L55.5356 40L59.3534 43.818C60.1346 44.599 60.1346 45.8654 59.3534 46.6464L58.6464 47.3534Z" fill="white" fillOpacity="0.7529"/>
        </svg>
        <span></span>
    </div>
    </div>
    </>
    )
}
