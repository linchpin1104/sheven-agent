// 개발 환경용 In-Memory 저장소
// Firebase가 사용 불가능할 때 임시로 사용

export const inMemoryStore = new Map<string, unknown>();

export function setData(id: string, data: unknown): void {
  inMemoryStore.set(id, data);
}

export function getData(id: string): unknown | undefined {
  return inMemoryStore.get(id);
}

export function hasData(id: string): boolean {
  return inMemoryStore.has(id);
}

export function deleteData(id: string): boolean {
  return inMemoryStore.delete(id);
}

export function clearAll(): void {
  inMemoryStore.clear();
}
