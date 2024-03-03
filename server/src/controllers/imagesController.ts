import { prisma } from "../db";
import { Request, Response } from "express";
import { z } from "zod";
import { unlink, access } from "fs/promises";
import path, { relative } from "path";
import multer from "multer";
import {
  handleCloudinaryDelete,
  handleCloudinaryUpload,
} from "../config/cloudinaryConfig";

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
        .status(404)
        .json({ success: false, message: "could not find file to delete" });
    }
  } catch (err) {
    return res
      .status(404)
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

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 60000 } });
export const multerMemUpload = upload.single("file");
type MulterUploadType = typeof multerMemUpload;

function runMiddleware(req: Request, res: Response, fn: MulterUploadType) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const cloudinaryUpload = async (req: Request, res: Response) => {
  try {
    await runMiddleware(req, res, multerMemUpload);
    if (!req.file) return res.status(400).json({ success: false });
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleCloudinaryUpload(dataURI);
    const { format, width, height, bytes, url, public_id } = cldRes;
    const mime = cldRes.resource_type + "/" + cldRes.format;

    const image = await prisma.image.create({
      data: {
        publicId: public_id,
        mime,
        extension: format,
        size: bytes,
        url: url,
        filename: public_id,
        width,
        height,
        provider: "LOCAL",
      },
    });
    return res.status(200).json({
      success: true,
      data: {
        size: image.size,
        url: image.url,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

const deleteImageCloudinarySchema = z.object({
  body: z.object({
    url: z.string(),
  }),
});

export const cloudinaryDelete = async (req: Request, res: Response) => {
  const results = deleteImageCloudinarySchema.safeParse(req);
  if (!results.success) {
    return res.status(400).json({
      success: false,
      message: "something went wrong.",
    });
  }
  try {
    const url = results.data.body.url;
    const image = await prisma.image.findUnique({
      where: {
        url: url,
      },
    });
    const publicId = image?.publicId;
    if (!publicId) {
      return res.status(404).json({
        success: false,
        message: "could not find cloudinary project_id",
      });
    }
    await handleCloudinaryDelete(publicId);
    await prisma.image.delete({
      where: {
        url,
      },
    });
    res.status(200).json({
      success: true,
      deleted: url,
      message: "successfully deleted image at url: " + url,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "something went wrong.",
    });
  }
};
