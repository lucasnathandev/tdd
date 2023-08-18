import { CacheStoreSpy } from "@/data/tests";
import { LocalLoadPurchases } from "@/data/usecases";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp: Date = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return { sut, cacheStore };
};

let i = 1;

describe("LocalLoadPurchases (validation)", () => {
  it("Should not delete or insert cache on sut.init", async () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });
});
