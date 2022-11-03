import { verifyToken } from "@src/utils/token";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const bearerToken = req.headers.authorization;
  try {
    if (bearerToken === undefined || bearerToken === "") {
      return res.status(401).send("You are not authorized");
    }
    const { userId } = await verifyToken(bearerToken.split(" ")[1], "auth");
    const user = await prisma.user.findFirst({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...props } = user;
    return res.status(200).json({ user: props });
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }
}
