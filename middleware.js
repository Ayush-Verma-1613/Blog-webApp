import { NextResponse as res } from "next/server"
const SEVEN_DAYS = 7*24*60*60;
export const config = {
    matcher: '/admin/:path*',
}

export const middleware = async (request) => {
    const cookies = request.cookies.get("AccessToken")

    if(!cookies)
        return res.redirect(new URL('/login', request.url))
   

   const token = request.cookies.get("AccessToken")?.value;

const api = await fetch(`${process.env.SERVER}/api/session`, {
  method: "POST",
  body: JSON.stringify({ token }),
  headers: {
    "Content-Type": "application/json",
  },
});

    if(!api.ok)
        return res.redirect(new URL('/login', request.url))

    const body = await api.json()
    const result = res.next()
    result.cookies.set("session", JSON.stringify(body), {maxAge: SEVEN_DAYS});
    return result;

}