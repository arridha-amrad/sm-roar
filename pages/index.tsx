import useAuth from "@src/hooks/shared/useAuth";
import useLogout from "@src/hooks/user/useLogout";
import useMe, { Me } from "@src/hooks/user/useMe";
import queryClient from "@src/utils/queryClient";
import { GetServerSidePropsContext } from "next";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  // useAuth();
  const { mutate, isSuccess } = useLogout();

  const data = queryClient.getQueryData<Me>(["me"]);

  const { isLoading, data: user } = useMe(!data && !isSuccess);

  if (isLoading || !user) {
    return (
      <div className="w-screen h-screen m-auto">
        <p>Loading...</p>
      </div>
    );
  }

  const logout = () => {
    mutate();
  };

  return (
    <div>
      <Head>
        <title>Roarr - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h1>{JSON.stringify(user)}</h1>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={logout} className="my-btn">
        Logout
      </button>
    </div>
  );
}
