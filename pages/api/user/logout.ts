import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { serializeCookie } from "@src/utils/cookie";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refToken = req.cookies["token"];
  try {
    if (refToken !== undefined) {
      const token = refToken.split(" ")[1];
      const storedToken = await prisma.token.findFirst({
        where: {
          value: token,
        },
      });
      if (storedToken !== null) {
        await prisma.token.delete({
          where: {
            id: storedToken.id,
          },
        });
      }
    }
    const cookie = serializeCookie("", true);
    return res
      .setHeader("Set-Cookie", cookie)
      .status(200)
      .send("Logout gracefully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}
