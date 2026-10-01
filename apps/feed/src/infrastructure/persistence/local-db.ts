export function readCollection<T>(key: string, seed: () => T[]): T[] {
  const raw = localStorage.getItem(key);

  if (raw !== null) {
    try {
      return JSON.parse(raw) as T[];
    } catch {
      localStorage.removeItem(key);
    }
  }

  const initial = seed();
  writeCollection(key, initial);

  return initial;
}

export function writeCollection<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}
