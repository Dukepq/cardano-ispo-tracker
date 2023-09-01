import session, { Store } from "express-session";
import { IPrisma } from "./prismaSessionTypes";

interface Options {
  period: number;
}

export class PrismaStore extends Store {
  constructor(
    private readonly prisma: IPrisma,
    private readonly options: Options
  ) {
    super();
    this.startInterval();
  }

  public checkInterval?: NodeJS.Timeout;

  startInterval = (): void => {
    if (this.checkInterval) return;
    this.checkInterval = setInterval(async (): Promise<void> => {
      try {
        await this.prune();
      } catch (err) {
        console.error(err);
      }
    }, this.options.period);
    return;
  };
  public stopInterval = () => {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    return;
  };

  public destroy = async (
    sid: string,
    callback?: ((err?: any) => void) | undefined
  ): Promise<void> => {
    try {
      await this.prisma.session.deleteMany({
        where: {
          sid: sid,
        },
      });
      if (callback) callback(null);
    } catch (err) {
      console.error(err);
      if (callback) callback(err);
    } finally {
      this.prisma.$disconnect();
    }
    return;
  };

  public get = async (
    sid: string,
    callback: (
      err?: any,
      session?: session.SessionData | null | undefined
    ) => void
  ): Promise<void> => {
    const session = await this.prisma.session
      .findUnique({
        where: {
          sid: sid,
        },
      })
      .catch(() => null);
    if (session === null) return callback(null, null);
    if (
      session.sid &&
      session.expiresAt &&
      Date.now() >= session.expiresAt.valueOf()
    ) {
      await this.prisma.session
        .deleteMany({
          where: {
            sid: sid,
          },
        })
        .catch(() => null);
      return callback?.(null, null);
    }
    const result = JSON.parse(session.data ?? "{}");
    await this.prisma.$disconnect();
    return callback(null, result);
  };

  public set = async (
    sid: string,
    session: session.SessionData,
    callback?: ((err?: any) => void) | undefined
  ): Promise<void> => {
    const sessionString = JSON.stringify(session);
    const expiresAt = this.getExpiryDate(
      session.cookie.maxAge || 1000 * 60 * 60
    );
    const data = {
      sid: sid,
      data: sessionString,
      expiresAt: expiresAt,
    };
    const existingSession = await this.prisma.session
      .findUnique({
        where: {
          sid: sid,
        },
      })
      .catch(() => null);
    try {
      if (existingSession !== null) {
        await this.prisma.session.update({
          where: {
            sid: sid,
          },
          data: data,
        });
      } else {
        await this.prisma.session.create({
          data: data,
        });
      }
      callback?.(null);
    } catch (err) {
      console.error(err);
      if (callback) callback(err);
    } finally {
      this.prisma.$disconnect();
    }
    return;
  };

  public touch = async (
    sid: string,
    session: session.SessionData,
    callback?: ((err?: any) => void) | undefined
  ): Promise<void> => {
    try {
      const expiresAt = this.getExpiryDate(
        session.cookie.maxAge || 1000 * 60 * 60
      );
      const existingSession = await this.prisma.session
        .findUnique({
          where: {
            sid: sid,
          },
        })
        .catch(() => null);
      if (existingSession !== null) {
        const existingSessionData = {
          ...JSON.parse(existingSession.data ?? "{}"),
          cookie: session.cookie,
        };
        await this.prisma.session.update({
          where: {
            sid: existingSession.sid,
          },
          data: {
            expiresAt,
            data: JSON.stringify(existingSessionData),
          },
        });
      }
      if (callback) callback(null);
    } catch (err) {
      console.error(err);
      if (callback) callback(err);
    } finally {
      this.prisma.$disconnect();
    }
  };

  private readonly getExpiryDate = (ms: number): Date => {
    return new Date(Date.now() + ms);
  };

  public readonly prune = async () => {
    const sessions = await this.prisma.session.findMany({
      select: {
        expiresAt: true,
        sid: true,
      },
    });
    for (let session of sessions) {
      const remaining = session.expiresAt.valueOf() - Date.now();
      console.log(session);
      console.log(remaining);
      console.log(
        "session expires in: " + session.expiresAt.valueOf(),
        "time now: " + Date.now()
      );
      if (remaining < 0) {
        try {
          await this.prisma.session.delete({
            where: {
              sid: session.sid,
            },
          });
        } catch (err) {
          console.error(err);
        } finally {
          await this.prisma.$disconnect();
        }
      }
    }
  };
}
