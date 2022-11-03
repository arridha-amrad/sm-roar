import queryClient from "@src/utils/queryClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

export default function useLogout() {
  const router = useRouter();
  const { isSuccess, mutate } = useMutation(
    () => {
      return axios.post("/api/user/logout");
    },

    {
      onSettled() {
        queryClient.removeQueries(["me"]);
        router.replace("/login");
      },
      onSuccess() {
        queryClient.cancelQueries(["me"]);
      },
    }
  );
  return {
    isSuccess,
    mutate,
  };
}
