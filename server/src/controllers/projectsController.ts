import { RewardTakingBehaviour } from "@prisma/client";
import { prisma } from "../db";
import { Response, Request } from "express";
import { formatProjectData } from "../utils/ProjectDataFormatting";
import { z } from "zod";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        pools: true,
      },
    });
    const formattedProjects = projects.map((project) => {
      return formatProjectData(project);
    });
    res.status(200).json({ success: "true", data: formattedProjects });
  } catch (err) {
    res.status(404).json({ success: "false", message: "not found" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const RequestByIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const getProjectById = async (req: Request, res: Response) => {
  try {
    RequestByIdSchema.parse(req);
    const params = req.params;
    const id = Number(params.id);
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        pools: true,
      },
    });
    if (!project) {
      return res
        .status(404)
        .json({ success: "false", message: "Resource not found" });
    }
    const formattedProject = formatProjectData(project);
    res.status(200).json({ success: "true", data: formattedProject });
  } catch (err) {
    res.status(400).json({ success: "false" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const RequestByTokenSchema = z.object({
  params: z.object({
    token: z.string().min(1).max(10).regex(new RegExp("^[A-Z]+$")),
  }),
});

export const getProjectByToken = async (req: Request, res: Response) => {
  try {
    console.log(RequestByTokenSchema.parse(req));
    const params = req.params;
    const token = params.token;
    const project = await prisma.project.findUnique({
      where: {
        token: token,
      },
      include: {
        pools: true,
      },
    });
    if (!project) {
      return res
        .status(404)
        .json({ success: "false", message: "Resource not found" });
    }
    const formattedProject = formatProjectData(project);
    res.status(200).json({ success: "true", data: formattedProject });
  } catch (err) {
    res.status(400).json({ success: "false" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};
