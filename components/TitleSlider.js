'use client'

import Header from "@/components/Header"
import Loading from "@/app/loading"

import Link from 'next/link'
import { useEffect, useState, useRef } from "react"
import { useQuery } from "@tanstack/react-query"

export default function TilteSlider() {
    const [ titleStory, setTitleStory ] = useState()
    const sliderSpanWidthFist = useRef()
    const slider = useRef()
    const sliderSpan = useRef()
    const { data, error, isLoading } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const res = await fetch("/api/stories")
            if (!res.ok) throw new Error(`Failed: ${res.status}`)
            return res.json()
        }
    })
    useEffect(() => {
        if (sliderSpan.current) {
          sliderSpanWidthFist.current = sliderSpan.current.offsetWidth
        }
    }, [sliderSpan, isLoading])
    if (isLoading) return <Loading/>
    if (error) return <p>Error: {error.message}</p>
    const firstTitleStory = [...data.stories].sort((a, b) => b.liked - a.liked)[0]
    return (
        <div className="overview-container" style={{
            backgroundImage: `linear-gradient(180deg, #09090900 50%, #0909090f 63%, #09090950 75%, #090909 100%),
            linear-gradient(90deg, #00000000 , #000000a5),url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${titleStory?.slug || firstTitleStory.slug}.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <Header/>
            <div className="overview-details">
                <h3>{titleStory?.name || firstTitleStory.name}</h3>
                <p>{titleStory?.summary || firstTitleStory.summary}</p>
                <div>
                    <Link href={`/stories/${titleStory?.slug || firstTitleStory.slug}`} className="read">
                        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29 5.03125H21.85C20.3156 5.03125 18.8156 5.47188 17.525 6.30313L16 7.28125L14.475 6.30313C13.1857 5.47204 11.684 5.03043 10.15 5.03125H3C2.44687 5.03125 2 5.47813 2 6.03125V23.7813C2 24.3344 2.44687 24.7813 3 24.7813H10.15C11.6844 24.7813 13.1844 25.2219 14.475 26.0531L15.8625 26.9469C15.9031 26.9719 15.95 26.9875 15.9969 26.9875C16.0437 26.9875 16.0906 26.975 16.1313 26.9469L17.5187 26.0531C18.8125 25.2219 20.3156 24.7813 21.85 24.7813H29C29.5531 24.7813 30 24.3344 30 23.7813V6.03125C30 5.47813 29.5531 5.03125 29 5.03125ZM12.625 17.2969C12.625 17.425 12.525 17.5313 12.4031 17.5313H6.59688C6.475 17.5313 6.375 17.425 6.375 17.2969V15.8906C6.375 15.7625 6.475 15.6563 6.59688 15.6563H12.4C12.5219 15.6563 12.6219 15.7625 12.6219 15.8906V17.2969H12.625ZM12.625 12.9219C12.625 13.05 12.525 13.1563 12.4031 13.1563H6.59688C6.475 13.1563 6.375 13.05 6.375 12.9219V11.5156C6.375 11.3875 6.475 11.2813 6.59688 11.2813H12.4C12.5219 11.2813 12.6219 11.3875 12.6219 11.5156V12.9219H12.625ZM25.625 17.2969C25.625 17.425 25.525 17.5313 25.4031 17.5313H19.5969C19.475 17.5313 19.375 17.425 19.375 17.2969V15.8906C19.375 15.7625 19.475 15.6563 19.5969 15.6563H25.4C25.5219 15.6563 25.6219 15.7625 25.6219 15.8906V17.2969H25.625ZM25.625 12.9219C25.625 13.05 25.525 13.1563 25.4031 13.1563H19.5969C19.475 13.1563 19.375 13.05 19.375 12.9219V11.5156C19.375 11.3875 19.475 11.2813 19.5969 11.2813H25.4C25.5219 11.2813 25.6219 11.3875 25.6219 11.5156V12.9219H25.625Z" fill="black" stroke="black" strokeWidth="0.03125"/>
                        </svg>
                        خواندن
                    </Link>
                    <Link href={`/stories/${titleStory?.slug || firstTitleStory.slug}/overview`} className="more-info">
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14 4.20002C12.7131 4.20002 11.4387 4.45351 10.2497 4.94601C9.06074 5.4385 7.98039 6.16036 7.07038 7.07038C6.16036 7.98039 5.4385 9.06074 4.946 10.2497C4.45351 11.4387 4.20002 12.7131 4.20002 14C4.20002 15.287 4.45351 16.5613 4.946 17.7503C5.4385 18.9393 6.16036 20.0197 7.07038 20.9297C7.98039 21.8397 9.06074 22.5615 10.2497 23.054C11.4387 23.5465 12.7131 23.8 14 23.8C16.5991 23.8 19.0918 22.7675 20.9297 20.9297C22.7675 19.0918 23.8 16.5991 23.8 14C23.8 11.4009 22.7675 8.90823 20.9297 7.07038C19.0918 5.23252 16.5991 4.20002 14 4.20002ZM1.40002 14C1.40002 10.6583 2.72752 7.45344 5.09048 5.09048C7.45344 2.72752 10.6583 1.40002 14 1.40002C17.3418 1.40002 20.5466 2.72752 22.9096 5.09048C25.2725 7.45344 26.6 10.6583 26.6 14C26.6 17.3418 25.2725 20.5466 22.9096 22.9096C20.5466 25.2725 17.3418 26.6 14 26.6C10.6583 26.6 7.45344 25.2725 5.09048 22.9096C2.72752 20.5466 1.40002 17.3418 1.40002 14ZM15.414 19.6C15.414 19.9713 15.2665 20.3274 15.004 20.59C14.7414 20.8525 14.3853 21 14.014 21H14C13.6287 21 13.2726 20.8525 13.0101 20.59C12.7475 20.3274 12.6 19.9713 12.6 19.6C12.6 19.2287 12.7475 18.8726 13.0101 18.6101C13.2726 18.3475 13.6287 18.2 14 18.2H14.014C14.3853 18.2 14.7414 18.3475 15.004 18.6101C15.2665 18.8726 15.414 19.2287 15.414 19.6ZM15.4 8.40002C15.4 8.02872 15.2525 7.67263 14.99 7.41008C14.7274 7.14752 14.3713 7.00002 14 7.00002C13.6287 7.00002 13.2726 7.14752 13.0101 7.41008C12.7475 7.67263 12.6 8.02872 12.6 8.40002V15.4C12.6 15.7713 12.7475 16.1274 13.0101 16.39C13.2726 16.6525 13.6287 16.8 14 16.8C14.3713 16.8 14.7274 16.6525 14.99 16.39C15.2525 16.1274 15.4 15.7713 15.4 15.4V8.40002Z" fill="white" stroke="white" strokeWidth="0.00028"/>
                        </svg>
                        اطلاعات بیشتر
                    </Link>
                </div>
            </div>
            <div className="overview-slider-div">
                <div>
                    داستان‌های محبوب
                    <div>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#dedede"></path> </g></svg>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#dedede"></path> </g></svg>
                    </div>
                </div>
                <div className="overview-slider-cover">
                    <span ref={sliderSpan}></span>
                    <section ref={slider} className="overview-slider">
                        {[...data.stories].sort((a, b) => b.liked - a.liked).map((item, index) => index < 8 && (
                        <div key={index} className={index == 0 ? "active" : null} onClick={(event) =>{
                            const element = document.querySelector('#home-page .overview-slider .active')
                            element.classList.remove("active")
                            event.currentTarget.classList.add("active")
                            const offsetRight = slider.current.offsetWidth - (event.currentTarget.offsetWidth + event.currentTarget.offsetLeft)
                            const spanWidth = sliderSpanWidthFist.current - offsetRight
                            sliderSpan.current.style.width = `${spanWidth > 0 ? spanWidth : 0}px`
                            slider.current.style.transform = `translatex(${offsetRight - sliderSpanWidthFist.current - 20}px)`
                            setTitleStory(data.stories.filter(story => story.slug == item.slug)[0])
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232 172" shapeRendering="geometricPrecision" textRendering="geometricPrecision" projectid="74ca0e11ba174eb2b555348627ccb4a5" exportid="0adcea718f764ad5a3855e1b000cd962" cached="false"><rect fill="none" stroke="url(#gradient)" width="230" height="170" rx="22" ry="22" transform="translate(1 1)"/>
                                <defs>
                                    <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor="rgb(150, 150, 150)" />
                                    <stop offset="100%" stopColor="rgb(250, 250, 250)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div style={{
                                backgroundImage: `url(https://scpuygshpfldexfgtozb.supabase.co/storage/v1/object/public/none-storage/${item.slug}.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                        </div>
                        ))}
                    </section>
                </div>
            </div> 
        </div>
    )
}