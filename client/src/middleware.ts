import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest): NextResponse => {
  const response = NextResponse.next();

  const cookie = req.cookies.get("connect.sid");
  if (cookie) {
    response.cookies.set("connect.sid", cookie.value);
  }

  return response;
};

export const config = {
  matcher: ["/user/orders/:path*", "/lessons/:path*", "/instructors/dashboard/:path*"],
};
