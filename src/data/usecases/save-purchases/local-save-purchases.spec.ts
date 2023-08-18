import { SavePurchases } from "@/domain";
import { LocalSavePurchases } from "./local-save-purchases";
import { CacheStore } from "@/data/protocols/cache/cache-store";

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
}

const mockPurchases = (): Array<SavePurchases.Params> => [
  {
    id: "1",
    date: new Date(),
    value: 50,
  },
  {
    id: "2",
    date: new Date(),
    value: 100,
  },
];

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { sut, cacheStore };
};

describe("Local save purchases: ", () => {
  it("Should not delete cache on sut.init", async () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);

    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  it("Should delete old cache on sut.save", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save(mockPurchases());
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  it("Should not insert new cache if delete fails", () => {
    const { sut, cacheStore } = makeSut();
    jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save(mockPurchases());
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  it("Should insert new cache if delete succeeds", async () => {
    const { sut, cacheStore } = makeSut();
    const purchases = mockPurchases();
    await sut.save(purchases);
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual(purchases);
  });
});
