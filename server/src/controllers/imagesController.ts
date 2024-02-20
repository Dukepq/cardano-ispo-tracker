import { prisma } from "../db";
import { Request, Response } from "express";
import { z } from "zod";
import { unlink, access } from "fs/promises";
import path, { relative } from "path";

const fetchImagesSchema = z.object({
  query: z.optional(
    z.object({
      items: z.coerce.number().max(50).optional(),
      page: z.coerce.number().optional(),
    })
  ),
});

export async function fetchImages(req: Request, res: Response) {
  const results = fetchImagesSchema.safeParse(req);
  if (!results.success) {
    return res.status(400).json({
      success: false,
      message: results.error.flatten().fieldErrors.query,
    });
  }

  const query = results.data.query;
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong.",
    });
  }
  const items = query.items || 25;
  const page = query.page || 0;
  const currentIndex = items * page;
  try {
    const count = await prisma.image.count();
    const images = await prisma.image.findMany({
      skip: currentIndex,
      take: items,
      orderBy: {
        updatedAt: "desc",
      },
    });
    return res.status(200).json({ data: images, count });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "something went wrong" });
  }
}

const deleteImageSchema = z.object({
  body: z.object({
    filename: z.string(),
  }),
});

function getUploadsPath(filename: string) {
  const relativeFolderPath = "../../uploads/";
  const filePath = path.join(__dirname, relativeFolderPath) + filename;
  return filePath;
}

export async function deleteImage(req: Request, res: Response) {
  const results = deleteImageSchema.safeParse(req);
  if (!results.success) {
    return res.status(400).json({
      success: false,
      message: "something went wrong.",
    });
  }
  const filename = results.data.body.filename;
  const filePath = getUploadsPath(filename);

  try {
    await access(filePath);
    const image = await prisma.image.findUnique({
      where: {
        filename,
      },
    });
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "could not find file to delete" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "could not find file to delete" });
  }

  try {
    await unlink(filePath);
    const deleted = await prisma.image.delete({
      where: {
        filename,
      },
    });
    return res.status(200).json({
      success: true,
      message: "succesfully deleted: " + deleted.filename,
      deleted: filename,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while trying to delete the image.",
    });
  }
}
