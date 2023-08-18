import { LocalLoadPurchases } from "@/data/usecases";
import { mockPurchases, CacheStoreSpy } from "@/data/tests";

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

describe("LocalLoadPurchases load", () => {
  it(`${i++}. Should not delete or insert cache on sut.init`, () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });

  it(`${i++}. Should call correct key on load`, async () => {
    const { sut, cacheStore } = makeSut();
    await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchases");
  });
});
