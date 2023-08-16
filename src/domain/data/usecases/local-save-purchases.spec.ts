class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete();
  }
}

interface CacheStore {
  delete: () => void;
}

class CacheStoreSpy implements CacheStore {
  public deleteCallsCount: number = 0;
  delete(): void {
    this.deleteCallsCount++;
  }
}

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
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });
});
