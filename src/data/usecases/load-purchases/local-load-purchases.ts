import { CacheStore } from "@/data/protocols/cache";
import { PurchaseModel } from "@/domain/models";
import { LoadPurchases, SavePurchases } from "@/domain/usecases";

export class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  private readonly key: string = "purchases";

  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date
  ) {}

  async save(purchases: PurchaseModel[]): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.timestamp,
      value: purchases,
    });
  }

  async loadAll(): Promise<void> {
    this.cacheStore.fetch(this.key);
  }
}
