import { LocalLoadPurchases } from "@/data/usecases";
import {
  mockPurchases,
  CacheStoreSpy,
  getCacheExpirationDate,
} from "@/data/tests";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp: Date = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return { sut, cacheStore };
};

describe("LocalLoadPurchases load", () => {
  it("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });

  it("Should return empty list if load fails", async () => {
    const { sut, cacheStore } = makeSut();
    cacheStore.simulateFetchError();
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(purchases).toEqual([]);
  });

  it("Should return a list of purchases if Cache is valid", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    const { sut, cacheStore } = makeSut(currentDate);
    cacheStore.fetchResult = {
      timestamp,
      value: mockPurchases(),
    };
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchases");
    expect(purchases).toEqual(cacheStore.fetchResult.value);
  });

  it("Should return a empty list of purchases if Cache is expired", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() - 1);
    const { sut, cacheStore } = makeSut(currentDate);
    cacheStore.fetchResult = {
      timestamp,
      value: mockPurchases(),
    };
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });

  it("Should return a empty list of purchases if Cache is on expiration date", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    const { sut, cacheStore } = makeSut(currentDate);
    cacheStore.fetchResult = {
      timestamp,
      value: mockPurchases(),
    };
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });

  it("Should return empty list if Cache is empty", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    const { sut, cacheStore } = makeSut(currentDate);
    cacheStore.fetchResult = {
      timestamp,
      value: [],
    };
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });
});
