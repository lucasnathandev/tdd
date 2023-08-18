import { SavePurchases } from "@/domain/usecases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore {
  public deleteCallsCount: number = 0;
  public insertCallsCount: number = 0;
  public deleteKey: string;
  public insertKey: string;
  public insertValues: Array<SavePurchases.Params> = [];
  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }
  insert(key: string, value: Array<SavePurchases.Params>): void {
    this.insertCallsCount++;
    this.insertKey = key;
    this.insertValues = value;
  }
  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      throw new Error();
    });
  }
}
