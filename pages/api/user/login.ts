import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { ILoginDTO } from "@src/modules/user/user.types";
import { validateLogin } from "@src/modules/user/user.validator";
import { serializeCookie } from "@src/utils/cookie";
import { createToken } from "@src/utils/token";
import { verify } from "argon2";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { identity, password }: ILoginDTO = req.body;
  const { valid, errors } = validateLogin({
    identity,
    password,
  });
  if (!valid) {
    return res.status(400).json(errors);
  }
  try {
    const currentRefToken = req.cookies["token"];
    if (currentRefToken !== undefined) {
      const savedToken = await prisma.token.findFirst({
        where: { value: currentRefToken.split(" ")[1] },
      });
      if (savedToken !== null) {
        await prisma.token.delete({
          where: {
            id: savedToken.id,
          },
        });
      }
    }
    const user = await prisma.user.findFirst({
      where: identity.includes("@")
        ? {
            email: identity,
          }
        : {
            username: identity,
          },
    });
    if (user === null) {
      return res.status(404).json({ error: "user not found" });
    }
    const isMatch = await verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ error: "password not match" });
    }
    const authToken = await createToken(user.id.toString(), "auth");
    const refreshToken = await createToken(user.id.toString(), "refresh");
    await prisma.token.create({
      data: {
        value: refreshToken,
        userId: user.id,
      },
    });
    // eslint-disable-next-line
    const { password: pwd, ...props } = user;

    const cookie = serializeCookie(`Bearer ${refreshToken}`);

    return res
      .status(200)
      .setHeader("Set-Cookie", cookie)
      .json({
        token: `Bearer ${authToken}`,
        user: props,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
}
