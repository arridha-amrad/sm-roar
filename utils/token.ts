import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

export type TokenTypes = 'link' | 'auth' | 'refresh';

export interface IVerifyTokenPayload {
  userId: string;
  type: TokenTypes;
  iat: number;
  exp: number;
}

const privateKey = fs.readFileSync(
  path.join(process.cwd(), './keys/private.pem')
);
const publicKey = fs.readFileSync(
  path.join(process.cwd(), './keys/public.pem')
);

export const createToken = async (
  userId: string,
  type: TokenTypes
): Promise<string> => {
  const result: string = await new Promise((resolve, reject) => {
    jwt.sign(
      { userId, type },
      privateKey,
      {
        algorithm: 'RS256',
        expiresIn: type === 'link' ? '1d' : type === 'auth' ? '2h' : '1d',
      },
      (err, token) => {
        if (err !== null) {
          reject(new Error(`Failure on creating token : ${err.message}`));
        }
        resolve(token as string);
      }
    );
  });
  return result;
};

export const verifyToken = async (
  token: string,
  type: TokenTypes
): Promise<IVerifyTokenPayload> => {
  const result: IVerifyTokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: ['RS256'],
        maxAge: type === 'link' ? '1d' : type === 'auth' ? '2h' : '1d',
      },
      (err, payload) => {
        if (err !== null) {
          reject(new Error(err.message));
        }
        const data = payload as IVerifyTokenPayload;
        resolve(data);
      }
    );
  });
  return result;
};
