// mostly copied from https://github.com/kleydon/prisma-session-store/blob/master/src/%40types/prisma.ts

export interface IPrismaSession {
  data: string | null;
  expiresAt: Date;
  id?: string;
  sid: string;
}

interface ICreatePrismaSession extends IPrismaSession {
  data: string;
}

interface IFindUniqueArgs {
  select?: {
    expiresAt?: boolean;
    sid?: boolean;
  };
  where: {
    sid: string;
  };
}

interface IFindManyArgs {
  select?: {
    data?: boolean;
    expiresAt?: boolean;
    sid?: boolean;
  };
  where?: {
    sid?: string;
  };
}

interface ICreateArgs {
  data: ICreatePrismaSession;
}

interface IUpdateArgs {
  data: Partial<ICreatePrismaSession>;
  where: { sid: string };
}

interface iUpsertArgs {
  where: {
    sid: string;
  };
  update: Partial<IPrismaSession>;
  create: Partial<IPrismaSession>;
}

interface IDeleteArgs {
  where: { sid: string };
}

export type IPrisma<M extends string = "session"> = Record<
  Exclude<M, `$${string}`>,
  {
    create(args: ICreateArgs): Promise<IPrismaSession>;
    delete(args: IDeleteArgs): Promise<IPrismaSession>;
    deleteMany(args?: unknown): Promise<unknown>;
    findMany(args?: IFindManyArgs): Promise<IPrismaSession[]>;
    findUnique(args: IFindUniqueArgs): Promise<IPrismaSession | null>;
    update(args: IUpdateArgs): Promise<IPrismaSession>;
  }
> & {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
};
