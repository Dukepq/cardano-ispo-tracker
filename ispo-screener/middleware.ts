import { NextResponse, type NextRequest } from "next/server";
import { nextBase } from "./app/lib/routes";

export async function middleware(request: NextRequest) {
  const ip = request.headers.get("X-Forwarded-For") ?? "127.0.0.1";
  const response = await fetch(nextBase + "/api/rateLimit", {
    headers: {
      "X-Forwarded-For": ip,
    },
  });
  if (response.status === 429) {
    return NextResponse.json({ error: "Too many requests" });
  }
  console.log;
  return NextResponse.next();
}

export const config = {};
