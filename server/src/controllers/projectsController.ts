import { RewardTakingBehaviour } from "@prisma/client";
import { prisma } from "../db";
import { Response, Request } from "express";
import { formatProjectData } from "../utils/ProjectDataFormatting";

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

export const getProjectById = async (req: Request, res: Response) => {
  try {
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
    res.status(502).json({ success: "false" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

export const getProjectByToken = async (req: Request, res: Response) => {
  try {
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
    res.status(502).json({ success: "false" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};
