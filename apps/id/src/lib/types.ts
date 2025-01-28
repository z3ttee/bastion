import { ApiErrorCode } from "./errorCodes";

export interface ApiError {
  /** Http status code of error */
  readonly status: number;
  /** Time when error was thrown */
  readonly timestamp: string;
  /** URL path the error was thrown on */
  readonly path: string;
  /** Error code */
  readonly message: ApiErrorCode;
}

export type ApiResponse<T> = {
  readonly error?: ApiError;
  readonly data?: T | null;
};
