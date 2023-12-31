import { prisma } from "../db";
import { Response, Request } from "express";
import { z } from "zod";
import { categorySchema } from "../zod/schemas";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const createCategory = async (req: Request, res: Response) => {
  const result = createCategorySchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data was likely incorrect",
    });
  }
  try {
    const body = result.data.body;
    const create = await prisma.category.upsert({
      where: {
        name: body.name,
      },
      update: {
        name: body.name,
      },
      create: {
        name: body.name,
      },
    });
    console.log(create);
    return res.status(201).json({ success: true, message: "category created" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, message: "failed to create category" });
  }
};

const setCategoriesOnProjectSchema = z.object({
  body: z.object({
    token: z.string(),
    categories: z.array(categorySchema),
  }),
});

export const setCategoriesOnProject = async (req: Request, res: Response) => {
  const result = setCategoriesOnProjectSchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data was likely incorrect",
    });
  }
  const updateTarget = result.data.body.token;
  const body = result.data.body;
  for (let entry of body.categories) {
    try {
      await prisma.category.upsert({
        where: {
          name: entry.name,
        },
        update: {
          name: entry.name,
        },
        create: {
          name: entry.name,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false });
    }
  }
  try {
    await prisma.project.update({
      where: {
        token: updateTarget,
      },
      data: {
        categories: {
          set: body.categories,
        },
      },
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};
