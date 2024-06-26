import { prisma } from "../db";
import { Response, Request, NextFunction } from "express";
import { z } from "zod";
import { projectSchema } from "../zod/schemas";
import storage from "../config/multerConfig";
import multer from "multer";
import fs from "fs";

const defaultProjectFieldsToSelect = {
  name: true,
  token: true,
  maxSupplyExists: true,
  maxSupply: true,
  distributingAmount: true,
  distributingPercentage: true,
  live: true,
  description: true,
  shortDescription: true,
  takesRewards: true,
  logoImageURL: true,
  websiteURL: true,
  startsAt: true,
  endsAt: true,
  featured: true,
};

const RequestAllSchema = z.object({
  query: z
    .object({
      select: z.string().max(15),
      pools: z.literal("true"),
      categories: z.literal("true"),
      logo: z.literal("true"),
    })
    .partial(),
});

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    RequestAllSchema.parse(req);
    const projects = await prisma.project.findMany({
      orderBy: [{ token: "asc" }],
      select: {
        ...defaultProjectFieldsToSelect,
        pools: req.query.pools
          ? {
              select: {
                name: true,
                ticker: true,
                poolId: true,
                amountInPool: true,
                margin: true,
              },
            }
          : false,
        categories: req.query.categories ? { select: { name: true } } : false,
        logo: req.query.logo ? { select: { url: true, size: true } } : false,
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
    token: z.string().min(1).max(10),
  }),
  query: z
    .object({
      select: z.string().max(15),
      pools: z.literal("true"),
      categories: z.literal("true"),
      logo: z.literal("true"),
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
                margin: true,
              },
            }
          : false,
        categories: req.query.categories ? { select: { name: true } } : false,
        logo: req.query.logo ? { select: { url: true, size: true } } : false,
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
        logo: data.logoImageURL
          ? {
              connect: {
                url: data.logoImageURL,
              },
            }
          : undefined,
      },
    });
    res
      .status(201)
      .json({ success: true, message: "Successfully created a new project" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message:
        "failed to create a new project, it is likely that this error was caused by a 'Unique constraint'.",
    });
  } finally {
    prisma.$disconnect();
  }
};

const deleteProjectSchema = z.object({
  body: z.object({
    token: z.string(),
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
    return res.status(201).json({
      success: true,
      message: `succesfully deleted ${deleted.name || deleted.token}`,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "project likely didn't exist" });
  } finally {
    prisma.$disconnect();
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
        logo: body.logoImageURL
          ? {
              connect: {
                url: body.logoImageURL,
              },
            }
          : undefined,
      },
    });
    res
      .status(201)
      .send({ success: true, message: "successfully updated project" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};

const upload = multer({ storage, limits: { fileSize: 60000 } }).single("file");
export async function multerUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ success: false, message: err.message });
      } else {
        return res.status(406).json({ success: false, message: err.message });
      }
    } else if (err) {
      return res.status(406).json({ success: false });
    }
    next();
  });
}

export async function imageResponse(req: Request, res: Response) {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "something went wrong." });
  }
  const { path, size, filename, mimetype } = req.file;
  const url = "/api/uploads/" + filename;
  const extension = filename.split(".")[filename.split(".").length - 1];
  try {
    const image = await prisma.image.create({
      data: {
        mime: mimetype,
        extension: extension,
        size: size,
        url: url,
        filename: filename,
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        path,
        url: image.url,
        id: image.id,
        size: image.size,
      },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "something went wrong." });
  }
}

const getImageSchema = z.object({
  body: z.object({
    path: z.string(),
  }),
});

export async function getImage(req: Request, res: Response) {
  const result = getImageSchema.safeParse(req);
  if (!result.success) {
    return res
      .status(406)
      .json({ success: false, message: "shape of request data incorrect" });
  }
  const { path } = result.data.body;
  const split = path.toLowerCase().split(".");
  const extension = split[split.length - 1];

  if (!["png", "jpg", "jpeg"].includes(extension)) {
    return res
      .status(406)
      .json({ success: false, message: "extension type not acceptable" });
  }
  fs.access(path, (err) => {
    if (err) {
      return res.status(404).json({ success: false, message: "not found" });
    }
    res.contentType(`image/${extension}`);
    res.sendFile(path);
  });
}
