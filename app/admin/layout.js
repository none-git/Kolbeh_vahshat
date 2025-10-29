import "./layout.css"

import NavLink from "@/hooks/NavLink"
import { cookies } from "next/headers"

export default async function AdminLayout({ children }) {
    const token = (await cookies()).get("auth_token")?.value
    if (token !== process.env.AUTH_TOKEN) {
        return ("no access")
    }  
    return (
    <main className="admin">
        <div className="sidebar">
            <div>وحشت خانه</div>
            <nav>
                <NavLink href={"/admin"} exact>
                    <svg viewBox="0 0 25.00 25.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    <h2>داشبورد</h2>
                    <span style={{display: "none"}}>2</span>
                </NavLink>
                <NavLink href={"/admin/stories"}>
                <svg viewBox="-3.84 -3.84 31.68 31.68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g fill="none" fillRule="evenodd" id="页面-1" strokeWidth="0"> <g id="导航图标" transform="translate(-325.000000, -80.000000)"> <g id="编组" transform="translate(325.000000, 80.000000)"> <polygon fill="" fillOpacity="0.01" fillRule="nonzero" id="路径" points="24 0 0 0 0 24 24 24"></polygon> <polygon id="路径" points="22 7 12 2 2 7 2 17 12 22 22 17" strokeLinejoin="round" strokeWidth="1.176"></polygon> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="2" x2="12" y1="7" y2="12"></line> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="12" x2="12" y1="22" y2="12"></line> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="22" x2="12" y1="7" y2="12"></line> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="17" x2="7" y1="4.5" y2="9.5"></line> </g> </g> </g> </g></svg>
                    <h2>داستان ها</h2>
                    <span style={{display: "none"}}>2</span>
                </NavLink>
                {/* <NavLink href={"/admin/orders"}>
                    <svg viewBox="-1.44 -1.44 26.88 26.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="5" y="4" width="14" height="17" rx="2" strokeWidth="1.224"></rect> <path d="M9 9H15" strokeWidth="1.224" strokeLinecap="round"></path> <path d="M9 13H15" strokeWidth="1.224" strokeLinecap="round"></path> <path d="M9 17H13" strokeWidth="1.224" strokeLinecap="round"></path> </g></svg>
                    <h2>ثبت داستان</h2>
                    <span>5</span>
                </NavLink>
                <NavLink href={"/admin/users"}>
                <svg viewBox="-2.64 -2.64 29.28 29.28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="9" cy="9" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.152"></circle><path d="M16 19C16 15.6863 12.866 13 9 13C5.13401 13 2 15.6863 2 19" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.152"></path><path d="M15 13C17.2091 13 19 11.2091 19 9C19 6.79086 17.2091 5 15 5C13.8053 5 12.7329 5.52375 12 6.35418" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.152"></path><path d="M22 19C22 15.6863 18.866 13 15 13C14.1928 13 12.897 12.7069 12 11.7655" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.152"></path></g></svg>
                    <h2>کاربران</h2>
                    <span>2</span>
                </NavLink>
                <NavLink href={"/admin/"}>
                    <svg viewBox="-2.4 -2.4 28.80 28.80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g  id="SVGRepo_iconCarrier"> <title>Comments</title> <g id="Comments" strokeWidth="0" fill="none" fillRule="evenodd"> <rect id="Container" x="0" y="0" width="24" height="24"> </rect> <path d="M10,4 L14,4 C17.3137085,4 20,6.6862915 20,10 L20,14 C20,17.3137085 17.3137085,20 14,20 L4,20 L4,20 L4,10 C4,6.6862915 6.6862915,4 10,4 Z" id="shape-1" strokeWidth="1.248" strokeLinecap="round" strokeDasharray="0,0"> </path> <line x1="9" y1="14" x2="12" y2="14" id="shape-2" strokeWidth="1.248" strokeLinecap="round" strokeDasharray="0,0"> </line> <line x1="9" y1="10" x2="15" y2="10" id="shape-3" strokeWidth="1.248" strokeLinecap="round" strokeDasharray="0,0"> </line> </g> </g></svg>
                    <h2>نظرات</h2>
                    <span>12</span>
                </NavLink>
                <NavLink href={"/admin/support"}>
                <svg width="204px" height="204px" viewBox="-3.36 -3.36 30.72 30.72" id="_24x24_On_Light_Support" data-name="24x24/On Light/Support" xmlns="http://www.w3.org/2000/svg" fill="#000000"  strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="view-box" width="24" height="24" fill="none"></rect> <path id="Shape" d="M8,17.751a2.749,2.749,0,0,1,5.127-1.382C15.217,15.447,16,14,16,11.25v-3c0-3.992-2.251-6.75-5.75-6.75S4.5,4.259,4.5,8.25v3.5a.751.751,0,0,1-.75.75h-1A2.753,2.753,0,0,1,0,9.751v-1A2.754,2.754,0,0,1,2.75,6h.478c.757-3.571,3.348-6,7.022-6s6.264,2.429,7.021,6h.478a2.754,2.754,0,0,1,2.75,2.75v1a2.753,2.753,0,0,1-2.75,2.75H17.44A5.85,5.85,0,0,1,13.5,17.84,2.75,2.75,0,0,1,8,17.751Zm1.5,0a1.25,1.25,0,1,0,1.25-1.25A1.251,1.251,0,0,0,9.5,17.751Zm8-6.75h.249A1.251,1.251,0,0,0,19,9.751v-1A1.251,1.251,0,0,0,17.75,7.5H17.5Zm-16-2.25v1A1.251,1.251,0,0,0,2.75,11H3V7.5H2.75A1.251,1.251,0,0,0,1.5,8.751Z" transform="translate(1.75 2.25)"></path> </g></svg>
                    <h2>پشتیبانی</h2>
                    <span>4</span>
                </NavLink>
                <NavLink href={"/admin/terminal"}>
                    <svg viewBox="-2.64 -2.64 29.28 29.28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 15H16" strokeWidth="1.344" strokeLinecap="round"></path> <path d="M8 15L10.5 12.5V12.5C10.7761 12.2239 10.7761 11.7761 10.5 11.5V11.5L8 9" strokeWidth="1.344" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M3 8C3 6.11438 3 5.17157 3.58579 4.58579C4.17157 4 5.11438 4 7 4H12H17C18.8856 4 19.8284 4 20.4142 4.58579C21 5.17157 21 6.11438 21 8V12V16C21 17.8856 21 18.8284 20.4142 19.4142C19.8284 20 18.8856 20 17 20H12H7C5.11438 20 4.17157 20 3.58579 19.4142C3 18.8284 3 17.8856 3 16V12V8Z" strokeWidth="1.344" strokeLinejoin="round"></path> </g></svg>
                    <h2>ترمینال</h2>
                    <span>+99</span>
                </NavLink> */}
            </nav>
        </div>
        {children}
        <div className="bottom-nav">
            <NavLink href={"/admin"} exact>
                <svg viewBox="0 0 25.00 25.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </NavLink>
            <NavLink href={"/admin/stories"}>
            <svg viewBox="-3.84 -3.84 31.68 31.68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g fill="none" fillRule="evenodd" id="页面-1" strokeWidth="0"> <g id="导航图标" transform="translate(-325.000000, -80.000000)"> <g id="编组" transform="translate(325.000000, 80.000000)"> <polygon fill="" fillOpacity="0.01" fillRule="nonzero" id="路径" points="24 0 0 0 0 24 24 24"></polygon> <polygon id="路径" points="22 7 12 2 2 7 2 17 12 22 22 17" strokeLinejoin="round" strokeWidth="1.176"></polygon> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="2" x2="12" y1="7" y2="12"></line> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="12" x2="12" y1="22" y2="12"></line> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="22" x2="12" y1="7" y2="12"></line> <line id="路径" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.176" x1="17" x2="7" y1="4.5" y2="9.5"></line> </g> </g> </g> </g></svg>
            </NavLink>
        </div>
    </main>
    )
}