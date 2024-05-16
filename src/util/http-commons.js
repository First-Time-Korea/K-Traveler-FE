import axios from "axios";
// import { httpStatusCode } from "./http-status";

const { VITE_VUE_API_URL, VITE_ELECTRIC_CHARGING_STATION_URL } = import.meta.env;

// station vue api axios instance
function stationAxios() {
  const instance = axios.create({
    baseURL: VITE_ELECTRIC_CHARGING_STATION_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    // withCredentials: true,
    // headers: {
    //   "Content-Type": "application/json;charset=utf-8",
    // },
  });
  // Request 발생 시 적용할 내용.
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";

  //   // Request, Response 시 설정한 내용을 적용.
  //   instance.interceptors.request.use((config) => {
  //     return config;
  //   }),
  //     (error) => {
  //       return Promise.reject(error);
  //     };

  //   // accessToken의 값이 유효하지 않은 경우,
  //   // refreshToken을 이용해 재발급 처리.
  //   // https://maruzzing.github.io/study/rnative/axios-interceptors%EB%A1%9C-%ED%86%A0%ED%81%B0-%EB%A6%AC%ED%94%84%EB%A0%88%EC%8B%9C-%ED%95%98%EA%B8%B0/

  //   let isTokenRefreshing = false;

  //   instance.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     async (error) => {
  //       const {
  //         config,
  //         response: { status },
  //       } = error;

  //       // 페이지가 새로고침되어 저장된 accessToken이 없어진 경우.
  //       // 토큰 자체가 만료되어 더 이상 진행할 수 없는 경우.
  //       if (status == httpStatusCode.UNAUTHORIZED) {
  //         // 요청 상태 저장
  //         const originalRequest = config;

  //         // Token을 재발급하는 동안 다른 요청이 발생하는 경우 대기.
  //         // 다른 요청을 진행하면, 새로 발급 받은 Token이 유효하지 않게 됨.
  //         if (!isTokenRefreshing) {
  //           isTokenRefreshing = true;

  //           // 에러가 발생했던 컴포넌트의 axios로 이동하고자하는 경우
  //           // 반드시 return을 붙여주어야한다.
  //           return await instance.post("/user/refresh").then((response) => {
  //             const newAccessToken = response.data.Authorization;

  //             instance.defaults.headers.common["Authorization"] = newAccessToken;
  //             originalRequest.headers.Authorization = newAccessToken;

  //             isTokenRefreshing = false;

  //             // 에러가 발생했던 원래의 요청을 다시 진행.
  //             return instance(originalRequest);
  //           });
  //         }
  //       } else if (status == httpStatusCode.FORBIDDEN) {
  //         alert(error.response.data.message);
  //       }

  //       return Promise.reject(error);
  //     }
  //   );
  return instance;
}

export { localAxios, stationAxios };
