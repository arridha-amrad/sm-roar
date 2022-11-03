import useMe from "@src/hooks/user/useMe";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuth() {
  const { data, isLoading } = useMe();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace("/login");
    }
  }, [data, isLoading]);
}
