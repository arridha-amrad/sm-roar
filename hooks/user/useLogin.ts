import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ILoginDTO } from "@src/modules/user/user.types";
import { axiosInstance } from "@src/utils/axiosInterceptor";
import queryClient from "@src/utils/queryClient";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useLogin() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { mutate, isLoading, isError } = useMutation(
    (data: ILoginDTO) => {
      return axios.post<{ token: string; user: Omit<User, "password"> }>(
        "/api/user/login",
        data
      );
    },
    {
      onSuccess({ data }) {
        axiosInstance.defaults.headers.authorization = data.token;
        router.replace("/");
        queryClient.setQueryData(["me"], data.user);
      },
      onError(error: any) {
        if (error.response.status < 500) {
          setMessage(error.response.data.error);
        } else {
          setMessage("Something went wrong. Please try again");
        }
      },
    }
  );
  return {
    mutate,
    isLoading,
    error: message,
    isError,
  };
}
