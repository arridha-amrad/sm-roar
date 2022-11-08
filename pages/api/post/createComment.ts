import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (error) {
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
}
