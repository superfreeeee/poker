export enum ECode {
  Success = 200,
  ServerError = 500,
  NonExistUser = 1001,
  InvalidUser = 1002,
}

export interface Response<T> {
  code: ECode;
  data?: T;
  msg?: string;
}
