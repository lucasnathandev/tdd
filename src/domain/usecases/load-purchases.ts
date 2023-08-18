import { PurchaseModel } from "@/domain/models";
export interface LoadPurchases {
  loadAll: () => Promise<void>;
}

export namespace LoadPurchases {
  export type Result = PurchaseModel;
}
