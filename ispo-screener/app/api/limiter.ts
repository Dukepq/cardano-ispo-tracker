import { RateLimiter, type RateLimiterOpts } from "limiter";
const pruneInterval = 60 * 1000;

const limiterOptions: RateLimiterOpts = {
  interval: "min",
  tokensPerInterval: 500,
  fireImmediately: true,
};

const newLimiter = () => {
  return new RateLimiter(limiterOptions);
};

const localUserCache: Map<
  string,
  {
    limiter: RateLimiter;
    lastSeen: number;
  }
> = new Map();

const pruneCache = () => {
  const removeAfter = 1000 * 60 * 0.1;
  for (const ip of localUserCache.keys()) {
    const user = localUserCache.get(ip);
    if (user && user.lastSeen + removeAfter < Date.now()) {
      localUserCache.delete(ip);
    }
  }
  setTimeout(pruneCache, pruneInterval);
};
setTimeout(pruneCache, pruneInterval);

const userLimit = async (ip: string, removeAmount: number) => {
  if (!localUserCache.has(ip)) {
    localUserCache.set(ip, { limiter: newLimiter(), lastSeen: Date.now() });
  }
  const user = localUserCache.get(ip);
  if (!user) return null;
  user.lastSeen = Date.now();
  const remainingTokens = await user.limiter.removeTokens(removeAmount);

  return remainingTokens;
};

export default userLimit;
