import { ColumnDef } from "@tanstack/react-table";

export type userData = {
  id?: number;
  name: string;
  org: string;
  email: string;
  phone: string;
  isOrgVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  canContribute?: boolean;
  canDownload?: boolean;
  isGod: boolean;
  token?: string;
  proUrl?: string;
  fireUid: string;
  isContributor: boolean;
  isTac: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface objectType {
  [key: string]: number | string | bigint | boolean | null | Date; // Define the properties of your object here
}

export interface APIProps {
  userData: userData;
}

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}