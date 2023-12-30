/** @format */

import { ReactNode } from "react";

export interface IAuthContextValue {
  BaseUrl: string;
  userData?: string;
  saveUserData: () => void;
  requestHeaders: Record<string, string>;
  userRoll?: string;
}
export interface IAuthContextProviderProps {
  children: ReactNode;
}
