import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin")
  const isAuthApi = req.nextUrl.pathname.startsWith("/api/admin-auth")

  if (isAdminPath && !isAuthApi) {
    const token = req.cookies.get("stance_admin")?.value
    if (token !== "1") {
      const loginUrl = new URL("/admin/login", req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
