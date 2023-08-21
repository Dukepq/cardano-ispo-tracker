import { prisma } from "../db";
import { Response, Request } from "express";
import { set, z } from "zod";
import { projectSchema } from "../zod/schemas";

const defaultProjectFieldsToSelect = {
  name: true,
  token: true,
  maxSupplyExists: true,
  maxSupply: true,
  distributingAmount: true,
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
        pools: req.query.pools
          ? {
              select: {
                name: true,
                ticker: true,
                poolId: true,
                amountInPool: true,
              },
            }
          : false,
        categories: req.query.categories ? { select: { name: true } } : false,
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
        pools: req.query.pools
          ? {
              select: {
                name: true,
                ticker: true,
                poolId: true,
                amountInPool: true,
              },
            }
          : false,
        categories: req.query.categories ? { select: { name: true } } : false,
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

const createProjectSchema = z.object({
  body: projectSchema,
});

export const createProject = async (req: Request, res: Response) => {
  const result = createProjectSchema.safeParse(req);
  if (!result.success) {
    return res
      .status(406)
      .json({ success: false, message: "shape of data incorrect." });
  }
  try {
    const data = result.data.body;
    await prisma.project.create({
      data: {
        ...data,
        categories: data.categories
          ? {
              connectOrCreate: data.categories.map((category) => {
                return {
                  where: { name: category.name },
                  create: { name: category.name },
                };
              }),
            }
          : undefined,

        pools: data.pools
          ? {
              create: data.pools,
            }
          : undefined,
      },
    });
    res
      .status(201)
      .json({ success: true, message: "Successfully created a new project" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message:
        "failed to create a new project, it is likely that this error was caused by a 'Unique constraint'.",
    });
  }
};

const deleteProjectSchema = z.object({
  body: z.object({
    token: z.string().max(10).regex(new RegExp("[A-Z]+")),
  }),
});

export const deleteProject = async (req: Request, res: Response) => {
  const result = deleteProjectSchema.safeParse(req);
  if (!result.success) {
    return res
      .status(406)
      .json({ success: false, message: "shape of data incorrect." });
  }
  try {
    const deleteTarget = result.data.body.token;
    const deleted = await prisma.project.delete({
      where: {
        token: deleteTarget,
      },
    });
    return res.status(200).json({
      success: true,
      message: `succesfully deleted ${deleted.name || deleted.token}`,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "project likely didn't exist" });
  }
};

const updateProjectSchema = z.object({
  body: projectSchema.partial().omit({ pools: true }).extend({
    token: z.string(),
  }),
});

export const updateProject = async (req: Request, res: Response) => {
  const result = updateProjectSchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data was likely incorrect",
    });
  }
  try {
    const updateTarget = result.data.body.token;
    const body = result.data.body;
    await prisma.project.update({
      where: {
        token: updateTarget,
      },
      data: {
        ...body,
        categories: {
          connectOrCreate: body.categories?.map((item) => {
            return { where: { name: item.name }, create: { name: item.name } };
          }),
        },
      },
    });
    res
      .status(200)
      .send({ success: true, message: "successfully updated project" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  }
};

// (async () => {
//   await prisma.category.deleteMany();
//   await prisma.pool.deleteMany();
//   await prisma.project.deleteMany();
// })();
