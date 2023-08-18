import { CacheStore } from "@/data/protocols/cache";
import { PurchaseModel } from "@/domain/models";
import { LoadPurchases, SavePurchases } from "@/domain/usecases";

export class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  private readonly key: string = "purchases";

  constructor(
    private readonly cacheStore: CacheStore,
    private readonly currentDate: Date
  ) {}

  async save(purchases: PurchaseModel[]): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.currentDate,
      value: purchases,
    });
  }

  async loadAll(): Promise<Array<LoadPurchases.Result>> {
    try {
      const cache = this.cacheStore.fetch(this.key);
      return cache.value;
    } catch (error) {
      this.cacheStore.delete(this.key);
      return [];
    }
  }
}
