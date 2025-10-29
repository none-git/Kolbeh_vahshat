import styles from "./style.module.css"

import Link from "next/link"

export const dynamic = "force-dynamic"
export default async function AdminStories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stories`, {cache: "no-store"})
    if (!res.ok) throw new Error(`Failed to fetch stories: ${res.status}`)
    const data = await res.json()
    return (
    <section className={styles.stories}>
        <h1>داستان ها</h1>
        <section>
            <table>
                <thead>
                    <tr>
                        <th><span>شناسه داستان</span></th>
                        <th><span>نام داستان</span></th>
                        <th>دسته بندی</th>
                        <th>محبوبیت</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.stories.map((item, index) => (
                    <tr key={item.slug}>
                        <td><h3 className={styles.slug}>{item.slug}</h3></td>
                        <td><h3 className={styles.name}>{item.name}</h3></td>
                        <td>{item.category === true ? 'رمان' : 'داستان کوتاه'}</td>
                        <td><p>{item.liked}</p></td>
                        <td><Link href={`/admin/stories/${item.slug}`}>ویرایش</Link></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </section>
    )
}