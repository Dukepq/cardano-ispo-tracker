import { User } from "@prisma/client";
import { prisma } from "../db";

export async function connectSessionToUser(
  sid: string,
  userId: User["id"]
): Promise<boolean> {
  if (typeof sid !== "string") {
    return false;
  }
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        session: {
          connect: {
            sid: sid,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function disconnectSessionFromUser(
  sid: string,
  userId: User["id"]
): Promise<boolean> {
  if (typeof sid !== "string") {
    return false;
  }
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        session: {
          disconnect: {
            sid: sid,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return false;
  }
  return false;
}
