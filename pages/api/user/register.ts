import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@src/utils/prismaInstance";
import { validateRegistration } from "@src/modules/user/user.validator";
import { hash } from "argon2";
import { createToken } from "@src/utils/token";
import { serializeCookie } from "@src/utils/cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, username, name } = req.body;
  const { errors, valid } = validateRegistration({
    email,
    password,
    username,
    name,
  });
  if (!valid) {
    return res.status(400).json(errors);
  }
  try {
    const isEmailExist = await prisma.user.findFirst({ where: { email } });
    if (isEmailExist !== null) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const isUsernameExist = await prisma.user.findFirst({
      where: { username },
    });
    if (isUsernameExist !== null) {
      return res.status(403).json({ error: "Username already registered" });
    }
    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name,
      },
    });

    // eslint-disable-next-line
    const { password: pwd, ...props } = user;
    const authToken = await createToken(user.id.toString(), "auth");
    const refToken = await createToken(user.id.toString(), "refresh");
    await prisma.token.create({
      data: {
        value: refToken,
        userId: user.id,
      },
    });
    const cookie = serializeCookie(`Bearer ${refToken}`);
    return res
      .status(201)
      .setHeader("Set-Cookie", cookie)
      .json({
        user: props,
        token: `Bearer ${authToken}`,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}
