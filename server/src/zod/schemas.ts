import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2),
});
export type CategorySchemaType = z.infer<typeof categorySchema>;

export const poolSchema = z.object({
  ticker: z.string(),
  name: z.string().optional(),
  poolId: z.string(),
  amountInPool: z.number(),
  owner: z.string().optional(),
  committedPledge: z.number().optional(),
  activePledge: z.number().optional(),
  lifetimeRewards: z.number().optional(),
  lifetimeBlocks: z.number().optional(),
  margin: z.number(),
});
export type PoolSchemaType = z.infer<typeof poolSchema>;

export const projectSchema = z.object({
  name: z.string(),
  token: z.string(),
  websiteURL: z.string().url().nullable().optional().or(z.string().max(0)),
  logoImageURL: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  maxSupplyExists: z.boolean().optional(),
  maxSupply: z.number().optional(),
  distributingPercentage: z.number().optional(),
  distributingAmount: z.number(),
  takesRewards: z.enum(["NONE", "PARTIAL", "OPTIONAL", "ALL", "NOT_SPECIFIED"]),
  live: z.boolean(),
  pools: z.array(poolSchema).optional(),
  categories: z.array(categorySchema).optional(),
});
export type ProjectSchemaType = z.infer<typeof projectSchema>;
