import userLimit from "../limiter";

export async function GET(request: Request) {
  const ip = request.headers.get("X-Forwarded-For") ?? "127.0.0.1";
  const remainingLimit = await userLimit(ip, 1);

  const headers = new Headers({
    "X-RateLimit-Limit": "500",
  });
  remainingLimit &&
    headers.append("X-RateLimit-Remaining", remainingLimit.toString());

  if (remainingLimit && remainingLimit < 0) {
    return new Response(null, {
      status: 429,
      statusText: "Too many requests!",
      headers: headers,
    });
  }
  return new Response(null, { status: 200 });
}
