import { NextResponse, type NextRequest } from "next/server";
import { nextBase } from "./app/lib/routes";

export async function middleware(request: NextRequest) {
  const response = await fetch(nextBase + "/api/rateLimit");
  if (response.status === 429) {
    return NextResponse.json({ error: "Too many requests" });
  }
  return NextResponse.next();
}

export const config = {};
