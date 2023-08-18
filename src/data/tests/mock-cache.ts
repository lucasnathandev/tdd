import { LoadPurchases, SavePurchases } from "@/domain/usecases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore {
  public actions: Array<CacheStoreSpy.Action> = [];

  public deleteKey: string;
  public insertKey: string;
  public fetchKey: string;
  public insertValues: Array<SavePurchases.Params> = [];

  fetch(key: string): Array<LoadPurchases.Result> {
    this.actions.push(CacheStoreSpy.Action.fetch);
    this.fetchKey = key;
    return this.insertValues;
  }

  delete(key: string): void {
    this.actions.push(CacheStoreSpy.Action.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: Array<SavePurchases.Params>): void {
    this.actions.push(CacheStoreSpy.Action.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch,
  }
}
