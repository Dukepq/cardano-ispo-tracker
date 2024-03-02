import { NextResponse, type NextRequest } from "next/server";
import { nextBase } from "./app/lib/routes";

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");
  console.log("hello from next mw, cookie: ", cookie);
  const response = await fetch(nextBase + "/api/rateLimit");
  if (response.status === 429) {
    return NextResponse.json({ error: "Too many requests" });
  }
  return NextResponse.next();
}

export const config = {};
