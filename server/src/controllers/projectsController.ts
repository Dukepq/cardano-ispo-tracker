import { prisma } from "../db";
import { Response, Request } from "express";
import { z } from "zod";

const defaultProjectFieldsToSelect = {
  name: true,
  token: true,
  maxSupplyExists: true,
  maxSupply: true,
  DistributingAmount: true,
  distributingPercentage: true,
  live: true,
  description: true,
  takesRewards: true,
  pools: {
    select: {
      name: true,
      amountInPool: true,
    },
  },
  categories: {
    select: {
      name: true,
    },
  },
};

const RequestAllSchema = z.object({
  query: z
    .object({
      select: z.string().max(15),
      pools: z.literal("true"),
      categories: z.literal("true"),
    })
    .partial(),
});

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    RequestAllSchema.parse(req);
    const projects = await prisma.project.findMany({
      select: {
        ...defaultProjectFieldsToSelect,
        pools: req.query.pools ? true : false,
        categories: req.query.categories ? true : false,
      },
    });
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ success: false });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const RequestByTokenSchema = z.object({
  params: z.object({
    token: z.string().min(1).max(10).regex(new RegExp("^[A-Z]+$")),
  }),
  query: z
    .object({
      select: z.string().max(15),
      pools: z.literal("true"),
      categories: z.literal("true"),
    })
    .partial(),
});

export const getProjectByToken = async (req: Request, res: Response) => {
  try {
    RequestByTokenSchema.parse(req);
    const query =
      typeof req.query.select === "string" &&
      req.query.select in defaultProjectFieldsToSelect
        ? req.query.select
        : null;
    if (req.query.select && !query)
      return res
        .status(400)
        .json({ succes: false, message: "provided invalid query params" });
    const select = query ? { [query]: true } : defaultProjectFieldsToSelect;
    const params = req.params;
    const token = params.token;
    const project = await prisma.project.findUnique({
      where: {
        token: token,
      },
      select: {
        ...select,
        pools: req.query.pools ? true : false,
        categories: req.query.categories ? true : false,
      },
    });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ success: false });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

// async function main() {
//   try {
//     // const project = await prisma.project.delete({
//     //   where: {
//     //     token: "XUB",
//     //   },
//     // });
//     const project = await prisma.project.create({
//       data: {
//         token: "AAA",
//         name: "AAA Protocol",
//         live: true,
//         DistributingAmount: 1_000_000,
//         takesRewards: "OPTIONAL",
//         // maxSupply: 200_000_000,
//         maxSupplyExists: false,
//         pools: {
//           create: [
//             {
//               amountInPool: 3_000,
//               name: "AAA Pool One",
//               ticker: "AAA1",
//               poolId:
//                 "152316dbcd134ddae16a8c8204e38ac80448x68342f8c23cfe4b7edf",
//             },
//             {
//               amountInPool: 80_000,
//               name: "AAA Pool two",
//               ticker: "AAA2",
//               poolId:
//                 "152316dbcd134dduu10a8c5204e38ac80448x68342f8c23cfe4b7edg",
//             },
//           ],
//         },
//         categories: {
//           connect: {
//             id: 1,
//           },
//         },
//       },
//     });
//     console.log(project);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     prisma.$disconnect();
//   }
// }
// main();
