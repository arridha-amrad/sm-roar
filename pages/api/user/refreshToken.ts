import { createToken, verifyToken } from "@src/utils/token";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { serializeCookie } from "@src/utils/cookie";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const bearerRefToken = req.cookies["token"];
    if (typeof bearerRefToken === "undefined") {
      return res.status(403).json({ error: "ref token was not included" });
    }
    const refToken = bearerRefToken.split(" ")[1];
    const { userId, type } = await verifyToken(refToken, "refresh");
    if (type !== "refresh") {
      return res.status(403).json({ error: "token invalid" });
    }
    const storedToken = await prisma.token.findFirst({
      where: {
        value: refToken,
      },
    });
    // ------- reuse token detected
    if (storedToken === null) {
      await prisma.token.deleteMany({
        where: {
          userId: parseInt(userId),
        },
      });
      const cookie = serializeCookie("", true);
      return res
        .status(403)
        .setHeader("Set-Cookie", cookie)
        .json({ error: "token not stored" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });
    if (user === null) {
      await prisma.token.delete({
        where: {
          id: storedToken.id,
        },
      });
      return res.status(403).json({ error: "reuse detected" });
    }
    // -----------

    await prisma.token.delete({
      where: {
        id: storedToken.id,
      },
    });
    const newRefreshToken = await createToken(user.id.toString(), "refresh");
    const newAuthToken = await createToken(user.id.toString(), "auth");

    await prisma.token.create({
      data: {
        value: newRefreshToken,
        userId: user.id,
      },
    });
    const cookie = serializeCookie(`Bearer ${newRefreshToken}`);
    return res
      .status(200)
      .setHeader("Set-Cookie", cookie)
      .json({ token: `Bearer ${newAuthToken}` });
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  } finally {
    await prisma.$disconnect();
  }
}
