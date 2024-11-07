import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  if(req.nextUrl.pathname.startsWith("/api/user")){
    return NextResponse.redirect(new URL('/sigin', req.url));
  }

  if(req.nextUrl.pathname.startsWith("/dashboard")){
    return NextResponse.next();
  }
}

// let count = 0;
// export function middleware(req: NextRequest) {
//   count++;
//   const res = NextResponse.next();
//   console.log(count);
//   return res;
// }

// export const config = {
//   matcher: "/api/:path*",
// };
