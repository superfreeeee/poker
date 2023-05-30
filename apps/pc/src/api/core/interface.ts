export enum ECode {
  Success = 200,
  ServerError = 500,
}

export interface Response<T> {
  code: ECode;
  data?: T;
  msg?: string;
}
