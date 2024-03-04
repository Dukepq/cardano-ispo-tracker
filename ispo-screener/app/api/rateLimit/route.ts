import userLimit from "../limiter";

export async function GET(request: Request) {
  const forwarded = request.headers.get("X-Forwarded-For") ?? "127.0.0.1";
  const clientIp = forwarded.split(",")[0];
  console.log("API IP: " + clientIp);
  const remainingLimit = await userLimit(clientIp, 1);
  const headers = new Headers({
    "X-RateLimit-Limit": process.env.NEXT_SERVER_RATELIMIT!,
  });
  remainingLimit &&
    headers.append("X-RateLimit-Remaining", remainingLimit.toString());

  if (remainingLimit && remainingLimit < 0) {
    return new Response(null, {
      status: 429,
      statusText: "Too many requests!",
      headers,
    });
  }
  return new Response(null, { status: 200, headers });
}
