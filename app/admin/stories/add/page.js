'use client'
import styles from "../style.module.css"

import { useRouter } from "next/navigation"

export default function AdminAddStory() {
    const router = useRouter()
    const updateStory = async (formData) => {
        const res = await fetch("/api/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error || "Failed to edit story")
        }
        
        router.push("/admin/stories") 
    }
    return (
    <section className={styles.story}>
        <h1>افزودن داستان</h1>
        <section>
            <form onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.target)
                const data = Object.fromEntries(formData.entries())
                data.liked = 0
                data.category= data.category?  true : false
                data.content = data.content.split("\n{===CHAPTER===}\n")
                updateStory(data)
            }}>
                <div><label>شناسه داستان: <input type="text" name="slug"/></label></div>
                <div><label>نام داستان: <input type="text" name="name"/></label></div>
                <div><label>محبوبیت: <input type="number" name="liked" value={0} readOnly/></label></div>
                <div>
                    <label>رمان </label>
                    <input type="checkbox" name="category"/>
                </div>
                <div className={styles.textArea}>
                    <label>خلاصه: </label>
                    <textarea name="summary"/>
                </div>
                <div className={styles.textArea}>
                    <label>متن داستان: </label>
                    <textarea name="content"/>
                </div>
                <div>
                    <button type="submit">ذخیره</button>
                </div>
            </form>
        </section>
    </section>
    )
}