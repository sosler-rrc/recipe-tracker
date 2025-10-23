//This is the interface returned from the API when making requests
export type BaseResponse<T> = {
  message: string;
  status: "success" | "error";
  data: T;
};
