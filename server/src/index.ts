import express from "express";
const app = express();
import { default as projectsRouter } from "./routes/projects";
import { default as poolsRouter } from "./routes/pools";
import { limiter } from "./config/rateLimitOptions";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(limiter);
app.use("/api/projects", projectsRouter);
app.use("/api/pools", poolsRouter);
app.get("/api/ping", (req, res) => {
  try {
    res.status(200).json({ success: "true", message: "pong" });
  } catch (err) {
    res.status(500).json({ success: "false" });
    console.error(err);
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ success: "false", message: "Resource not found" });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// async function main() {
//   try {
//     // const project = await prisma.project.delete({
//     //   where: {
//     //     token: "XUB",
//     //   },
//     // });
//     const project = await prisma.project.create({
//       data: {
//         token: "MGSI",
//         name: "Mongosi City",
//         live: true,
//         DistributingAmount: 100_000_000,
//         takesRewards: "NONE",
//         maxSupply: 1_000_000_000,
//         maxSupplyExists: true,
//         pools: {
//           create: {
//             amountInPool: 200_000,
//             name: "Mongosi pool",
//             ticker: "MNGSI",
//             poolId: "152316dbcd134ddee69a8c5204e38ac80448x68342f8c23cfe4b7edf",
//           },
//         },
//         categories: {
//           create: {
//             name: "Gaming",
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
