import { useMutation } from "@tanstack/react-query";
import { IFieldError, RegisterDTO } from "@src/modules/user/user.types";
import { setToken } from "@src/utils/axiosInterceptor";
import queryClient from "@src/utils/queryClient";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useRegister() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorFields, setErrorFields] = useState<IFieldError[]>([]);
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (data: RegisterDTO) => {
      return axios.post("/api/user/register", data);
    },
    {
      onSuccess({ data }) {
        router.replace("/");
        setToken(data.token);
        queryClient.setQueryData(["me"], data.user);
      },
      onError(error: any) {
        if (error.response.status < 500) {
          if (error.response.data.length) {
            setErrorFields(error.response.data);
          } else {
            setMessage(error.response.data.error);
          }
        } else {
          setMessage("Something went wrong. Please try again");
        }
      },
    }
  );
  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
    error: message,
    errorFields,
  };
}
