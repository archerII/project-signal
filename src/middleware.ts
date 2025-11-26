import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/login',
    },
})

export const config = {
    // Protect all routes except api/cron (which has its own auth) and login
    matcher: ["/((?!login|api/cron|api/auth).*)"],
}
