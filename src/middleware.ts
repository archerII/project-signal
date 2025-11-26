export { default } from "next-auth/middleware"

export const config = {
    // Protect all routes except api/cron (which has its own auth) and login
    matcher: ["/((?!login|api/cron).*)"],
}
