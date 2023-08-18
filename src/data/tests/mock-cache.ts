import { SavePurchases } from "@/domain/usecases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore {
  public messages: Array<CacheStoreSpy.Message> = [];

  public deleteKey: string;
  public insertKey: string;
  public insertValues: Array<SavePurchases.Params> = [];
  delete(key: string): void {
    this.messages.push(CacheStoreSpy.Message.delete);
    this.deleteKey = key;
  }
  insert(key: string, value: Array<SavePurchases.Params>): void {
    this.messages.push(CacheStoreSpy.Message.insert);
    this.insertKey = key;
    this.insertValues = value;
  }
  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Message {
    delete,
    insert,
  }
}
