import { LoadPurchases } from "@/domain/usecases";

// Generic
export interface CacheStore {
  fetch: (key: string) => Array<LoadPurchases.Result>;
  delete: (key: string) => void;
  insert: (key: string, value: any) => void;
  replace: (key: string, value: any) => void;
}
