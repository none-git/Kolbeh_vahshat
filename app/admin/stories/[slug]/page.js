'use client'
import styles from "../style.module.css"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

export const dynamic = "force-dynamic"
export default function AdminStory() {
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
    const router = useRouter()
    const updateStory = async (formData) => {
        formData.slug = slug
        const res = await fetch("/api/stories", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        router.push("/admin/stories") 
    }
    const deleteStory = async () => {
        const res = await fetch("/api/stories", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
        })
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        router.push("/admin/stories") 
    }
    const storyData = data.stories.find(item => item.slug == slug)
    return (
    <section className={styles.story}>
        <h1>ویرایش داستان: {storyData.name}</h1>
        <section>
            <form onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.target)
                const data = Object.fromEntries(formData.entries())
                data.liked = Number(data.liked)
                data.category= data.category?  true : false
                data.content = data.content.split("\n{===CHAPTER===}\n")
                updateStory(data)
            }}>
                <div><label>شناسه: <input type="text" name="newSlug" defaultValue={storyData.slug}/></label></div>
                <div><label>نام: <input type="text" name="name" defaultValue={storyData.name}/></label></div>
                <div><label>محبوبیت: <input type="number" name="liked" defaultValue={storyData.liked} min={0}/></label></div>
                <div>
                    <label>رمان</label>
                    <input type="checkbox" name="category" defaultChecked={storyData.category === true}/>
                </div>
                <div className={styles.textArea}>
                    <label>خلاصه: </label>
                    <textarea name="summary" defaultValue={storyData.summary}/>
                </div>
                <div className={styles.textArea}>
                    <label>متن داستان: </label>
                    <textarea name="content" defaultValue={storyData.content.join("\n{===CHAPTER===}\n")}/>
                </div>
                <div>
                    <button type="submit">ذخیره</button>
                    <button type="button" onClick={deleteStory}>حذف</button>
                </div>
            </form>
        </section>
    </section>
    )
}