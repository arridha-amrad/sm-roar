import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

let token = "";

export const getToken = () => token;
export const setToken = (newToken: string) => (token = newToken);

export const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers!["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.log("err status : ", error.response.status);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (error?.response?.status === 401) {
      const prevRequest = error.config;
      return axiosInstance
        .get<{ token: string }>("/api/user/refreshToken")
        .then(({ data }) => {
          axiosInstance.defaults.headers.authorization = data.token;
          prevRequest.headers["Authorization"] = data.token;
          return axiosInstance(prevRequest);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            window.location.href = "/login";
            return;
          }
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);
