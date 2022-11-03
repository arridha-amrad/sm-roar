import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { verifyToken } from './token';

const requireAuthentication = (gssp: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    const token = req.cookies.token;
    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/login',
          state: 'login required',
          statusCode: 302,
        },
      };
    }

    // const {} = await verifyToken(token.split(" ")[1], "refresh")
    return gssp(context);
  };
};

export default requireAuthentication;
